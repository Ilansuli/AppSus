import { emailService } from "../services/emailService.js"
import { svgService } from "../../../services/svg.service.js"
export default {
    name: 'Email Details',
    props: [],
    template: `
    <section class="email-details">
        <h1>{{email.subject}}</h1>

        <div className="icon" v-html="getSvg('user')"></div>

        <div class="main-details-container">
              <header>
                    <div>
                        <h4 class="details-subject">{{getName()}} <span> &lt;{{email.from}}&gt;</span></h4>
                        <!-- <p>\< {{email.from}} >\</p> -->
                    </div>
                    <div class="details-options">
                        <p>Feb 20, 2023,8:46PM (10 days ago)</p>
                        <div >
                            <button @click = "makeNote" className="icon" v-html="getSvg('notes')"></button>
                            <div v-if="!email.isStarred" className="icon" v-html="getSvg('star')"></div>
                            <div v-if="email.isStarred" className="icon" v-html="getSvg('starFill')"></div>
                        </div>
                    </div>  
           </header>
           <article class ="details-body">
       
              <p>
                  {{email.body[0]}}
                </p>
              <p>
                  {{email.body[1]}}
                </p>
              <p>
                  {{email.body[2]}}
                </p>
              <p>
                  {{email.body[3]}}
                </p>
              <p>
                  {{email.body[4]}}
                </p>
              <p>
                  {{email.body[5]}}
                </p>


           </article>
        </div>

    </section>
        `,
    components: {},
    created() {
        this.loadEmail()
    },
    data() {
        return {
            email: {}
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getMailSvg(iconName)
          },
        getName(){
           let idx = this.email.from.indexOf('@')
           const name = this.email.from.slice(0,idx)
           return name
        },
        makeNote(){
            this.$emit('makeNote',this.email)
        },
        getSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
        loadEmail(){
            const { emailId } = this.$route.params
            console.log(emailId)
            emailService.get(emailId)
                .then(email => this.email = email)
        }
    },
    computed: {},
}
