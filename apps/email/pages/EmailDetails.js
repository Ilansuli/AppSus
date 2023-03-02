import { emailService } from "../services/emailService.js"
import { svgService } from "../../../services/svg.service.js"
export default {
    name: 'Email Details',
    props: [],
    template: `
    <section class="email-details">
        <h1>{{email.subject}}</h1>

        <div class="icon" >
            icon
        </div>

        <div class="main-details-container">
              <header>
                    <div>
                        <h4 class="details-subject">{{email.from}}</h4>
                        <p>\< {{email.from}} >\</p>
                    </div>
                    <div>
                        <p>Feb 20, 2023,8:46PM (10 days ago)</p>
                        <div v-if="!email.isStarred" className="icon" v-html="getSvg('star')"></div>
                        <div v-if="email.isStarred" className="icon" v-html="getSvg('starFill')"></div>
                    </div>  
           </header>
            <p class ="details-body">
                {{email.body}}
            </p>
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
        loadEmail(){
            const { emailId } = this.$route.params
            console.log(emailId)
            emailService.get(emailId)
                .then(email => this.email = email)
        }
    },
    computed: {},
}
