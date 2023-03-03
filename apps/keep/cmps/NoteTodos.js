import { svgService } from "../../../services/svg.service.js"

export default {
    name: '',
    props: ['info', 'isEdit'],
    template: `
         <div class="note-info">
                <h1 class="note-title">{{info.title}}</h1>
                <section v-if='!isEdit' class="todos">
                    <div v-for="todo in info.todos" class="todo">
                    <div class="check-todo" @click="">
                    <div v-if="todo.doneAt" data-title="Delete" className="icon" v-html="getSvg('done')"></div>
                    </div>    
                        {{todo.txt}}
                    </div>
                </section>
                <section v-if='isEdit' class='todo'>
                    
                </section>
            </div>
        `,
    components: {},
    created() {
        if (!this.info.title) this.info.title = "Title"
    },
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
