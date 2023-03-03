import { svgService } from "../../../services/svg.service.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteVideo from "./NoteVideo.js"
import NoteTodos from "./NoteTodos.js"
import ToolBar from "./ToolBar.js"

export default {
    name: "note preview",
    props: ['note'],
    emits: ['update', 'remove', 'pin', 'get-details'],
    template: `
        <section 
        class="note"  
        :style = "{'background-color':note.style.backgroundColor}" 
        >
       <div v-if="note.isPinned" className="icon full-pin-icon" v-html="getSvg('pinFull')"></div>
       <Component 
                        @click="getDetails()"
                        :is="note.type"  
                        :info="note.info"
                        :isEdit="false"
                       
                        />
        <ToolBar
            @pin="pin"
            @remove="remove"
            @change-color="changeBcgColor"
        />
        
            </section>
    `,
    methods: {
        remove() {
            this.$emit('remove', this.note.id)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        getDetails() {
            this.$emit('get-details', this.note.id)
        },
        toggleColorPicker() {
            this.isSelectColor = !this.isSelectColor
        },
        updateNote() {
            this.$emit('update', this.note)
        },
        changeBcgColor(color) {
            this.note.style.backgroundColor = color
            this.updateNote()
        },
        pin() {
            this.note.isPinned = !this.note.isPinned
            this.updateNote()
        },
        toggleColorPicker() {
            this.isSelectColor = !this.isSelectColor
        }


    },
    data() {
        return {
            isSelectColor: false,
        }
    },
    computed: {

    },
    components: {
        NoteImg,
        NoteTodos,
        NoteTxt,
        NoteVideo,
        ToolBar
    }

}
