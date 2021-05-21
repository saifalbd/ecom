/* eslint-disable */
import {
  hasIn,
  isBoolean,
  isEmpty,
  isFunction,
  isPlainObject,
  isUndefined
} from "lodash";

import { restApi } from "@/plugins/restApi/index";

const state = () => {
  return {
    searchItems: [],
    pagination: {},
    searchCount: 0,
    searchHistory: [],
    searchView: false,
    searchValue: "",
    searchBusy: false
  };
};

const mutations = {
  SET_DATA(state, payload) {
    try {
      if (isUndefined(payload)) {
        throw new Error("search data not found");
      }
      if (!isPlainObject(payload)) {
        throw new Error("search data must be object");
      }
      if (!hasIn(payload, "meta")) {
        throw new Error("search data.meta not found");
      }
      if (!hasIn(payload.meta, "total")) {
        throw new Error("search data.meta.total not found");
      }
      state.searchItems = payload.data;
      state.pagination = payload.meta;
      state.searchCount = payload.meta.total;
    } catch (error) {
      console.error(error);
    }
  },
  SET_BUSY(state, payload) {
    if (!isBoolean(payload)) {
      console.error("SET_BUSY PARAMS MUST BE BOOLEAN");
      return null;
    }
    state.searchBusy = payload;
  },
  REMOVE_DATA(state) {
    state.searchView = false;
    state.searchItems = [];
    state.pagination = {};
    state.searchCount = 0;
    state.searchValue = "";
    state.searchBusy = false;
  },
  SET_SEARCH_VIEW(state, payload) {
    try {
      if (!isBoolean(payload)) {
        // eslint-disable-next-line no-throw-literal
        throw "SET_SEARCH_VIEW PARAMS MUST BE BOOLEAN";
      }
      state.searchView = payload;
    } catch (error) {
      alert(error);
    }
  },
  SET_VALUE(state, payload) {
    state.searchValue = payload;
  }
};
const actions = {
  searchFetch({ commit }, payload) {
    try {
      if (isUndefined(payload)) {
        throw new Error("Search input value not found");
      }
      if (!isPlainObject(payload)) {
        throw new Error("Search action Payload must be object");
      }
      if (!hasIn(payload, "value")) {
        throw new Error("Search action Payload.value not found");
      }
      if (isEmpty(payload.value)) {
        throw new Error("Search input value not found");
      }

      if (hasIn(payload, "start")) {
        if (!isFunction(payload.start)) {
          throw new Error("payload start must be function");
        }
      }

      const params = {
        search: payload.value
      };
      if (payload.page) {
        params.page = payload.page;
      }

      commit("SET_BUSY", true);

      restApi
        .getIs(this)
        .items(params)
        .then(({ data }) => {
          commit("SET_DATA", data);

          if (hasIn(payload, "done")) {
            if (!isFunction(payload.done)) {
              throw new Error("payload done must be function");
            }
            payload.done(data);
          }
          commit("SET_BUSY", false);
        })
        .catch(error => {
          console.error(error);
          commit("SET_BUSY", false);
        });
    } catch (error) {
      console.error(error);
    }
  },
  removeData({ commit }) {
    commit("REMOVE_DATA");
  },
  set_search_view({ commit }, payload) {
    commit("SET_SEARCH_VIEW", payload);
  },
  set_value({ commit }, payload) {
    commit("SET_VALUE", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
