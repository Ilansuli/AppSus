import EmailPreview from "./EmailPreview.js"

export default {
    name: 'Email List',
    props: ['emails'],
    template: `
        <section class="email-list-wrap">
                <EmailPreview @click="showDetails(email.id)" @removeEmail = "removeEmail" :email = "email"  v-for="email in emails"/>
        </section>

        `,
    components: {
        EmailPreview
    },
    created() {
        
     },
    data() {
        return {

        }
    },
    methods: {
        removeEmail(emailId){
            this.$emit('removeEmail',emailId)
        },
        showDetails(emailId){
            this.$router.push("email/" + emailId)
            this.$emit('showDetails')
        }
    },
    computed: {},


}
