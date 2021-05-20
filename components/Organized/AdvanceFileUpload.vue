<template>
  <b-overlay :show="busy">
    <div
      ref="advanceFileUpload"
      class="advance-file-upload"
      :class="{ isCropMode: cropDialog, isFile: fileUploadDone, isError }"
    >
      <div class="default-box">
        {{ beforeTitle }}
      </div>
      <div class="is-want-upload">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z"
          />
        </svg>
      </div>
      <div class="is-file-box">
        <!--start grid-item 1 -->
        <div class="grid-item upload-image-box" :class="viewImageSize">
          <img :src="uplodedImg.url">
        </div>
        <!--start grid-item 2 -->
        <div v-if="showInfo" class="grid-item file-info">
          <div>
            {{ uplodedImg.file_name }}
          </div>
          <small> File size : {{ uplodedImg.file_size }}; </small>
        </div>
        <!--start grid-item 3 -->
        <div class="grid-item upload-status">
          {{ afterTitle }}
        </div>
        <div class="grid-item upload-status">
          <button
            type="buttton"
            class="is-want-remove"
            @click.stop="fileRemoveFromServer"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="cropDialog" class="crop-box">
        <div class="crop-box-body">
          <cropper
            ref="cropper"
            class="cropper"
            image-class="imageClass"
            :src="decodeFile.src"
            :stencil-props="{ aspectRatio }"
            @ready="croperRedy = true"
          />
        </div>
        <div
          class="crop-box-footer mt-2"
          :style="` visibility: ${croperRedy ? 'visible' : 'hidden'};`"
        >
          <b-button-group>
            <b-button variant="primary" @click.stop="cropData">
              Crop
            </b-button>
            <b-button variant="danger" @click.stop="cropCancel">
              Cancel
            </b-button>
          </b-button-group>
        </div>
      </div>
    </div>
  </b-overlay>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'

const d = {
  busy: false,

  fileUploadDone: false,
  file: null,
  croperHeight: 500,
  cropDialog: false,
  decodeFile: {},
  coordinates: {},
  params: {},
  uplodedImg: {},
  croperRedy: false
}
export default {
  name: 'AdvanceFileUpload',
  components: {
    Cropper
  },
  props: {
    height: {
      type: Number,
      default: 300
    },
    aspectRatio: {
      type: Number,
      default: 1
    },
    viewImageSize: {
      type: String,
      default: 'normal'
    },
    showInfo: {
      type: Boolean,
      default: true
    },
    beforeTitle: {
      type: String,
      default: 'Drag & Drop your files or Click'
    },
    afterTitle: {
      type: String,
      default: 'File upload Complated'
    }
  },
  data () {
    return {
      isError: false,
      ...d
    }
  },
  mounted () {
    this.createInput()
  },
  created () {
    this.$emit('reset-fun', () => this.reset())
  },
  methods: {
    createInput () {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.addEventListener('change', (event) => {
        this.fileChange(event)
      })
      this.$refs.advanceFileUpload.prepend(input)
    },
    removeInput () {
      this.$refs.advanceFileUpload.querySelector('input').remove()
    },
    getFromData (params) {
      const { image, coordinates } = params
      const f = new FormData()
      f.append('image', image)
      f.append('height', this.height)
      for (const key in coordinates) {
        f.append(`coordinates[${key}]`, coordinates[key])
      }

      return f
    },
    reset () {
      this.removeInput()
      this.busy = true
      for (const key in d) {
        this[key] = d[key]
      }
      setTimeout(() => {
        this.createInput()
        this.busy = false
      }, 4000)
    },
    hasError () {
      this.isError = true
      this.reset()
    },
    async fileSendServer () {
      try {
        // eslint-disable-next-line camelcase
        const server_url = '/json/image-manupulation'
        const { data } = await this.$axiosWithoutToken.post(
          server_url,
          this.getFromData(this.params)
        )

        this.uplodedImg = data
        this.$emit('done', data)
        this.fileUploadDone = true
      } catch (error) {
        this.hasError()
        console.error(error)
      }
      this.busy = false
    },
    readFile (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const src = reader.result
        const { type, size, name, lastModified } = file
        const info = {
          type,
          size,
          name,
          lastModified
        }

        this.decodeFile = {
          src,
          info
        }
        this.cropDialog = true
      }
      reader.readAsDataURL(file)
    },
    fileChange (event) {
      const files = event.target.files
      this.isError = false
      if (files.length) {
        const file = files[0]
        this.file = file
        this.readFile(files[0])
      } else {
        this.file = null
        this.decodeFile = {}
      }
    },

    cropData () {
      const { coordinates } = this.$refs.cropper.getResult()
      this.coordinates = coordinates
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image
      const params = {
        image: this.file,
        coordinates
      }
      this.params = params
      this.busy = true
      this.fileSendServer()

      this.decodeFile = {}
      this.cropDialog = false
    },
    cropCancel () {
      this.reset()
    },
    async fileRemoveFromServer () {
      this.isError = false
      try {
        this.busy = true
        // eslint-disable-next-line camelcase
        const server_url = '/json/image-manupulation-remove'
        // eslint-disable-next-line no-unused-vars
        const { data } = await this.$axiosWithoutToken.post(
          server_url,
          this.uplodedImg
        )

        this.uplodedImg = {}
        this.$emit('done', this.uplodedImg)
        this.fileUploadDone = false
        this.reset()
      } catch (error) {
        this.hasError()
        console.error(error)
      }
      this.busy = false
    }
  }
}
</script>
