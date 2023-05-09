import { noteService } from "../services/note.service.js"
import { svgService } from "../../../services/svg.service.js"
import NoteTypes from "./NoteTypes.js"
import NoteImg from "./DynamicCmps/NoteImg.js"
import NoteTxt from "./NoteTxt.js"
import NoteVideo from "./DynamicCmps/NoteVideo.js"
import NoteTodos from "./DynamicCmps/NoteTodos.js"
import ToolBar from "./ToolBar.js"
export default {
    name: 'NoteAdd',
    template: `
        <section 
        :style = "{'background-color':note.style.backgroundColor}"  
        class="note-add" >    
        <Component 
                        :is="note.type"  
                        :info="note.info"
                        :isEdit="true"
                       @updateInfo="updateInfo"
                        />
            <div class="tool-bar">
            <NoteTypes
            @change-type="changeType"
            @change-color="changeBcgColor"
            />
           
                <button class='close-btn' @click="addNote">Close</button>
            </div>
</section>
    `,
    data() {
        return {
            note: null
        }
    },
    created() {
        this.clearNote()
    }
    , methods: {

        addNote() {
            if (!this.note) return
            this.note.createdAt = Date.now()
            this.$emit('addNote', this.note)
            this.clearNote()
        },

        clearNote() {
            this.note = noteService.getEmptyNote()
        },

        changeBcgColor(color) {
            this.note.style.backgroundColor = color
        },

        changeType(type) {
            this.note.type = type
        },

        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        updateInfo(info) {
            this.note.info = info
        }
    },
    components: {
        NoteTypes,
        NoteImg,
        NoteTxt,
        NoteVideo,
        NoteTodos,
        ToolBar
    }
}
