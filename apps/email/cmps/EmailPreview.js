
import { svgService } from "../../../services/svg.service.js"
export default {
  name: 'Email Preview',
  props: ['email'],
  emits: ['removeEmail', 'updateEmail',],
  template: `
        <article class="email-preview" :class="setReadClass" @mouseover="isHover = true" @mouseleave="isHover = false">

          <div class="static-preview-btns">
            <button 
                :data-title="email.isStarred ? 'Starred' : 'Not Starred' "
                @click.stop="toggleStar"
                :class="classByStatus('starred','gold-fill',setHoverClass)">
              <div className="icon"
                  v-html="email.isStarred ? getSvg('starFill') : getSvg('star')">
              </div>
            </button>
            
            <button 
                :data-title="email.status === 'important' ? 'Not Important':'Important'"
                @click.stop="toggleStatus('important')"
                :class="classByStatus('important','gold-fill',setHoverClass)">
              <div className="icon" 
                v-html="email.status === 'important' ? getSvg('importantFill') : getSvg('important')">
              </div>
            </button>
            <span class="preview-name" :class="draftClass" >{{namePreview}}</span>
          </div>

          <div class="preview-txt">
          <span class="subject">{{email.subject ? email.subject+'-' : '(no subject)'}}  </span>
            <span class="txt">{{email.body}}</span>
            <span>{{ lineDots }}</span>
          </div>
            <span v-if="!isHover" class="preview-date">{{formatDate}}</span>

            <ul class="hovered-btns"  v-if="isHover">

              <li >
                <button @click.stop="removeEmail" data-title = "Delete"><div className="icon" v-html="getSvg('trash')"></div></button>
              </li>

              <li>
              <button 
                  @click.stop="toggleRead" 
                  :data-title = "email.isRead?'Mark As Unread':'Mark As Read'">
                <div className="icon"
                    v-html="email.isRead ? getSvg('envelope') : getSvg('unreadEnvelope')">
                </div>
              </button>
              </li>

            </ul>
        </article>
        `,
  components: {},
  created() {

  },
  data() {
    return {
      isHover: false,
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    removeEmail() {
      this.$emit('removeEmail', this.email.id)
    },
    toggleRead() {
      this.email.isRead = !this.email.isRead
      this.$emit('updateEmail', this.email)
    },
    toggleStar() {
      this.email.isStarred = !this.email.isStarred
      this.$emit('updateEmail', this.email)
    },
    toggleStatus(status) {
      this.email.status = status
      this.$emit('updateEmail', this.email)
    },
    classByStatus(status, ifTrue, ifFalse) {
      if (status !== 'starred') return this.email.status === status ? ifTrue : ifFalse
      return this.email.isStarred ? ifTrue : ifFalse
    },
    senderNameExct() {
      const regex = /^([^<>]+)\s*<([^<>]+)>$/;
      const match = regex.exec(this.email.from);
      if (match) {
        const name = match[1];
        return name
      }
    },
  },
  computed: {
    formatDate() {
      const date = new Date(this.email.sentAt);
      const today = new Date();
      const thisYear = today.getFullYear();

      if (date.toDateString() === today.toDateString()) {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleTimeString([], options);
      } else if (date.getFullYear() === thisYear) {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString([], options);
      } else {
        const options = { year: 'numeric', day: 'numeric', month: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
      }
    },
    setHoverClass() {
      return {
        'hovered': this.isHover,
        'svg-button': !this.isHover,
      }
    },
    setReadClass() {
      return {
        'unread': !this.email.isRead
      }
    },
    lineDots() {
      if (this.email.body[0] && this.email.body[0].length + this.email.body[1].length > 103) return '...'
    },
    namePreview() {
      // { { email.status === 'sent' ? 'To: ' : '' } } { { this.email.status === 'sent' ? this.email.to : senderNameExct } }
      if(this.email.status === 'sent') return `To: ${this.email.to}`
      else if(this.email.status === 'drafts') return 'Draft'
      else return this.senderNameExct()
    },
    draftClass(){
      return this.email.status === 'drafts' ? 'draft' : ''
    }
  },


}
