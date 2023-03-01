import NotePreview from './NotePreview.js'

export default {
    name: "note list",
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <notePreview :note="note"/>
                </li>
            </ul>
        </section>
    `,
    methods: {
    },
    components: {
        NotePreview
    },

}