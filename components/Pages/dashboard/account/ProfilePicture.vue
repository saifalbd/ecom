<template>
  <b-overlay :show="busy || innerBusy">
    <b-card bg-variant="light">
      <fieldset class="form-group mb-0">
        <div class="form-row no-gutters">
          <div class="col-lg-3">
            <legend
              class="bv-no-focus-ring col-form-label col-form-label-lg font-weight-bold pt-0"
            >
              Profile Image
            </legend>
          </div>

          <div class="col" :class="{ readonly }">
            <div class="row justify-content-center">
              <div
                class="auto bg-info"
                style="max-height:200px; max-width:200px;"
              >
                <image-box :images="thumbs" />
              </div>
              <div class="col-12">
                <advance-file-upload
                  :show-info="false"
                  :header="300"
                  @done="info.image = $event"
                  @reset-fun="resetUploader = $event"
                />
              </div>
            </div>
            <!-- start vp -->

            <b-row>
              <b-col offset-sm="2" class="text-center mt-4">
                <b-button
                  variant="primary"
                  :disabled="readonly"
                  @click.stop="update"
                >
                  Save
                </b-button>
              </b-col>
            </b-row>
            <div class="read-only-overley" />
          </div>
        </div>
      </fieldset>
    </b-card>
  </b-overlay>
</template>

<script>
import { head, cloneDeep } from 'lodash'
import AdvanceFileUpload from '@/components/Organized/AdvanceFileUpload.vue'
import { mapState, mapActions } from 'vuex'
import ImageBox from '@/components/Pragment/ImageBox.vue'
export default {
  name: 'ProfilePicture',
  components: {
    AdvanceFileUpload,
    ImageBox
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    busy: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      inputSize: 'lg',
      readonly: false,
      innerBusy: false,
      errorMessage: '',
      errorDialog: false,
      resetUploader () {}, // replace from event

      url: '',
      info: {
        update_type: 'profile_picture',
        image: {}
      }
    }
  },
  computed: {
    thumbs () {
      return [this.$auth.user.thumbnail]
    }
  },
  methods: {
    // ...mapActions('Auth', ['setUser']),

    async update () {
      try {
        this.innerBusy = true
        const profile = this.$auth.user.id
        const url = this.$apiUrl('app.user.profile.update', { profile }, false)
        const { data } = await this.$authAxios(this.$auth).fetch(url, this.info)
        const user = cloneDeep(this.user)
        // const url = this.info.image.url
        // const name = this.info.image.name

        // user.thumbnail = { url, name }
        // this.setUser(user)
        this.resetUploader()
      } catch (error) {
        console.error(error)
      }

      this.innerBusy = false
    }
  }
}
</script>
