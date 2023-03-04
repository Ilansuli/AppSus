import { emailService } from "../services/emailService.js"

export default {
  name: 'Email Compose',
  props: [],
  template: `   
    <form @focusout="onFormBlur" ref="form"  @submit.prevent="saveEmail" class="new-email-form " >
      <header><h5>New Message</h5> - x</header>
      <!-- <input v-model="email.from" id="from" type="text" placeHolder ="Your-Mail" /> -->
      <input @mouseover="isForm = true" @mouseleave = "isForm = false" ref="toInput" v-model = "composeEmail.to"  type="text" placeHolder="To" />
      <input  @mouseover="isForm = true" @mouseleave = "isForm = false" v-model="composeEmail.subject"  type="text" placeHolder="Subject"/>
      <textarea   @mouseover="isForm = true" @mouseleave = "isForm = false" v-model="composeEmail.body" cols="30" rows="10"></textarea>
      <button @mouseover="isForm = true" @mouseleave = "isForm = false">Send</button>
    </form>
    `,
  components: {
  },
  created() {
   this.composeEmail = this.loadComposeEmail()
   }, 
  data() {
    return {
      composeEmail: {},
      isForm: false
    }
  },
  methods: {
    onFormBlur() {
      // console.log(this.composeEmail)
      if (this.isForm) return
      this.composeEmail.status = 'drafts'
      this.saveEmail()
    },
    loadComposeEmail(){
      const { newComposeId } = this.$route.query
      console.log(newComposeId)
      emailService.get(newComposeId)
      .then(email => this.email = email)
    },
    saveEmail() {
      this.$emit('saveEmail', this.composeEmail)
    }
  },
  computed: {},
  mounted() {
    this.$refs.toInput.focus()
  }
}
