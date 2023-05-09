import { emailService } from "../services/emailService.js"
import { svgService } from "../../../services/svg.service.js"
export default {
    name: 'Email Details',
    props: [],
    emits: ['makeNote'],
    template: `
    <div class="email-details">
        <h1>{{email.subject}}</h1>

        <div className="icon" v-html="getSvg('user')"></div>

        <section class="main-details-container">
              <header>
                        <section class="details-subject">
                            <span class="details-sender">
                                {{senderName}}
                            </span>
                             <span class="details-email-from"> 
                                &lt;{{email.from}}&gt;
                            </span>
                        </section>
                    <section class="details-options">
                        <p>{{convertedSentAt}}</p>
                        <div class="details-icons" >
                            <button @click = "makeNote" class="icon" v-html="getSvg('notes')"></button>
                            <div v-if="!email.isStarred" class="details-icon-star" v-html="getSvg('star')"></div>
                            <div v-if="email.isStarred" class="details-icon-star" v-html="getSvg('starFill')"></div>
                        </div>
                    </section>  
           </header>
           <article class ="details-body">
            <p>
                {{email.body}}
            </p>
           </article>
        </section>
    </div>

        `,
    components: {},
    created() {
        this.loadEmail()
    },
    data() {
        return {
            email: {},
            senderName: '',
            convertedSentAt:''
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
                    this.extractNameFromEmail(email.from)
                    this.formatDate(email.sentAt)
                })
        },
        extractNameFromEmail(email) {
            const regex = /^(.*)@.*$/;
            const match = email.match(regex);
            console.log(match);
            this.senderName = match ? match[1].trim() : null
        },
        formatDate(timestamp) {
            const now = Date.now();
            const diffInMs = now - timestamp;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            const date = new Date(timestamp);
          
            const month = date.toLocaleString('default', { month: 'short' });
            const day = date.getDate();
            const year = date.getFullYear();
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const time = `${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
          
            return this.convertedSentAt = `${month} ${day}, ${year},${time}` //Example OutPut : "Feb 20, 2023,8:46PM (10 days ago)"
          }
          
    },
    computed: {
    },
}
