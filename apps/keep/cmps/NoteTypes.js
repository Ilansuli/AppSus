import { svgService } from "../../../services/svg.service.js"
import ToolBar from "./ToolBar.js"
export default {
    name: 'Note Types',
    props: [],
    emits: ['change-color', 'change-type'],
    template: `
        <nav class="note-type" >
                    <button @click="toggleColorPicker"><div className="icon" v-html="getSvg('palette')"></div></button>
                    <button @click="changeType('NoteTxt')"><div className="icon" v-html="getSvg('text')"></div></button>
                    <button @click="changeType('NoteImg')"><div className="icon" v-html="getSvg('img')"></div></button>
                    <button @click="changeType('NoteVideo')"><div className="icon" v-html="getSvg('video')"></div></button>
                    <button @click="changeType('NoteTodos')"><div className="icon" v-html="getSvg('todo')"></div></button>
        </nav>
        <section class="color-picker" v-if="isSelectColor">
                <article @click="changeBcgColor('#f28b82')" class="color red" ></article>
                <article class="color orange"  @click="changeBcgColor('#fabc02')"></article>
                <article class="color yellow"   @click="changeBcgColor('#fff476')"></article>
                <article class="color green"  @click="changeBcgColor('#ccff90')"></article>
                <article class="color blue"  @click="changeBcgColor('#a7ffeb')"></article>
                <article class="color white"  @click="changeBcgColor('#ffffff')"></article>
            </section>
        `,
    components: {

    },
    created() { },
    data() {
        return {
            isSelectColor: false
        }
    },
    methods: {
        changeType(type) {
            this.$emit('change-type', type)
        },
        changeBcgColor(color) {
            this.$emit('change-color', color)
        },
        toggleColorPicker() {
            this.isSelectColor = !this.isSelectColor
        },

        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
    },

    computed: {},
}
