import { emailService } from "../services/emailService.js"
import { svgService } from "../../../services/svg.service.js"
import ErrModal from "./ErrModal.js"
export default {
  name: 'Email Compose',
  props: [],
  template: `   
    <form v-if="composeEmail" @focusout="onFormBlur" ref="form"   class="new-email-form " >

      <header>
        <h5>New Message</h5>
        <button class="icon-x close-btn" v-html="getSvg('x')" @click="saveEmail(false)"></button>
      </header>

      <!-- <input v-model="email.from" id="from" type="text" placeHolder ="Your-Mail" /> -->
      <input class="input-to" v-model = "composeEmail.to"  type="text" ref='toInput' placeHolder="To" />
      <input class="input-subject" v-model="composeEmail.subject"  type="text" placeHolder="Subject"/>
      <textarea class="compose-text-area" v-model="composeEmail.body" cols="30" rows="10"></textarea>
      <button class="form-submit-btn" @click="saveEmail(true)">Send</button>
      <!-- <ErrModal @closeErrModal="closeErrModal" v-if="isErr"/> -->
    </form>

    `,
  components: {
  },
  created() {
  },
  data() {
    return {
      isErr: false,
      // isForm: false,
      composeEmail: null,
    }
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    closeErrModal(){
    this.isErr = false
    },
    focusInput() {
      this.$refs.toInput.focus();
    },
    closeComposeForm() {
      this.$emit('updateQuery')
      this.composeEmail = null
    },
    saveEmail(flag) {
      console.log(flag);
      const email = this.composeEmail
      if (flag && !email.to) return this.isErr = true // TODO: Add Err
      if (!flag && !email.to && !email.subject && !email.body) return this.closeComposeForm()
      email.status = flag ? 'sent' : 'drafts'
      this.$emit('saveEmail', email)
      this.closeComposeForm()
    },
    loadComposeEmail() {
      const { newComposeId } = this.$route.query
      emailService.get(newComposeId)
        .then(email => this.composeEmail = email)
    },
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    }
  },
  computed: {
    composeEmailId() {
      return this.$route.query.newComposeId
    }

  },
  mounted() {
  },
  watch: {
    composeEmailId() {
      if (this.$route.query.newComposeId) {
        this.loadComposeEmail()
      }
    },
  },
  components: {
    ErrModal
  }
}
