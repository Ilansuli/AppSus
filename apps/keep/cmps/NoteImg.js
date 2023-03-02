export default {
    name: 'noteImg',
    props: ['info'],
    template: `
         <div class="img-note">
                <h1 class="note-title">{{info.title}}</h1>
                <img :src="info.url">
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