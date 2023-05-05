
export default {
    template: `
    <section>
        <h1>{{getMsg}}</h1>
    </section>
    `,
    data() {
        return {
            path: this.$route.path
        }
    },
    created() { },
    methods: {

    },
    computed: {
        getMsg() {
            return this.path === '/login' ? 'Login' : 'Sign Up'
        }
    },
    watch: {

    },
    components: {}
}
