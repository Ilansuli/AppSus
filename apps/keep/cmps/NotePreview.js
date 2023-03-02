import { svgService } from "../../../services/svg.service.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteVideo from "./NoteVideo.js"
import NoteTodos from "./NoteTodos.js"

export default {
    name: "note preview",
    props: ['note'],
    template: `
       <Component 
                        :is="note.type"  
                        :info="note.info" 
                        />

    `,
    methods: {
        remove() {
            this.$emit('remove', this.note.id)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },


    },
    computed: {

    },
    components: {
        NoteImg,
        NoteTodos,
        NoteTxt,
        NoteVideo
    }

}
