import { noteService } from '../services/note.service.js'
// import { getKeepSvg, getMailSvg } from '../../../services/svg.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import PinnedNoteList from '../cmps/PinnedNoteList.js'
import UnpinnedNoteList from '../cmps/UnpinnedNoteList.js'
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
<section class="pinnedList-container">
<PinnedNoteList 
                :notes="PinnedFilteredNotes" 
                 @remove="removeNote"
                 @update="updateNote"
                 @change-bcg='changeBcg' 
                /> 
</section>
<section class="unpinnedList-container">
    <UnpinnedNoteList 
                :notes="UnpinnedFilteredNotes" 
                 @remove="removeNote"
                 @update="updateNote"
                 @change-bcg='changeBcg' 
                /> 
</section>
             
</section>

        `,
  components: {
    NoteFilter,
    PinnedNoteList,
    UnpinnedNoteList,
    NoteAdd,
    PinnedNoteList,
    UnpinnedNoteList

  },
  created() {
    this.loadNotes()
    eventBus.on('updated', this.updateNote)
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
        .then(note => {
          console.log('Note Updated', note)
          const idx = this.notes.findIndex(note => note.id === note.id)
          // this.notes[idx] = note
          this.notes.splice(idx, 1, note)
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
  computed: {
    PinnedFilteredNotes() {
      const pinnedNotes = this.notes.filter(note => note.isPinned)
      const titleRegex = new RegExp(this.filterBy.search, 'i')
      const typeRegex = new RegExp(this.filterBy.type, 'i')
      return pinnedNotes.filter(note => titleRegex.test(note.info.title) && typeRegex.test(note.type))
    },
    UnpinnedFilteredNotes() {
      const unpinnedNotes = this.notes.filter(note => !note.isPinned)
      const titleRegex = new RegExp(this.filterBy.search, 'i')
      const typeRegex = new RegExp(this.filterBy.type, 'i')
      return unpinnedNotes.filter(note => titleRegex.test(note.info.title) && typeRegex.test(note.type))
    },
    isModalOpen() {
      return {
        'modal-open': true
      }
    }
  },
}
