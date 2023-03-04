import EmailList from "../cmps/EmailList.js"
import EmailCompose from "../cmps/EmailCompose.js"
import SideNav from "../cmps/SideNav.js"
import EmailFilter from "../cmps/EmailFilter.js"

import { eventBusService } from "../../../services/event-bus.service.js"
import { emailService } from "../services/emailService.js"
import { svgService } from "../../../services/svg.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
  name: 'Note Keep',
  props: [],
  template: `
  <section class="email-index">
    <section class ="side-nav">
      <button class="compose-btn" @click="isNewEmail = !isNewEmail" @click="createComposeEmail"><div className="icon" v-html="getSvg('compose')"></div>Compose</button>
      <SideNav @closeDetails ="closeDetails" @filterStarred="filterStarred" @filterStatus="setFilterBy" />
    </section>
    <EmailFilter @saveEmail="saveEmail" @filter="setFilterBy"/>
      <EmailList
      @updateEmail = "updateEmail"
      @removeEmail="removeEmail"
      @showDetails="showDetails"
      :emails="filteredEmails"
      v-if="!isDetails" 
      />
      <RouterView @makeNote="makeNote" v-if="isDetails" />
    <EmailCompose :composeEmail="composeEmail"  @saveEmail='saveEmail' v-if="isNewEmail" />
  </section>
    `,
  created() {
    if (this.$route.query.subject) this.createNoteEmail(this.$route.query)

    emailService.query()
      .then(emails => this.emails = emails)

    // this.$router.push('/email')
    this.isNewEmail = false
    this.filterBy.status = 'inbox'
    this.$router.push({
      path: '/email/'
    })
  },
  data() {
    return {
      filterBy: { status: '', stars: false },
      emails: [],
      isNewEmail: false,
      isDetails: false,
      composedEmail : null
    }
  },
  methods: {
    createComposeEmail() {
      const emptyEmail = emailService.getEmptyEmail()
      emailService.save(emptyEmail).then(composeEmail => {
        this.composeEmail = composeEmail
        return this.updateQuery(composeEmail.id)
      })
    },
    updateQuery(id) {
      if (this.$route.params.emailId) {
        const params = this.$route.params.emailId
        this.$router.push({
          path: `/email/${params}`,
          query: {
            newComposeId: id,
          }
        })
      } else {
        this.$router.push({
          path: `/email/`,
          query: {
            newComposeId: id,
          }
        })
      }

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
      const emailToUpdate = this.emails[emailToUpdateIdx]
      const emailToUpdateIdx = this.emails.findIndex(emailToUpdate => email === emailToUpdate)
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
        emailService.save(this.emails[emailIdx]).then(() => this.emails.unshift(savedEmail))
      }
      else (emailService.remove(emailId)
        .then(() => this.emails.splice(emailIdx, 1)))
    },
    closeDetails() {
      this.isDetails = false
      // this.$router.push('/email')
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
    filterStarred() {
      // console.log('star')
      this.filterBy.Status = ''
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
    params() {
      return this.$route.params.emailId
    },
    filteredEmails() {
      let filteredEmails = []
      const searchRegex = new RegExp(this.filterBy.txt, 'i')
      const statusRegex = new RegExp(this.filterBy.status, 'i')
      // const starredRegex = new RegExp(this.filterBy.starred, 'i')

      filteredEmails = this.emails.filter(email => {
        if (this.filterBy.stars) return searchRegex.test(email.subject && email.body) && email.isStarred
        return searchRegex.test(email.subject && email.body && email.from) && statusRegex.test(email.status)
      })
      console.log(filteredEmails)
      return filteredEmails
    },


    watch: {
    },

  },
  components: {
    EmailList,
    EmailCompose,
    SideNav,
    EmailFilter
  },
}
