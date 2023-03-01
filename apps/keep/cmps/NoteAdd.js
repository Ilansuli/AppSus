import { noteService } from "../services/note.service.js"

export default {
    name: 'NoteAdd',
    template: `
        <section  class="note-add">
            <form @submit.prevent="addNote"  >
            <input v-model="note.info.txt" type="text"/>
            <button>add</button>
</form>
</section>
    `,
    data() {
        return {
            note: null
        }
    },
    created() {
        this.note = noteService.getEmptyNote()
    }
    , methods: {
        addNote() {
            if (!this.note) return
            this.note.createdAt = Date.now()
            this.$emit('addNote', this.note)
        },

    }
}
