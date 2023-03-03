import { svgService } from "../../../services/svg.service.js"

export default {
    name: '',
    props: ['info'],
    template: `
         <div class="todos-note">
                <h1 class="note-title">{{info.title}}</h1>
                <section class="todos">
                    <div v-for="todo in info.todos" class="todo">
                    <div class="check-todo" @click="">
                    <div v-if="todo.doneAt" data-title="Delete" className="icon" v-html="getSvg('done')"></div>
                    </div>    
                        {{todo.txt}}
                    </div>
                </section>
            </div>
        `,
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        }
    },
    computed: {},
    created() {

    }
}
