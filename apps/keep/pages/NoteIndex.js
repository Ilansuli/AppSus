import { noteService } from '../services/note.service.js'
// import { getKeepSvg, getMailSvg } from '../../../services/svg.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import PinnedNoteList from '../cmps/PinnedNoteList.js'
import UnpinnedNoteList from '../cmps/UnpinnedNoteList.js'
import NoteAdd from '../cmps/NoteAdd.js'
import SideNav from '../cmps/SideNav.js'
import { router } from '../../../routes.js'


export default {
  name: 'Note Keep',
  props: [],
  template: `
  <!-- <section class="note-app"> -->
    <section class="note-main">
            <div  :class="['main-screen', isDetails? 'details-open':'details-close']"></div>
      <header class="main-header flex">
            <img src="../../assets/img/note/keep.png">
            <h1>Keep</h1>
           <NoteFilter @filter="setFilterBySearch"/>
      </header>

    <section class="notes-display">
<sideNav
@filter="setFilterByType"
/>
      <NoteAdd @addNote="addNote"/>
      <RouterView 
            @update="updateNote"
            @is-load-note="isLoadNote"/>
<section class="pinnedList-container">
<PinnedNoteList 
                :notes="PinnedFilteredNotes" 
                @add = "addNote"
                @send='sendNote'
                 @remove="removeNote"
                 @update="updateNote"
                 @change-bcg='changeBcg' 
                /> 
</section>
<section class="unpinnedList-container">
    <UnpinnedNoteList 
                :notes="UnpinnedFilteredNotes" 
                @add = "addNote"
                @send='sendNote'
                 @remove="removeNote"
                 @update="updateNote"
                 @change-bcg='changeBcg' 
                /> 
</section>
</section>    
</section>

        `,
  components: {
    NoteFilter,
    PinnedNoteList,
    UnpinnedNoteList,
    NoteAdd,
    PinnedNoteList,
    UnpinnedNoteList,
    SideNav

  },
  created() {
    if (this.$route.query.title) {
      this.createEmailNote(this.$route.query)
    }
    if (this.$route.params.noteId) this.isDetails = true
    if (!this.$route.params.noteId) this.isDetails = false
    this.loadNotes()
    eventBus.on('updated', this.updateNote)
  },
  data() {
    return {
      notes: [],
      filterBy: {},
      isDetails: false
    }
  },
  methods: {
    loadNotes() {
      noteService.query()
        .then(notes => {
          this.notes = notes
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
      note.createdAt = Date.now()
      console.log('IndexNote', note);
      noteService.save(note)
        .then(savedNote => {
          // console.log('Note saved', savedNote)
          this.notes.unshift(savedNote)

        })
        .catch(err => {
          showErrorMsg()
        })
    },

    sendNote(note) {
      this.$router.push({
        path: '/email',
        query: {
          subject: note.info.title,
          body: note.info.txt
        }
      })
    },

    updateNote(noteToUpdate) {
      noteService.save(noteToUpdate)
        .then(updatedNote => {
          // console.log('Note Updated', note)

          const idx = this.notes.findIndex(note => note.id === updatedNote.id)
          // this.notes[idx] = note
          console.log(idx);
          // console.log(this.notes);
          this.notes.splice(idx, 1, updatedNote)
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

    setFilterBySearch(search) {
      this.filterBy.search = search
    },

    setFilterByType(type) {
      this.filterBy.type = type
    },

    createEmailNote(query) {
      const emailNote = noteService.getEmptyNote()
      emailNote.info.title = query.title
      emailNote.info.txt = query.txt
      noteService.save(emailNote).then(
        setTimeout(() => this.$router.push('/note/' + emailNote.id), 600)

      )

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
    gotEmail() {
      return this.$route.query
    },

    noteId() {
      return this.$route.params.noteId
    },
  },
  watch: {
    noteId() {
      if (this.$route.params.noteId) this.isDetails = true
      if (!this.$route.params.noteId) this.isDetails = false

    },
  }
}

//this.$router.push({ path: '/mail', query: { composeId: this.mail.id } })
