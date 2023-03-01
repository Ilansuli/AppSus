import EmailPreview from "./EmailPreview.js"

export default {
    name: 'Email List',
    props: ['emails'],
    template: `
        <section class="email-list">
                <EmailPreview @removeEmail = "removeEmail" :email = "email"  v-for="email in emails"/>
        </section>
        `,
    components: {
        EmailPreview
    },
    created() { },
    data() {
        return {

        }
    },
    methods: {
        removeEmail(emailId){
            this.$emit('removeEmail',emailId)
        }
    },
    computed: {},


}
