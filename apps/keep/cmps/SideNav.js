import { svgService } from "../../../services/svg.service.js"

export default {
        name: 'Side Nav',
        props: [],
        emits: ['filter'],
        template: `
  <section class="side-nav">

          <section @click="filter('')"  class="side-nav-item inbox" :class= "clickedClass('')">
                  <div class="icon" v-html="getSvg('bulb')"></div>
    <div>
            <span>Notes</span>
        </div>
</section>

<section class="side-nav-item" @click="filter('NoteTxt')" :class= "clickedClass('NoteTxt')" >
        <div class="icon" v-html="getSvg('pencil2')"></div>
        <span>Texts</span>
</section>
<section  @click="filter('NoteImg')" class="side-nav-item" :class= "clickedClass('NoteImg')">
        <div class="icon" v-html="getSvg('img')"></div>
        <span>Imgs</span>
</section>
<section @click="filter('NoteVideo')" class="side-nav-item" :class= "clickedClass('NoteVideo')">
        <div class="icon" v-html="getSvg('video')"></div>
        <span>Videos</span>
</section>
<section  @click="filter('NoteTodos')" class="side-nav-item" :class= "clickedClass('NoteTodos')">
        <div class="icon" v-html="getSvg('done')"></div>
        <span>Todos</span>
</section>



</section>
`,
        components: {},
        created() {
        },
        data() {
                return {
                        type: ''

                }
        },
        methods: {
                getSvg(iconName) {
                        return svgService.getNoteSvg(iconName)
                },
                filter(type) {
                        this.type = type
                        this.$emit('filter', this.type)
                },
                clickedClass(type) {
                        if (this.type === type) {
                                return 'clicked-side-nav'
                        }
                },

        },
        computed: {


        },
}
