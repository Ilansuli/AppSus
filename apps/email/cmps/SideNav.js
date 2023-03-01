import { svgService } from "../../../services/svg.service.js"

export default {
  name: 'Side Nav', 
  props: [],
  template: `
<section data-title="Inbox" class="side-nav-item inbox" >
        <div class="icon" v-html="getSvg('inbox')"></div>
    <div>
        <span>Inbox</span>
        <span class="unread-count">3,180</span>
    </div>
</section>

<section class="side-nav-item" >
        <div class="icon" v-html="getSvg('star')"></div>
        <span>Starred</span>
</section>
<section class="side-nav-item" >
        <div class="icon" v-html="getSvg('important')"></div>
        <span>Important</span>
</section>
<section class="side-nav-item" >
        <div class="icon" v-html="getSvg('sent')"></div>
        <span>Sent</span>
</section>
<section class="side-nav-item" >
        <div class="icon" v-html="getSvg('drafts')"></div>
        <span>Draft</span>
</section>
<section class="side-nav-item" >
        <div class="icon" v-html="getSvg('trash')"></div>
        <span>Trash</span>
</section>


        `,
components:{},
created() {},
  data() {
    return {}
  },
  methods: {
     getSvg(iconName) {
    return svgService.getMailSvg(iconName)
  },
  },
  computed: {},
}
