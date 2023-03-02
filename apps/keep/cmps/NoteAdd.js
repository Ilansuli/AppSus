import { noteService } from "../services/note.service.js"
import { svgService } from "../../../services/svg.service.js"

export default {
    name: 'NoteAdd',
    template: `
        <section  class="note-add">
            <form @submit.prevent="addNote"  >
            <input class="add-title"v-model="note.info.title" type="text"/>
            <p 
            contenteditable="true"
            class="add-text" 
            v-model="note.info.txt" 
            type="text"
            aria-multiline="true"
            >
        </p>
            <div class="tool-bar">
                <nav class="note-type" >
                    <button><div className="icon" v-html="getSvg('palette')"></div></button>
                    <button><div className="icon" v-html="getSvg('text')"></div></button>
                    <button><div className="icon" v-html="getSvg('img')"></div></button>
                    <button><div className="icon" v-html="getSvg('todo')"></div></button>
                </nav>
                <button>Close</button>
            </div>
            </form>
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
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        }

    }
}
