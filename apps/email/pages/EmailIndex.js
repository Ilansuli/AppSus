import EmailList from "../cmps/EmailList.js"
import EmailCompose from "../cmps/EmailCompose.js"

import { eventBusService } from "../../../services/event-bus.service.js"
import { emailService } from "../services/emailService.js"

export default {
  name: 'Note Keep', 
  props: [],
  template: `
  <section class="email-index">
    <section class ="side-nav">
      <!-- <SideNav/> -->
      <button @click="isNewEmail = !isNewEmail">✏ compose</button>
    </section>
    <section class="email-list-wrap"> 
        
        <EmailList
           @removeEmail ="removeEmail"
           :emails="emails"
           v-if="!isDetails" 
        />
    </section>
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
  
  saveEmail(email){
    console.log('hey')
      emailService.save(email)
      .then(savedEmail=>{
        this.emails.unshift(savedEmail)
      })
      this.isNewEmail = false
  },
  removeEmail(emailId){
    emailService.remove(emailId)
    .then(()=>{
        const emailIdx = this.emails.findIndex(email => email.id === emailId )
        this.emails.splice(emailIdx, 1)
      })
  }
},
computed: {

},
components:{
  EmailList,
  EmailCompose,
},
}
