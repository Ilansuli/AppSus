export default {
    name: '',
    props: ['info'],
    template: `
         <div class="text-note">
                <h1 class="note-title">{{info.title}}</h1>
                <p class="note-text">{{ info.txt }}</p>
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
