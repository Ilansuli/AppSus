
import { svgService } from "../../../services/svg.service.js"
export default {
  name: 'Email Preview',
  props: ['email'],
  template: `
        <article class="email-preview" :class="setReadClass" @mouseover="isHover = true" @mouseleave="isHover = false">

          <div class="static-preview-btns">
            <button data-title="Not Starred" @click.stop="toggleStar(true)" :class="setHoverClass"  v-if="!email.isStarred"><div className="icon" v-html="getSvg('star')"></div></button>
            <button data-title="Starred" @click.stop="toggleStar(false)" class ="gold-fill" v-if="email.isStarred"><div className="icon" v-html="getSvg('starFill')"></div></button>
            <button data-title="Important" @click.stop="toggleStatus('important')" class="gold-fill"  v-if="email.status === 'important'"><div className="icon" v-html="getSvg('importantFill')"></div></button>
            <button data-title="Important" @click.stop="toggleStatus('important')":class="setHoverClass"  v-if="email.status !== 'important'"><div className="icon" v-html="getSvg('important')"></div></button>
            <span class="preview-name">{{email.from}}</span>
          </div>

          <div class="preview-txt">
          <span class="subject">{{email.subject}} - </span>
            <span class="txt">{{email.body[0]}}</span>
          </div>
          <span>...</span>
            <span v-if="!isHover" class="preview-date">Feb 23</span>

            
            <ul class="hovered-btns"  v-if="isHover">
              <li >
                <button @click.stop="removeEmail" data-title = "Delete"><div className="icon" v-html="getSvg('trash')"></div></button>
              </li>
              <li >
              <button  v-if="!email.isRead" @click.stop="toggleRead(true)" data-title = "Mark As Read"><div className="icon" v-html="getSvg('unreadEnvelope')"></div></button>
              <button  v-if="email.isRead" @click.stop="toggleRead(false)" data-title = "Mark As Unread" ><div className="icon" v-html="getSvg('envelope')"></div></button>
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
    toggleRead(flag) {
      this.email.isRead = flag
      this.$emit('updateEmail',this.email)
    },
    toggleStar(flag) {
      this.email.isStarred = flag
      this.$emit('updateEmail',this.email)
    },
    toggleStatus(status) {
      this.email.status = status
      this.$emit('updateEmail',this.email)
    }
  },
  computed: {
    convertTimeStamp() {
      const currentDateTS = Date.now()
      const sentTS = this.email.sentAt
      if (currentDateTS - sentTS < 604800) {
        return sentDate.getMonth() + 1 + 'months'
      }
      const sentDate = new Date(sentTS)
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
    }
  },


}
