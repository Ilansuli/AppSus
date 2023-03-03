import { noteService } from '../services/note.service.js'
import { svgService } from "../../../services/svg.service.js"

import NoteTxt from "../cmps/NoteTxt.js"
import NoteImg from "../cmps/NoteImg.js"
import NoteVideo from "../cmps/NoteVideo.js"
import NoteTodos from "../cmps/NoteTodos.js"
import ToolBar from "../cmps/ToolBar.js"
import NoteTypes from '../cmps/NoteTypes.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    name: 'noteDetails',
    props: [],
    template: `
    <div v-if="note" 
    class="note-modal" 
    :style = "{'background-color':note.style.backgroundColor}" >
    <Component 
                        :is="note.type"  
                        :info="note.info"
                        :isEdit="true"
                       @updateInfo="updateInfo"
                        />
                        
    <NoteTypes
            @change-type="changeType"
            @change-color="changeBcgColor"

            />
    <!-- <div class="tool-bar">
                <nav class="note-type" >
                    <button><div className="icon"  v-html="getSvg('palette')"></div></button>
                    <button><div className="icon"  v-html="getSvg('text')"></div></button>
                    <button><div className="icon"  v-html="getSvg('img')"></div></button>
                    <button><div className="icon" v-html="getSvg('video')"></div></button>
                    <button><div className="icon" v-html="getSvg('todo')"></div></button>
                </nav>
                <button @click="closeNote">Close</button>
             
            </div> -->
            <button @click="closeNote">Close</button>
    </div>
        `,
    components: {
        NoteImg,
        NoteTodos,
        NoteVideo,
        NoteTxt,
        NoteTypes,
        ToolBar
    },
    created() {
        this.loadNote()
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
                .then(() => {
                    this.loadNote()
                    this.$router.push('/note')
                })
        },
        changeType(type) {
            this.note.type = type
        },

        loadNote() {
            if (!this.noteId) return
            noteService.get(this.noteId)
                .then(note => {
                    this.note = note
                    this.$emit('is-load-note', true)
                })
        },

        changeBcgColor(color) {
            console.log(color);
            this.note.style.backgroundColor = color
            this.$emit('update', this.note)
            noteService.save(this.note)
        },

        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },

        updateInfo(info) {
            // console.log(info);
            this.note.info = info

        },


        closeNote() {
            // noteService.save(this.note)
            //     .then(
            //         
            //     )
            //     .catch(err => {
            //         console.log('error');
            //     })
            this.$router.push('/note')
            eventBus.emit('updated', this.note)
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
        },

    },
    watch: {
        noteId() {
            console.log('bookId Changed!')
            this.loadNote()
        },
        noteEmail() {
            console.log('I got an email');
        }
    }
}
