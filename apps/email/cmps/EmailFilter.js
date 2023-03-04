export default {
    template: `
        <section class="email-filter">
        </section>
    `,
    data() {
        return {
            filterBy: '',
        }
    },
    methods: {
  
    },
    watch: {
        filterBy: {
            handler() {
                // console.log('filterBy changed', this.filterBy)
                this.$emit('filter', {keyWord: 'txt', toUpdate: this.filterBy})
                // console.log(this.filterBy);
            },
            deep: true
        },
    }

}