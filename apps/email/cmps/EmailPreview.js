
import { svgService } from "../../../services/svg.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"
export default {
  name: 'Email Preview',
  props: ['email'],
  template: `
        <article>
          <div>
            <button><div className="icon" v-html="getSvg('star')"></div></button>
            <span>{{email.subject}}</span>
          </div>
          
            <span class="preview-txt">{{email.body}}</span>

            <span>Feb 23</span>
            <ul v-if="hover">
              <li >
                <button @click="removeEmail"><div className="icon" v-html="getSvg('trash')"></div></button>
              </li>
            </ul>
            
        </article>
        `,
  components: {},
  created() { 
  },
  data() {
    return {
      hover:false
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    removeEmail(){
      this.$emit('removeEmail',this.email.id)
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
      const sentDate = new Date(sentTS)
      if (currentDateTS - sentTS < 604800) {
        return sentDate.getMonth() + 1 + 'months'
      }
    }
  },

}
