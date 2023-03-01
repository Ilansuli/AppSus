export default {
    name: "note preview",
    props: ['note'],
    template: `
        <article class="note-preview">
            <h2>{{ note.info.txt }}</h2>
        </article>
    `,
    computed: {
    }
}