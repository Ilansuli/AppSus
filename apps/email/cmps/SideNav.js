import { svgService } from "../../../services/svg.service.js"
import { emailService } from "../services/emailService.js"

export default {
        name: 'Side Nav',
        props: ['emails', 'filterBy'],
        emits: ['filterStatus', 'filterStarred', 'closeDetails'],
        template: `
<section class="side-nav">

        <section @click="filterStatus('inbox')" class="side-nav-item inbox" :class="{'clicked-side-nav' : filterBy.status === 'inbox'}">
                <div @click = "loadCountUnread" class="icon" v-html="filterBy.status ==='inbox' ? getSvg('inboxFill') : getSvg('inbox')"></div>
                <div>
                        <span class="nav-status">Inbox</span>
                        <span class="unread-count">{{countUnread}}</span>
                </div>
        </section>

        <section class="side-nav-item" data-title="Starred"   @click="filterStarred"  :class= "{'clicked-side-nav' : status === 'starred'}" >
                <div class="icon" v-html="filterBy.stars ? getSvg('starFill') : getSvg('star')"></div>
                <span   class="nav-status">Starred</span>
        </section>

        <section  @click="filterStatus('important')" data-title="Important" class="side-nav-item important" :class= "{'clicked-side-nav' : filterBy.status === 'important'}">
                <div class=" icon icon-important" v-html="filterBy.status ==='important' ? getSvg('importantFill') : getSvg('important')"></div>
                <span class="nav-status">Important</span>
        </section>

        <section @click="filterStatus('sent')" data-title="Sent" class="side-nav-item" :class= "{'clicked-side-nav' : filterBy.status === 'sent'}">
                <div class="icon" v-html="filterBy.status ==='sent' ? getSvg('sentFill') : getSvg('sent')"></div>
                <span class="nav-status">Sent</span>
        </section>

        <section  @click="filterStatus('drafts')" data-title="Draft" class="side-nav-item" :class= "{'clicked-side-nav' : filterBy.status === 'drafts'}">
                <div class="icon"v-html="filterBy.status ==='drafts' ? getSvg('draftsFill') : getSvg('drafts')"></div>
                <span class="nav-status">Draft</span>
        </section>

        <section  @click="filterStatus('trash')" data-title="Trash" class="side-nav-item" :class= "{'clicked-side-nav' : filterBy.status === 'trash'}">
                <div class="icon" v-html="getSvg('trash')"></div>
                <span class="nav-status">Trash</span>
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

