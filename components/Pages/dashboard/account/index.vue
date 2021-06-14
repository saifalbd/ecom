<template>
  <b-row no-gutters>
    <b-col cols="12">
      <personal-information :profile="profile" :busy="busy" />
    </b-col>
    <b-col cols="12" class="mt-2">
      <Email :profile="profile" :busy="busy" />
    </b-col>
    <b-col cols="12" class="mt-2">
      <user-name :profile="profile" :busy="busy" />
    </b-col>
    <b-col cols="12" class="mt-2">
      <phone-number :profile="profile" :busy="busy" />
    </b-col>
    <b-col cols="12">
      <profile-picture :profile="profile" :busy="busy" />
    </b-col>
  </b-row>
</template>

<script>
import PersonalInformation from './PersonalInformation.vue'
import PhoneNumber from './PhoneNumber.vue'
import Email from './Email.vue'
import UserName from './UserName.vue'
import ProfilePicture from './ProfilePicture.vue'
import { authProfile } from './internal/api'

export default {
  components: {
    PersonalInformation,
    PhoneNumber,
    ProfilePicture,
    Email,
    UserName
  },
  data () {
    return {
      busy: true,
      profile: {}
    }
  },
  created () {
    this.authProfile()
  },
  methods: {
    authProfile
  }
}
</script>
