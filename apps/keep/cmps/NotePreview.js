export default {
    name: "note preview",
    props: ['note'],
    template: `
        <article :style="styleObject" class="note-preview" >
            <h2>{{ note.info.txt }}</h2>
        </article>
    `,
    computed: {
        styleObject() {
            return {
                backgroundColor: this.note.style.backgroundColor || '#ffffff'
            }
        }
    }
}