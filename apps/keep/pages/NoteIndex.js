import { noteService } from '../services/note.service.js'
// import { getKeepSvg, getMailSvg } from '../../../services/svg.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'


export default {
  name: 'Note Keep',
  props: [],
  template: `
  <h1>Note Keep</h1>
  <!-- <RouterLink to="/note/add" @addNote="onSaveNote">+</RouterLink> -->
                <NoteList 
                :notes="notes" 
                @remove="removeNote" />
        `,
  components: {
    NoteFilter,
    NoteList

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
    removeNote() { }
  },
  computed: {},
}
