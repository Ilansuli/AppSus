import { svgService } from "../../../services/svg.service.js"

export default {
    template: `
        <section class="note-filter">
            <div class="filter-txt-container">
            
            <div data-title=" Background Color"  className="icon" v-html="getSvg('search')"></div>
                <input 
                class="filter-txt filter" 
                v-model="filterBy.search" 
                placeholder="Search" 
                type="text" />
                
            </div>
            	<select class="filter-type filter" v-model="filterBy.type" >
			<option value="NoteTxt">Texts</option>
			<option value="NoteVideo">Videos</option>
			<option value="NoteTodos">Todos</option>
			<option value="NoteImg">Images</option>
			<option value="">All</option>
		</select>
          
        </section>
    `,
    data() {
        return {
            filterBy: { search: '', type: '' },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        }
    },
    watch: {
        filterBy: {
            handler() {
                // console.log('filterBy changed', this.filterBy)
                this.$emit('filter', this.filterBy)
            },
            deep: true
        },
    }

}