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
      <NoteFilter @filter="setFilterBy"/>
      <NoteAdd @addNote="addNote"/>
      
      <RouterView 
    @update="updateNote"
    @is-load-note="isLoadNote"/>
        <NoteList 
                :notes="filteredNotes" 
                 @remove="removeNote"
                 @update="updateNote"
                 @change-bcg='changeBcg' 
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
      filterBy: {}
    }
  },
  methods: {
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
          this.notes.find(note => note.id === updatedNote.id) = updatedNote
        })
        .catch(err => {
          showErrorMsg()
        })
    },

    isLoadNote(isLoad) {
      return isLoad
    },

    changeBcg(color, noteId) {
      noteService.get(noteId)
        .then(updatedNote => {
          updatedNote.style.backgroundColor = color
          noteService.save(updatedNote)
          const currNote = this.notes.find(note => noteId === note.id)
          currNote.style.backgroundColor = color

        })

    },

    setFilterBy(filterBy) {
      this.filterBy = filterBy
    }
  },
  watch: {
    isNoteId() {
      console.log(this.$route.params);
      this.$route.params.noteId
    }
  },
  computed: {
    filteredNotes() {
      const titleRegex = new RegExp(this.filterBy.search, 'i')
      const typeRegex = new RegExp(this.filterBy.type, 'i')
      return this.notes.filter(note => titleRegex.test(note.info.title) && typeRegex.test(note.type))
    },
    isModalOpen() {
      return {
        'modal-open': true
      }
    }
  },
}
