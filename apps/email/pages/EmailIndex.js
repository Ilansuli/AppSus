import EmailList from "../cmps/EmailList.js"
import EmailCompose from "../cmps/EmailCompose.js"
import SideNav from "../cmps/SideNav.js"
import EmailFilter from "../cmps/EmailFilter.js"

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
      <SideNav @filterStatus="setFilterBy" />
    </section>
    <section class="email-list-wrap"> 
      <EmailFilter @filter="setFilterBy"/>
      <EmailList
      @removeEmail="removeEmail"
      @showDetails="showDetails"
      :emails="filteredEmails"
      v-if="!isDetails" 
      />
      <RouterView v-if="isDetails" />
    </section>
    <EmailCompose @saveEmail='saveEmail' v-if="isNewEmail" />
  </section>
    `,
  created() {
    emailService.query()
      .then(emails => this.emails = emails)

  },
  data() {
    return {
      filterBy: {status:'inbox'},
      emails: [],
      isNewEmail: false,
      isDetails: false,
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
    setFilterBy({ keyWord, toUpdate }) {
      this.filterBy[keyWord] = toUpdate
      console.log("this.filterBy", this.filterBy)
    },

  },

  computed: {
    params() {
      return this.$route.params.emailId
    },
    filteredEmails() {
      let filteredEmails = []
      const searchRegex = new RegExp(this.filterBy.txt, 'i')
      const statusRegex = new RegExp(this.filterBy.status, 'i')

      filteredEmails = this.emails.filter(email => searchRegex.test(email.subject && email.body) && statusRegex.test(email.status))
      console.log(filteredEmails)
      return filteredEmails
    },

  },
  watch: {
    params() {
      const params = this.$route.params.emailId
      if (params) this.isDetails = true
      if (!params) this.isDetails = false
    }
  },
  components: {
    EmailList,
    EmailCompose,
    SideNav,
    EmailFilter
  },
}
