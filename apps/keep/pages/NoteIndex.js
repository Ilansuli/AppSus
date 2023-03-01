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
  <h1>Note Keep</h1>
      <NoteAdd @addNote="addNote"/>
      <RouterView @update-note="updateNote"/>
        <NoteList 
                :notes="notes" 
                 @remove="removeNote" 
                /> 
        `,
  components: {
    NoteFilter,
    NoteList,
    NoteAdd

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
    }
  },
  computed: {

  },
}
