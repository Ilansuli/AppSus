
import { svgService } from "../../../services/svg.service.js"
export default {
  name: 'Email Preview',
  props: ['email'],
  template: `
        <article class="email-preview" :class="setReadClass" @mouseover="isHover = true" @mouseleave="isHover = false">

          <div class="static-preview-btns">
            <button data-title="Starred" class ="gold-fill" v-if="email.isStarred"><div className="icon" v-html="getSvg('starFill')"></div></button>
            <button data-title="Not Starred" :class="setHoverClass"  v-if="!email.isStarred"><div className="icon" v-html="getSvg('star')"></div></button>
            <button data-title="Important" class="gold-fill"  v-if="email.isImportant"><div className="icon" v-html="getSvg('importantFill')"></div></button>
            <button data-title="Important" :class="setHoverClass"  v-if="!email.isImportant"><div className="icon" v-html="getSvg('important')"></div></button>
            <span class="preview-name">{{email.from}}</span>
          </div>

          <div class="preview-txt">
            <span class="subject">{{email.subject}} - </span>
            <span class="txt">{{email.body}}</span>
          </div>

            <span v-if="!isHover" class="preview-date">Feb 23</span>

            <ul v-if="isHover">
              <li >
                <button @click="removeEmail" data-title = "Delete"><div className="icon" v-html="getSvg('trash')"></div></button>
              </li>
              <li >
              <button  v-if="!email.isRead" @click="email.isRead = true" data-title = "Mark As Read"><div className="icon" v-html="getSvg('unreadEnvelope')"></div></button>
              <button  v-if="email.isRead" @click="email.isRead = false" data-title = "Mark As Unread" ><div className="icon" v-html="getSvg('envelope')"></div></button>
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
      isRead: this.email.isRead
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    removeEmail() {
      this.$emit('removeEmail', this.email.id)
    },
  
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
    setHoverClass(){
      return {
          'hovered': this.isHover,
          'svg-button': !this.isHover,
      }
    },
    setReadClass(){
      return{
        'unread': !this.email.isRead
      }
    }
  },
  

}
