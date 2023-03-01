import { noteService } from '../services/note.service.js'


export default {
    name: 'noteDetails',
    props: [],
    template: `
    <div v-if="note">
    <p :style="styleObject" contenteditable="true" ref="currNote" @input="updateNote()">{{note.info.txt}}</p>
    </div>
        `,
    components: {},
    created() {
        const { noteId } = this.$route.params
        noteService.get(noteId)
            .then(note => {
                this.note = note
            })
    },
    data() {
        return {
            note: null
        }
    },
    methods: {
        closeDetails() {
            this.$emit('hide-details')
        },
        updateNote() {
            const txt = this.$refs.currNote.innerText
            this.note.info.txt = txt
            this.$emit('update-note', this.note)
            noteService.save(this.note)
        },
        loadNote() {
            noteService.get(this.noteId)
                .then(note => {
                    this.note = note
                })
        }

    },
    computed: {
        styleObject() {
            return {
                backgroundColor: this.note.style.backgroundColor || '#ffffff'
            }
        },
        noteId() {
            return this.$route.params.noteId
        }

    },
    watch: {
        noteId() {
            console.log('bookId Changed!')
            this.loadNote()
        }
    }
}
