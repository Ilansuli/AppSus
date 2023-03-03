export default {
    name: 'noteVideo',
    props: ['info'],
    template: `
         <div class="video-note">
                <h1 class="note-title">{{info.title}}</h1>
         
        <video class="video" autoplay loop muted> 
            <source :src='info.url' type='video/mp4'>
        </video>
    
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