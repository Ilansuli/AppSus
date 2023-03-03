import { svgService } from "../../../services/svg.service.js"

export default {
    name: 'noteImg',
    props: ['info', 'isEdit'],
    template: `
         <div class="note-info">
            <h1 :contenteditable="isEdit" class="note-title" v-text="info.title" @blur="updateTitle" ref="txt"></h1>
            <img v-if="!isEdit" :src="info.url">
              
            <input v-if='isEdit'
              v-model="info.url"
              placeholder="Image Url"
             >
        </div>
        `,
    components: {},
    created() { },
    data() {
        return {
        }
    },
    methods: {
        updateTitle(event) {
            var txt = event.target.innerText
            this.info.title = txt
            this.$emit('update-info', this.info)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
    },
    computed: {},
}