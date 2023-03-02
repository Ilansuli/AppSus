import NotePreview from './NotePreview.js'
import { svgService } from "../../../services/svg.service.js"

export default {
    name: "note list",
    props: ['notes'],
    template: `  
            <section class="notes-list">
                <article v-for="note in notes" :key="note.id" class="note" >
                    <NotePreview :note="note" @click="getDetails(note.id)"
                    @remove='remove' :style="styleObject"
                    />
                    <div class="tool-bar">
                <button><div className="icon" v-html="getSvg('pin')"></div></button>
                <button><div className="icon" v-html="getSvg('palette')"></div></button>
                <button @click="remove(note.id)"><div className="icon" v-html="getSvg('trash')"></div></button>
            </div>
</article>
</section>
  
    `,
    data() {
        return {
            selectedNote: null
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        getDetails(noteId) {
            this.$router.push(noteId)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        styleObject() {
            return {
                backgroundColor: this.note.style.backgroundColor || '#ffffff'
            }
        },
    },
    created() {
    },
    components: {
        NotePreview,
    },

}