export default {
    name: '',
    props: ['info', 'isEdit'],
    template: `
         <div class="text-note">
                <h1 :contenteditable="isEdit" class="note-title" v-text="info.title" @blur="updateTitle" ref></h1>
                <p :contenteditable="isEdit" class="note-text" v-text="info.txt" @blur="updateTxt"></p>
            </div>
        `,
    components: {},
    created() { },
    data() {
        return {
        }
    },
    methods: {
        updateTitle(event) {
            var txt = event.target.innerText
            this.info.title = txt
            this.$emit('update-info', this.info)
        },
        updateTxt(event) {
            var txt = event.target.innerText
            this.info.txt = txt
            this.$emit('update-info', this.info)
        }
    },
    created() {

    },
    computed: {},
}
