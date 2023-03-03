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
      <header class="main-header flex">
        <img src="../../assets/img/note/keep.png">
        <h1>Keep</h1>
        <NoteFilter @filter="setFilterBy"/>
      </header>
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
    this.loadNotes()
  },
  data() {
    return {
      notes: [],
      filterBy: {}
    }
  },
  methods: {
    loadNotes() {
      noteService.query()
        .then(notes => {
          this.notes = notes
          console.log(notes);
        })
    },
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
          // console.log('Note Updated', updatedNote)
          const idx = this.notes.findIndex(note => updatedNote.id === note.id)
          this.notes[idx] = updatedNote
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
    $route: {
      handler(newValue) {
        setTimeout(this.loadNotes(), 500)
        // this.loadNotes()
      },
      immediate: true
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
