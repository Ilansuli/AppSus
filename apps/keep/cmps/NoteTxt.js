export default {
    name: '',
    props: ['info', 'isEdit'],
    template: `
         <div class="note-info">
                <h1 
                :contenteditable="isEdit" 
                class="note-title"  
                @focusout="updateTitle" 
                >{{info.title}}</h1>
                <p 
                :contenteditable="isEdit" 
                class="note-text" 
                @blur="updateTxt"
                >{{info.txt}}
            </p>
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
            console.log(txt);
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
        if (!this.info.title) this.info.title = "Title"
        if (!this.info.txt) this.info.txt = "Take a note..."
    },
    computed: {},
}
