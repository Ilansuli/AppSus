import { noteService } from '../services/note.service.js'
// import { getKeepSvg, getMailSvg } from '../../../services/svg.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'
import NoteAdd from '../cmps/NoteAdd.js'


export default {
  name: 'Note Keep',
  props: [],
  template: `
  <!-- <section class="note-app"> -->
    <section class="note-main">
      <div class="main-screen" :class="isModalOpen"></div>
      <NoteAdd @addNote="addNote"/>
      
      <RouterView 
    @update-note="updateNote"
    @is-load-note="isLoadNote"/>
        <NoteList 
                :notes="notes" 
                 @remove="removeNote" 
                /> 
                </section>
<!-- </section> -->
        `,
  components: {
    NoteFilter,
    NoteList,
    NoteAdd,


  },
  created() {
    noteService.query()
      .then(notes => {
        this.notes = notes
      })
  },
  data() {
    return {
      notes: [],
    }
  },
  methods: {
    filteredNotes() { },
    removeNote(noteId) {
      noteService.remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex(note => note.id === noteId)
          this.notes.splice(idx, 1)
          showSuccessMsg()
        })
        .catch(err => {
          showErrorMsg
        })
    },
    addNote(note) {
      noteService.save(note)
        .then(savedNote => {
          console.log('Note saved', savedNote)
          showSuccessMsg()
          this.notes.unshift(savedNote)
        })
        .catch(err => {
          showErrorMsg()
        })
    },
    updateNote(updatedNote) {
      noteService.save(updatedNote)
        .then(updatedNote => {
          console.log('Note Updated', updatedNote)
          showSuccessMsg('note Updated')
          let currNote = this.notes.find(note => note.id === updatedNote.id)
          currNote = updatedNote
        })
        .catch(err => {
          showErrorMsg()
        })
    },
    isLoadNote(isLoad) {
      return isLoad
    }
  },
  watch: {
    isNoteId() {
      console.log(this.$route.params);
      this.$route.params.noteId
    }
  },
  computed: {
    isNoteId() {

    },
    isModalOpen() {
      return {
        'modal-open': true
      }
    }
  },
}
