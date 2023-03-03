import NotePreview from './NotePreview.js'
import { svgService } from "../../../services/svg.service.js"
import { noteService } from '../services/note.service.js'

export default {
    name: "note list",
    props: ['notes'],
    emits: ['update', 'remove', 'changeBcg', 'add', 'send'],
    template: ` 
   <h1 style="fontSize: 12px">OTHERS</h1>
    <section class="notes-list unpinned">
        <article
        key="note-container" 
                v-for="note in notes" 
                :key="note.id" 
                @get-details="getDetails(note.id)"
                >
                <NotePreview 
                @add="addNote"
                @send='send'
                @update="updateNote"
                @remove="remove"
                @getDetails = "getDetails"
                :note="note" 
                    />
            
            
        </article>
    </section>
  
    `,
    data() {
        return {
            isSelectColor: false,
            pinnedNotes: []
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        send(note) {
            this.$emit('send', note)
        },
        getDetails(noteId) {
            this.$router.push('/note/' + noteId)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        toggleColorPicker() {
            this.isSelectColor = !this.isSelectColor
        },
        updateNote(note) {
            this.$emit('update', note)
        },
        addNote(note) {
            this.$emit('add', note)
        }
    },
    computed: {
        styleObject(note) {
            console.log(note);
            return {
                backgroundColor: note.style.backgroundColor || '#ffffff'
            }
        },
        // pinnedNotes() {
        //     this.pinnedNotes = this.notes.filter(note => note.isPinned)
        //     console.log(pinnedNotes);
        // }
    },
    created() {


    },
    components: {
        NotePreview,
    },

}