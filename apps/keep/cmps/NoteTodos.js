export default {
    name: '',
    props: ['info'],
    template: `
         <div class="todos-note">
                <h1 class="note-title">{{info.title}}</h1>
                <section class="todos">
                    <article v-for="todo in info.todos">
                        {{todo.txt}}
                    </article>
                </section>
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
