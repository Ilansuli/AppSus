import { svgService } from "../../../services/svg.service.js"

export default {
    name: 'noteImg',
    props: ['info', 'isEdit'],
    template: `
         <div class="img-note">
         <h1 :contenteditable="isEdit" class="note-title" v-text="info.title" @blur="updateTitle" ref></h1>
         <div class="img-container">
             <img :src="info.url">
            </div>
        </div>
        `,
    components: {},
    created() { },
    data() {
        return {}
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