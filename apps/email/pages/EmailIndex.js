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
      <SideNav @filterStarred="filterStarred" @filterStatus="setFilterBy" />
    </section>
    <section class="email-list-wrap"> 
      <EmailFilter @saveEmail="saveEmail" @filter="setFilterBy"/>
      <EmailList
      @saveEmail = "saveEmail"
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
      filterBy: { status: 'inbox',stars: false  },
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
      emailService.save(email)
      .then(savedEmail => {
        if(email.id)return
          this.emails.unshift(savedEmail)
          // console.log(savedEmail)
        })
      this.isNewEmail = false
    },
    removeEmail(emailId) {
      const emailIdx = this.emails.findIndex(email => email.id === emailId)
      if (this.emails[emailIdx].status !== 'trash') {
        this.emails[emailIdx].status = 'trash'
        emailService.save(this.emails[emailIdx]).then(()=> this.emails.unshift(savedEmail))
      }
      else (emailService.remove(emailId)
        .then(() => this.emails.splice(emailIdx, 1)))
    },
    showDetails() {
      this.isDetails = true
    },
    // hideDetails(){
    //   this.isDetails = false
    // }
    setFilterBy({ keyWord, toUpdate }) {
      this.filterBy[keyWord] = toUpdate
      this.filterBy.stars = false
      console.log("this.filterBy", this.filterBy)
    },
    filterStarred(){
      // console.log('star')
      this.filterBy.Status = '' 
      this.filterBy.stars = true
    }

  },

  computed: {
    params() {
      return this.$route.params.emailId
    },
    filteredEmails() {
      let filteredEmails = []
      const searchRegex = new RegExp(this.filterBy.txt, 'i')
      const statusRegex = new RegExp(this.filterBy.status, 'i')
      // const starredRegex = new RegExp(this.filterBy.starred, 'i')

      filteredEmails = this.emails.filter(email => {
        if(this.filterBy.stars) return searchRegex.test(email.subject && email.body ) && email.isStarred
       return searchRegex.test(email.subject && email.body && email.from) && statusRegex.test(email.status)
      })
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
