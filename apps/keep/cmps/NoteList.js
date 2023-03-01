import NotePreview from './NotePreview.js'

export default {
    name: "note list",
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <NotePreview :note="note" />
                    <button @click="remove(note.id)" class="close-btn">x</button>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            selectedNote: null
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        updateNote(noteId) {
            this.$emit('show-details', noteId)
        },
    },
    created() {
    },
    components: {
        NotePreview,
    },

}