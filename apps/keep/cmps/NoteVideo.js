export default {
    name: 'noteVideo',
    props: ['info', 'isEdit'],
    template: `
         <div class="note-info">
         <h1 
         :contenteditable="isEdit" 
         class="note-title" 
         v-text="info.title" 
         @blur="updateTitle" 
       >
        </h1>
         
        <video  v-if='!isEdit' class='video' autoplay loop muted> 
            <source :src='info.url' type='video/mp4'>
        </video>
             <input v-if="isEdit"
             v-model="info.url"
             placeholder="Video Url"
             >
    </div>
        `,
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {
        updateTitle(event) {
            var txt = event.target.innerText
            this.info.title = txt
            this.$emit('update-info', this.info)
        },
    },
    computed: {},
}