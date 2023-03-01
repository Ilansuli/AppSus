import { emailService } from "../services/emailService.js"

export default {
  name: 'Email Compose', 
  props: [],
  template: `
        <form @submit.prevent="saveEmail" class="new-email-form " >
            <header class="flex"><h5>New Message</h5> - x</header>
            <input v-model="email.from" id="from" type="text" placeHolder ="Your-Mail" />
            <input v-model="email.to" id="to" type="text" placeHolder="To" />
            <input v-model="email.subject" id="subject" type="text" placeHolder="Subject"/>
            <textarea v-model="email.body" cols="30" rows="10"></textarea>
            <button>Send</button>
        </form>
        `,
components:{
    emailService
},
created() {},
  data() {
    return {
        email:{
            from: '',
            to:'',
            subject:'',
            body: '',
            sentAt: Date.now()
        }
    }
  },
  methods: {
    saveEmail(){
       this.$emit('saveEmail',this.email)
    }
  },
  computed: {},
}
