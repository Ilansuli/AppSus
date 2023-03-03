import NotePreview from './NotePreview.js'
import { svgService } from "../../../services/svg.service.js"
import { noteService } from '../services/note.service.js'

export default {
    name: "note list",
    props: ['notes'],
    emits: ['update', 'remove', 'changeBcg'],
    template: ` 
   <h1>OTHERS</h1>
    <section class="notes-list unpinned">
    <article
        key="note-container" 
                v-for="note in pinnedNotes" 
                :key="note.id" 
                @get-details="getDetails(note.id)"
                >
                <NotePreview 
                @update="updateNote"
                @remove="remove"
                @getDetails = "getDetails"
                :note="note" 
                    />
            
        </article>
        <article
        key="note-container" 
                v-for="note in notes" 
                :key="note.id" 
                @get-details="getDetails(note.id)"
                >
                <NotePreview 
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
            note: null,
            pinnedNotes: []
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
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