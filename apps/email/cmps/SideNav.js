import { svgService } from "../../../services/svg.service.js"

export default {
  name: 'Side Nav', 
  props: [],
  template: `
  <section class="side-nav">

          <section @click="filterStatus('inbox')" data-title="Inbox" class="side-nav-item inbox" :class= "clickedClass('inbox')">
                  <div class="icon" v-html="getSvg('inbox')"></div>
    <div>
            <span>Inbox</span>
            <span class="unread-count">3,180</span>
        </div>
</section>

<section class="side-nav-item" :class= "clickedClass('star')" >
        <div class="icon" v-html="getSvg('star')"></div>
        <span>Starred</span>
</section>
<section  @click="filterStatus('important')" class="side-nav-item" :class= "clickedClass('important')">
        <div class="icon" v-html="getSvg('important')"></div>
        <span>Important</span>
</section>
<section @click="filterStatus('sent')" class="side-nav-item" :class= "clickedClass('sent')">
        <div class="icon" v-html="getSvg('sent')"></div>
        <span>Sent</span>
</section>
<section  @click="filterStatus('drafts')" class="side-nav-item" :class= "clickedClass('drafts')">
        <div class="icon" v-html="getSvg('drafts')"></div>
        <span>Draft</span>
</section>
<section  @click="filterStatus('trash')" class="side-nav-item" :class= "clickedClass('trash')">
        <div class="icon" v-html="getSvg('trash')"></div>
        <span>Trash</span>
</section>


</section>
`,
components:{},
created() {
        this.status = 'inbox'
},
data() {
    return {
        status: ''
    }
  },
  methods: {
     getSvg(iconName) {
    return svgService.getMailSvg(iconName)
  },
  filterStatus(status){
        this.status = status
        this.$emit('filterStatus', {keyWord: 'status', toUpdate: status})
  },
  clickedClass(status){
        if(this.status === status) return 'clicked-side-nav'
        }
  },
  computed: {
      
  },
}
