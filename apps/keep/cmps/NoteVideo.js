export default {
    name: 'noteVideo',
    props: ['info'],
    template: `
         <div class="video-note">
                <h1 class="note-title">{{info.title}}</h1>
         
        <!-- <iframe class="video"  :src='info.url'> </iframe> -->
    
            </div>
        `,
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
}