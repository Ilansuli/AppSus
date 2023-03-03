
export default {
  name: 'Email Compose',
  props: [],
  template: `        
        <form @submit.prevent="saveEmail" class="new-email-form " >
            <header class="flex"><h5>New Message</h5> - x</header>
            <!-- <input v-model="email.from" id="from" type="text" placeHolder ="Your-Mail" /> -->
            <input v-model = "email.to"  type="text" placeHolder="To" />
            <input v-model="email.subject"  type="text" placeHolder="Subject"/>
            <textarea v-model="email.body" cols="30" rows="10"></textarea>
            <button>Send</button>
        </form>
        `,
  components: {
  },
  created() { },
  data() {
    return {
      email: {
        to: '',
        subject: '',
        status: 'sent',
        isStarred: false,
        body: '',
        sentAt: Date.now()
      }
    }
  },
  methods: {
    saveEmail() {
      console.log('compose email', this.email)
      this.$emit('saveEmail', this.email)
    }
  },
  computed: {},
}
