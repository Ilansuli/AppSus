import NotePreview from './NotePreview.js'

export default {
    name: "note list",
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id" >
                    <NotePreview :note="note" @click="getDetails(note.id)"
                    />
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
        getDetails(noteId) {
            this.$router.push(noteId)
        }
    },
    created() {
    },
    components: {
        NotePreview,
    },

}