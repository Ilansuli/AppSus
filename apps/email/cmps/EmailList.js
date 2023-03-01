import EmailPreview from "./EmailPreview.js"

export default {
  name: 'Email List', 
  props: ['emails'],
  template: `
        <section class="email-list">
                <section v-for="email in emails" >
                    <EmailPreview :email = "email"/>
                </section>
                
            
        </section>
        `,
components:{
    EmailPreview
},
created() {},
  data() {
    return {
        
    }
  },
  methods: {},
  computed: {},
}
