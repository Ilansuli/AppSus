import { svgService } from "../../../services/svg.service.js"

export default {
    name: '',
    props: ['info', 'isEdit'],
    template: `
         <div class="note-info">
                <h1 
                :contenteditable="isEdit" 
                class="note-title"  
                @focusout="updateTitle" 
                >{{info.title}}
                </h1>
                <section v-if='!isEdit' class="todos">
                    <div v-for="todo in info.todos" class="todo">
                    <div class="check-todo" >
                    <div v-if="isDone(todo)" className="icon" v-html="getSvg('done')"></div>
                    <div v-if="!isDone(todo)" className="icon" v-html="getSvg('todo')"></div>
                    </div >    
                        {{todo.txt}}
                    </div>
                </section>
                <section v-if='isEdit' class='todos'>
                <div v-for="(todo,index) in info.todos" class="todo">
                    <div class="check-todo" @click="toggleTodo(todo)">
                    <div v-if="isDone(todo)" className="icon" v-html="getSvg('done')"></div>
                    <div v-if="!isDone(todo)" className="icon" v-html="getSvg('todo')"></div>
                    </div>
                    <input placeholder="List Item" v-model="todo.txt" @input=updateTodo() v-on:keyup.enter="createTodo">
                    <button class="remove-todo" @click="removeTodo(index)">
                    <div   className="icon" v-html="getSvg('close')"></div>
                </button>

                </div>
                <button class="add-todo" @click="createTodo">
                    <div   className="icon" v-html="getSvg('add')"></div>
                </button>

                </section>
        </div>
        `,
    components: {},
    created() {
        if (!this.info.title) this.info.title = "Title"
        if (this.info.todos === undefined) this.info.todos = [{ txt: '', doneAt: null }]
        if (this.info.txt) this.info.todos[0].txt = this.info.txt
    },
    data() {
        return {
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        updateTitle(event) {
            var txt = event.target.innerText
            console.log(txt);
            this.info.title = txt
            this.$emit('update-info', this.info)
        },
        updateTodo() {
            this.$emit('update-info', this.info)
        },
        toggleTodo(todo) {
            console.log('toggle');
            if (todo.doneAt) todo.doneAt = null
            if (!todo.doneAt) todo.doneAt = Date.now()
            this.$emit('update-info', this.info)
        },
        createTodo() {
            const todo = { txt: '', doneAt: null }
            this.info.todos.push(todo)
        },
        removeTodo(idx) {
            this.info.todos.splice(idx, 1)
        },
        isDone(todo) {
            return todo.doneAt
        }
    },
    computed: {
    },

}
