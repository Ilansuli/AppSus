import { emailService } from "../services/emailService.js"

export default {
  name: 'Email Compose',
  props: [],
  template: `   
    <form v-if="composeEmail" @focusout="onFormBlur" ref="form"  @submit.prevent="saveEmail" class="new-email-form " >
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
    this.composeEmail = null
    setTimeout(() => {
      if (this.$route.query.newComposeId) {
        this.composeEmail = this.loadComposeEmail()
      }
    }, 100)

  },
  data() {
    return {
      isForm: false,
      composeEmail: null,
    }
  },
  methods: {
    onFormBlur() {
      // console.log(this.composeEmail)
      if (this.isForm) return
      this.composeEmail.status = 'drafts'
      
      this.saveEmail()
      if (this.$route.params) {
        const {emailId} = this.$route.params
        this.$router.push(`/email/${emailId}`)
      }
    },
    loadComposeEmail() {
      const { newComposeId } = this.$route.query
      emailService.get(newComposeId)
        .then(email => this.composeEmail = email)
    },
    saveEmail() {
      this.composeEmail.from = `To: ${this.composeEmail.to}`
      this.$emit('saveEmail', this.composeEmail)
      this.composeEmail = null
    }
  },
  computed: {
    composeEmailId() {
      return this.$route.query.newComposeId
    }
  },
  mounted() {
    // this.$refs.toInput.focus()
  },
  watch: {
    composeEmailId() {
      if (this.$route.query.newComposeId) {
        this.loadComposeEmail()
      } else {
        this.composeEmail = null
        console.log(this.composeEmail)
      }
    },
  }
}
