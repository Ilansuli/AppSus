import EmailList from "../cmps/EmailList.js"
import EmailCompose from "../cmps/EmailCompose.js"
import SideNav from "../cmps/SideNav.js"
import EmailFilter from "../cmps/EmailFilter.js"

import { eventBusService } from "../../../services/event-bus.service.js"
import { emailService } from "../services/emailService.js"
import { svgService } from "../../../services/svg.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
  name: 'Email Index',
  props: [],
  template: `
  <section class="email-index">
    <section class ="side-nav">
      <button class="compose-btn"  @click="createComposeEmail"><div className="icon" v-html="getSvg('compose')"></div>Compose</button>
      <SideNav :emails="emails" :filterBy="filterBy" @closeDetails ="closeDetails" @filterStarred="filterStarred" @filterStatus="setFilterBy" />
    </section>
    
      <EmailList
      @updateEmail = "updateEmail"
      @removeEmail="removeEmail"
      @showDetails="showDetails"
      :emails="filteredEmails"
      v-if="!isDetails" 
      />
      <RouterView @makeNote="makeNote" v-if="isDetails" :key="routeParams.emailId" />
    <EmailCompose :composeEmail="composeEmail"  @saveEmail='saveEmail' @updateQuery='updateQuery'  />
  </section>
    `,
  created() {
    this.$router.push('/email/')
    this.loadLoggedInUser()

    if (this.$route.query.subject) this.createNoteEmail(this.$route.query)

    eventBusService.on('filter', searchWord => {
      this.setFilterBy({ keyWord: 'txt', toUpdate: searchWord })
    })

    emailService.query()
      .then(emails => this.emails = emails)

    this.filterBy.status = 'inbox'

  },
  data() {
    return {
      filterBy: { status: '', stars: false },
      emails: [],
      isDetails: false,
      composeEmail: null,
      loggedInUser: null
    }
  },
  methods: {
    loadLoggedInUser() {
      this.loggedInUser = userService.getLoggedinUser()
      console.log(this.loggedInUser)
      if(this.loggedInUser === null) this.$router.push('/login')
    },
    createComposeEmail() {
      const emptyEmail = emailService.getEmptyEmail()
      emailService.save(emptyEmail).then(composeEmail => {
        this.composeEmail = composeEmail
        return this.updateQuery(this.composeEmail.id)
      })
    },
    updateQuery(newComposeId = null) {
      const emailIdRoute = this.$route.params.emailId || null
      const path = emailIdRoute ? `/email/${emailIdRoute}` : `/email/`
      const query = newComposeId ? { newComposeId } : {}
      this.$router.replace({
        path,
        query
      })
    },
    createNoteEmail(query) {
      const emptyEmail = emailService.getEmptyEmail()
      emptyEmail.subject = query.subject
      emptyEmail.body = query.body
      this.saveEmail(emptyEmail)
      console.log(emptyEmail)
    },
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },

    updateEmail(email, updateKey, toUpdate) {
      const emailToUpdateIdx = this.emails.findIndex(emailToUpdate => email === emailToUpdate)
      const emailToUpdate = this.emails[emailToUpdateIdx]
      emailToUpdate[updateKey] = toUpdate
      emailService.save(emailToUpdate)
      console.log(emailToUpdateIdx)
      // FIND EMAIL IN ARRAY UPDATE AND THEN SAVE
    },

    saveEmail(email) {
      emailService.save(email)
        .then(savedEmail => {
          this.emails.unshift(savedEmail)
          // console.log(savedEmail)
        })
      this.isNewEmail = false
    },
    removeEmail(emailId) {
      const emailIdx = this.emails.findIndex(email => email.id === emailId)

      if (this.emails[emailIdx].status !== 'trash') {
        this.emails[emailIdx].status = 'trash'
        emailService.save(this.emails[emailIdx])
          .then(savedEmail => this.emails.unshift(savedEmail))
      }
      else {
        emailService.remove(emailId)
          .then(() => this.emails.splice(emailIdx, 1))
      }
    },
    closeDetails() {
      this.isDetails = false
      if (this.$route.params.emailId) this.$route.params = {}
      if (this.$route.query.newComposeId) this.updateQuery(this.$route.query.newComposeId)
    },
    showDetails() {
      this.isDetails = true
    },
    setFilterBy({ keyWord, toUpdate }) {
      this.filterBy[keyWord] = toUpdate
      this.filterBy.stars = false
    },
    filterStarred() {
      this.filterBy.status = ''
      this.filterBy.stars = true
    },
    makeNote(email) {
      this.$router.push({
        path: "/note",
        query: {
          title: email.subject,
          txt: email.body
        }
      })
    }

  },

  computed: {

    filteredEmails() {
      let filteredEmails = []
      const searchRegex = new RegExp(this.filterBy.txt, 'i')
      const statusRegex = new RegExp(this.filterBy.status, 'i')
      // const starredRegex = new RegExp(this.filterBy.starred, 'i')

      filteredEmails = this.emails.filter(email => {
        if (this.filterBy.stars) return searchRegex.test(email.subject && email.body) && email.isStarred
        return searchRegex.test(email.subject && email.body && email.from) && statusRegex.test(email.status)
      })
      return filteredEmails
    },
    routeParams() {
      return this.$route.params
    }
  },
  watch: {
    routeParams() {
      this.isDetails = this.$route.params.emailId ? true : false
    }

  },
  components: {
    EmailList,
    EmailCompose,
    SideNav,
    EmailFilter
  },
}
