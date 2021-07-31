<template>
  <div class="contactus">
    <StaticBannerBox
      title="Contact us"
      sub-title="Lorem Ipsum is simply dummy text of the printing and"
      :src="placeholder"
    />
    <div class="content">
      <b-overlay :show="busy">
        <Vo ref="form" tag="div" class="form-box">
          <Vp
            v-slot="{ valid, errors }"
            name="name"
            vid="name"
            :rules="{ required: true }"
            tag="div"
            class="item"
          >
            <b-form-group
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
              label="Name"
              label-for="name"
              label-cols-sm="12"
            >
              <b-form-input id="name" v-model="form.name" :size="size" />
            </b-form-group>
          </Vp>
          <Vp
            v-slot="{ valid, errors }"
            name="phone"
            vid="phone"
            :rules="{ required: true }"
            tag="div"
            class="item"
          >
            <b-form-group
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
              label="phone"
              label-for="phone"
              label-cols-sm="12"
            >
              <b-form-input id="phone" v-model="form.phone" :size="size" />
            </b-form-group>
          </Vp>
          <Vp
            v-slot="{ valid, errors }"
            name="email"
            vid="email"
            :rules="{ required: true }"
            tag="div"
            class="item"
          >
            <b-form-group
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
              label="email"
              label-for="email"
              label-cols-sm="12"
            >
              <b-form-input id="email" v-model="form.email" :size="size" />
            </b-form-group>
          </Vp>
          <Vp
            v-slot="{ valid, errors }"
            name="subject"
            vid="subject"
            :rules="{ required: true }"
            tag="div"
            class="item"
          >
            <b-form-group
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
              label="subject"
              label-for="subject"
              label-cols-sm="12"
            >
              <b-form-input id="subject" v-model="form.subject" :size="size" />
            </b-form-group>
          </Vp>

          <Vp
            v-slot="{ valid, errors }"
            name="message"
            vid="message"
            :rules="{ required: true }"
            tag="div"
            class="item"
          >
            <b-form-group
              :invalid-feedback="errors[0]"
              :state="vs(valid, errors)"
              label="Message"
              label-for="message"
              label-cols-sm="12"
            >
              <b-form-textarea
                id="message"
                v-model="form.message"
                :size="size"
              />
            </b-form-group>
          </Vp>
          <div class="text-center mt-3">
            <b-button squared variant="primary" @click.once="submit">
              Submit
            </b-button>
          </div>
        </Vo>
      </b-overlay>
      <div class="map-box">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5417617602384!2d90.35316176522981!3d23.7637149441838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c09ffaffd459%3A0x8268e2507d87e477!2sMohammadia%20Housing%20Society%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1627336360993!5m2!1sen!2sbd"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script>
import placeholder from '@/assets/aboutus.jpg'
import StaticBannerBox from '@/components/Organized/StaticBannerBox.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
const form = (v) => {
  return {
    name: v.$isDev('saiful islam', ''),
    phone: v.$isDev('01714048043', ''),
    email: v.$isDev('demo@gmail.com', ''),
    subject: v.$isDev('contact message subject', ''),
    message: v.$isDev(
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro eos soluta ipsum maiores natus quaerat officia a. Ea repellendus rerum, similique hic sit, excepturi, cupiditate maxime dicta obcaecati ad doloremque?',
      ''
    )
  }
}
export default {
  components: {
    StaticBannerBox,
    Vo: ValidationObserver,
    Vp: ValidationProvider
  },
  data () {
    return {
      placeholder,
      size: 'normal',
      busy: false,
      form: form(this)
    }
  },
  methods: {
    vs (valid, errors) {
      return errors[0] ? false : valid ? true : null
    },
    params () {
      const { name, phone, email, subject, message } = this.form
      return { name, phone, email, subject, message }
    },
    makeToast (variant = 'success') {
      this.$bvToast.toast('Toast body content', {
        title: `Variant ${variant || 'default'}`,
        variant,
        solid: true
      })
    },
    async submit () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }
      try {
        this.busy = true
        const url = this.$apiUrl('app.static.postContract', {}, false)
        await this.$axiosWithoutToken.post(url, this.params())
        this.makeToast()
        this.form = form(this)
      } catch (error) {
        console.error(error)
        this.$formVError({ error, vue: this, ref: 'form' })
      }
      this.busy = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
