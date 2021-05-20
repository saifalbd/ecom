// import { axiosWithoutToken } from '@/plugins/axios'
import { validate, mixer } from "@/plugins/product/index";
import { hasIn, isUndefined } from "lodash";
import { restApi } from "@/plugins/restApi/index";

const itemsMixer = items => {
  return items.map(item => {
    validate(item);
    return mixer(item);
  });
};

const collectionMixer = collection => {
  return collection.map(obj => {
    obj.busy = false;
    obj.data = itemsMixer(obj.data);
    return obj;
  });
};

export const asyncData = async function(ctx) {
  try {
    const { data } = await restApi
      .ctx(ctx)
      .getIs()
      .homePage();

    if (!hasIn(data, "banners")) {
      // eslint-disable-next-line no-throw-literal
      throw "data.banners missing";
    }
    if (!hasIn(data, "offers")) {
      // eslint-disable-next-line no-throw-literal
      throw "data.offers missing";
    }
    if (!hasIn(data, "collection")) {
      // eslint-disable-next-line no-throw-literal
      throw "data.collection missing";
    }
    if (!Array.isArray(data.collection)) {
      // eslint-disable-next-line no-throw-literal
      throw "data.collection must be Array";
    }

    const banners = data.banners;
    const offers = data.offers;
    const collection = collectionMixer(data.collection);
    return { collection, banners, offers };
  } catch (error) {
    console.error(error);
  }
};

export const methods = {
  async loadMoreItems(index) {
    const obj = this.collection[index];
    // eslint-disable-next-line camelcase
    const category_id = obj.meta.category_id;
    const offset = obj.meta.offset;
    obj.busy = true;
    try {
      if (isUndefined(category_id)) {
        // eslint-disable-next-line no-throw-literal
        throw "category_id missing";
      }
      if (isUndefined(offset)) {
        // eslint-disable-next-line no-throw-literal
        throw "offset are missing";
      }

      // const data = await this.hasOnSession(category_id,offset);
      const url = this.$apiUrl(
        "app.homePage.moreItems",
        { category_id, offset },
        false
      );
      const { data } = await this.$axiosWithoutToken.get(url);

      obj.data.push(...itemsMixer(data.data));

      obj.meta.offset = data.meta.offset;
    } catch (error) {
      console.error(error);
    }
    obj.busy = false;
  }
};
