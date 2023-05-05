import { svgService } from "../../../services/svg.service.js"
import { emailService } from "../services/emailService.js"

export default {
        name: 'Side Nav',
        props: ['emails','filterBy'],
        emits:['filterStatus','filterStarred','closeDetails'],
        template: `
<section class="side-nav">

        <section @click="filterStatus('inbox')" data-title="Inbox" class="side-nav-item inbox" :class="{'clicked-side-nav' : filterBy.status === 'inbox'}">
                <div @click = "loadCountUnread" class="icon" v-html="getSvg('inbox')"></div>
                <div>
                        <span>Inbox</span>
                        <span class="unread-count">{{countUnread}}</span>
                </div>
        </section>

        <section class="side-nav-item" data-title="Starred" @click="filterStarred"  :class= "{'clicked-side-nav' : status === 'starred'}" >
                <div class="icon" v-html="getSvg('star')"></div>
                <span>Starred</span>
        </section>

        <section  @click="filterStatus('important')" data-title="Important" class="side-nav-item" :class= "{'clicked-side-nav' : filterBy.status === 'important'}">
                <div class="icon" v-html="getSvg('important')"></div>
                <span>Important</span>
        </section>

        <section @click="filterStatus('sent')" data-title="Sent" class="side-nav-item" :class= "{'clicked-side-nav' : filterBy.status === 'sent'}">
                <div class="icon" v-html="getSvg('sent')"></div>
                <span>Sent</span>
        </section>

        <section  @click="filterStatus('drafts')" data-title="Draft" class="side-nav-item" :class= "{'clicked-side-nav' : filterBy.status === 'drafts'}">
                <div class="icon" v-html="getSvg('drafts')"></div>
                <span>Draft</span>
        </section>

        <section  @click="filterStatus('trash')" data-title="Trash" class="side-nav-item" :class= "{'clicked-side-nav' : filterBy.status === 'trash'}">
                <div class="icon" v-html="getSvg('trash')"></div>
                <span>Trash</span>
        </section>


</section>
`,
        components: {},
        created() {
                this.status = 'inbox'
                this.loadCountUnread()

        },
        data() {
                return {
                        status: '',
                        isStar: false,
                        countUnread: 0,
                }
        },
        methods: {
                loadCountUnread() {
                        setTimeout(() => {
                                let unreadCounter = 0
                                this.emails.forEach(email => {
                                        if (email.isRead) unreadCounter++
                                })
                                this.countUnread = unreadCounter

                        }, 500)
                },
                getSvg(iconName) {
                        return svgService.getMailSvg(iconName)
                },

                filterStatus(status) {
                        this.status = status
                        this.$emit('filterStatus', { keyWord: 'status', toUpdate: status })
                        this.$emit('closeDetails')
                },
                filterStarred() {
                        this.status = 'starred'
                        this.$emit('filterStarred')
                        this.$emit('closeDetails')
                },
        },
        computed: {
                clickedClass(status) {
                        if (this.filterBy.status === status) {
                                return 'clicked-side-nav'
                        }
                },
        },
        watch: {

        }
}

