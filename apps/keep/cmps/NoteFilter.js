export default {
    template: `
        <section class="note-filter">
            <input 
                v-model="filterBy.search"
                placeholder="Search"
                type="text" />
            	<select v-model="filterBy.type" >
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