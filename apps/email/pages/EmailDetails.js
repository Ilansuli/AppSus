import { emailService } from "../services/emailService.js"
import { svgService } from "../../../services/svg.service.js"
export default {
    name: 'Email Details',
    props: [],
    emits: ['makeNote'],
    template: `
    <section class="email-details">
        <h1>{{email.subject}}</h1>

        <div className="icon" v-html="getSvg('user')"></div>

        <div class="main-details-container">
              <header>
                    <div>
                        <h4 class="details-subject">{{senderName}} <span> &lt;{{senderEmail}}&gt;</span></h4>
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
                {{email.body}}
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
            email: {},
            senderName: '',
            senderEmail: ''
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },

        makeNote() {
            this.$emit('makeNote', this.email)
        },
        getSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
        loadEmail() {
            const { emailId } = this.$route.params
            emailService.get(emailId)
                .then(email => {
                    this.email = email
                    this.senderDetailsExct()
                })
        },
        senderDetailsExct() {
            const regex = /^([^<>]+)\s*<([^<>]+)>$/;
            const match = regex.exec(this.email.from);
            if (match) {
                const name = match[1];
                const email = match[2];
                console.log(name, email);
                this.senderName = name
                this.senderEmail = email
            }
        },
    },
    computed: {
    },
}
