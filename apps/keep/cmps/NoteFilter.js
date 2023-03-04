import { svgService } from "../../../services/svg.service.js"

export default {
    template: `
        <section class="note-filter">
            <div className="icon" v-html="getSvg('search')"></div>

                <input 
                class="filter-txt filter" 
                v-model="searchWord" 
                placeholder="Search" 
                type="text" />          
        </section>
    `,
    data() {
        return {
            searchWord: ''
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.searchWord)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        }
    },
    watch: {
        searchWord: {
            handler() {
                this.$emit('filter', this.searchWord)
            },
            deep: true
        },
    }

}