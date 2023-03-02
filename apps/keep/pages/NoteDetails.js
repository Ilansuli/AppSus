import { noteService } from '../services/note.service.js'
import { svgService } from "../../../services/svg.service.js"

import { eventBus } from '../../../services/event-bus.service.js'

export default {
    name: 'noteDetails',
    props: [],
    template: `
    <div v-if="note" class="note-modal">
    <p class="note-title":style="styleObject" contenteditable="true" ref="currNote" >{{note.info.title}}</p>
    <p class="note-text" :style="styleObject" contenteditable="true" ref="currNote" >{{note.info.txt}}</p>
    <div class="tool-bar">
                <nav class="note-type" >
                    <button><div className="icon" v-html="getSvg('palette')"></div></button>
                    <button><div className="icon" v-html="getSvg('text')"></div></button>
                    <button><div className="icon" v-html="getSvg('img')"></div></button>
                    <button><div className="icon" v-html="getSvg('todo')"></div></button>
                </nav>
                <button @click="updateNote">Close</button>
             
            </div>
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
                .then(this.$router.push('/note'))
        },
        loadNote() {
            if (!this.noteId) return
            noteService.get(this.noteId)
                .then(note => {
                    this.note = note
                    this.$emit('is-load-note', true)
                })
        },
        changeNoteColor(color) {
            console.log(color);
            this.note.style.backgroundColor = color
            this.$emit('update-note', this.note)
            noteService.save(this.note)

        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
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
