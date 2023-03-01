
import { svgService } from "../../../services/svg.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"
export default {
  name: 'Email Preview',
  props: ['email'],
  template: `
        <article @mouseover="isHover = true" @mouseleave="isHover = false">
          <div>
            <button data-title="Starred" class ="gold-fill" v-if="email.isStarred"><div className="icon" v-html="getSvg('starFill')"></div></button>
            <button data-title="Not Starred" :class="setClass"  v-if="!email.isStarred"><div className="icon" v-html="getSvg('star')"></div></button>
            <button data-title="Important" class="gold-fill"  v-if="email.isImportant"><div className="icon" v-html="getSvg('importantFill')"></div></button>
            <button data-title="Important" :class="setClass"  v-if="!email.isImportant"><div className="icon" v-html="getSvg('important')"></div></button>
            <span>{{email.subject}}</span>
          </div>
            <span class="preview-txt">{{email.body}}</span>
            <span v-if="!isHover" class="preview-date">Feb 23</span>
            <ul v-if="isHover">
              <li >
                <button @click="removeEmail" data-title = "Delete"><div className="icon" v-html="getSvg('trash')"></div></button>
              </li>
              <li >
              <button  v-if="!isRead" @click="isRead = true" data-title = "Mark As Read"><div className="icon" v-html="getSvg('unreadEnvelope')"></div></button>
              <button  v-if="isRead" @click="isRead = false" data-title = "Mark As Unread" ><div className="icon" v-html="getSvg('envelope')"></div></button>
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
    // displayBodyTxt(){
    //   if(this.email.body.length >= 115){
    //     console.log('hey')
    //     return this.email.body.slice(0,115) + '...'
    //   }
    // }
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
    setClass(){
      return {
          'hovered': this.isHover,
          'svg-button': !this.isHover,
      }
    }
  },
  

}
