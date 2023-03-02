import EmailList from "../cmps/EmailList.js"
import EmailCompose from "../cmps/EmailCompose.js"
import SideNav from "../cmps/SideNav.js"

import { eventBusService } from "../../../services/event-bus.service.js"
import { emailService } from "../services/emailService.js"
import { svgService } from "../../../services/svg.service.js"

export default {
  name: 'Note Keep',
  props: [],
  template: `
  <section class="email-index">
    <section class ="side-nav">
      <button class="compose-btn" @click="isNewEmail = !isNewEmail"><div className="icon" v-html="getSvg('compose')"></div>Compose</button>
      <SideNav />
    </section>
      
      <EmailList
      @removeEmail="removeEmail"
      @showDetails="showDetails"
      :emails="emails"

      v-if="!isDetails" 
      />
      <RouterView v-if="isDetails" />
    <EmailCompose @saveEmail='saveEmail' v-if="isNewEmail" />
  </section>
    `,
  created() {
    emailService.query()
      .then(emails => this.emails = emails)
    console.log(this.emails);

  },
  data() {
    return {
      emails: null,
      isNewEmail: false,
      isDetails: false
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    saveEmail(email) {
      console.log('hey')
      emailService.save(email)
        .then(savedEmail => {
          this.emails.unshift(savedEmail)
        })
      this.isNewEmail = false
    },
    removeEmail(emailId) {
      emailService.remove(emailId)
        .then(() => {
          const emailIdx = this.emails.findIndex(email => email.id === emailId)
          this.emails.splice(emailIdx, 1)
        })
    },
    showDetails() {
      this.isDetails = true
    },
    // hideDetails(){
    //   this.isDetails = false
    // }
  },
  computed: {
        params(){
           return this.$route.params.emailId
        }
  },
  watch: {
        params(){
          const params = this.$route.params.emailId
          if(!params) this.isDetails = false 
          if(params) this.isDetails = true
        }
  },
  components: {
    EmailList,
    EmailCompose,
    SideNav,
  },
}
