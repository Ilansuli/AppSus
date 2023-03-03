import { svgService } from "../../../services/svg.service.js"

export default {
    name: '',
    emits: ['remove', 'change-color', 'pin'],
    template: `
        <div class="tool-bar">
                    <button @click="pin">
                        <div  data-title="Pin" className="icon" v-html="getSvg('pin')"></div>
                    </button>
                
                    <button  @click="remove">
                        <div data-title="Delete" className="icon" v-html="getSvg('trash')"></div>
                    </button>
                    <button @click="toggleColorPicker" >
                        <div data-title=" Background Color"  className="icon" v-html="getSvg('palette')"></div>
                    </button>
                    </div>
        <section class="color-picker" v-if="isSelectColor">
                <article @click="changeBcgColor('#f28b82')" class="color red" ></article>
                <article class="color orange"  @click="changeBcgColor('#fabc02')"></article>
                <article class="color yellow"   @click="changeBcgColor('#fff476')"></article>
                <article class="color green"  @click="changeBcgColor('#ccff90')"></article>
                <article class="color blue"  @click="changeBcgColor('#a7ffeb')"></article>
            </section>
        `,
    components: {},
    created() { },
    data() {
        return {
            isSelectColor: false
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        changeBcgColor(color) {
            this.$emit('change-color', color)
        },
        toggleColorPicker() {
            this.isSelectColor = !this.isSelectColor
        },
        remove() {
            this.$emit('remove')
        },
        pin() {
            this.$emit('pin')
        }


    },
    computed: {},
}
