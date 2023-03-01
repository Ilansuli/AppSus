import { noteService } from "../services/note.service.js"
import { googlenoteService } from "../services/googlenote.service.js"
import { eventBusService } from "../services/event-bus.service.js"
export default {
    name: 'noteAdd',
    template: `
        <section class="note-add">

<form @submit.prevent="searchnotes()" >
    <label class="googlenotes-search">Search By Keyword:
        <input 
        v-model="keyword"
        placeholder="Search"
        type="search" />
    </label>
    <button>Search</button>
</form>
<ul>
    <li v-for="googlenote in googlenotes " :key="googlenote.id">
        <h1>{{googlenote.id}}</h1>
        <h1>{{googlenote.title}}</h1>
        <button @click="addnote(googlenote)">Add</button>
    </li>
</ul>
        </section>
    `,
    data() {
        return {
            googlenotes: [],
            keyword: ""
        }
    }
    ,
    created() {
    }
    , methods: {
        addnote(note) {
            noteService.addGooglenote(note)
                .then(savednote => {
                    eventBusService.emit('show-msg', { txt: 'note added', type: 'success' })
                    this.$router.push('/note')
                })
        },
        searchnotes() {
            console.log(this.keyword);
            if (!this.keyword.length) return
            googlenoteService.query(this.keyword)
                .then(notes => this.googlenotes = notes)
        }
    }
}
