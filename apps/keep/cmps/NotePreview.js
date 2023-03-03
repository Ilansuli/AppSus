import { svgService } from "../../../services/svg.service.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import NoteVideo from "./NoteVideo.js"
import NoteTodos from "./NoteTodos.js"
import ToolBar from "./ToolBar.js"

export default {
    name: "note preview",
    props: ['note'],
    emits: ['update', 'remove', 'pin', 'get-details', 'add', 'send'],
    template: `
        <section 
        class="note-preview"  
        :style = "{'background-color':note.style.backgroundColor}" 
        @mouseover="toggleHover(true)"
        @mouseleave="toggleHover(false)"
        >
       
       <button @click="pin" className="icon pin"  v-if="isHover">
            <div v-if="note.isPinned"  v-html="getSvg('pinFull')"></div>
            <div v-if="!note.isPinned" data-title="Pin" className="icon" v-html="getSvg('pin')"></div>
        </button>
       <Component 
                        @click="getDetails()"
                        :is="note.type"  
                        :info="note.info"
                        :isEdit="false"
                        />
        
    <ToolBar
             v-if="isHover"
            @remove="remove"
            @copy="copy"
            @send="send"
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
            console.log(this.note);
        },
        changeBcgColor(color) {
            this.note.style.backgroundColor = color
            this.updateNote()
        },
        pin() {
            console.log(this.note);
            this.note.isPinned = !this.note.isPinned
            this.updateNote()
        },
        send() {
            this.$emit('send', this.note)
        },
        copy() {
            const copyNote = JSON.parse(JSON.stringify(this.note))
            copyNote.id = ''
            console.log('previewNote', copyNote);
            this.$emit('add', copyNote)
        },
        toggleColorPicker() {
            this.isSelectColor = !this.isSelectColor
        },
        toggleHover(boolean) {
            this.isHover = boolean
        }

    },
    data() {
        return {
            isSelectColor: false,
            isHover: false
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
