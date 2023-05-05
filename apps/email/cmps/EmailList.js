import EmailPreview from "./EmailPreview.js"

export default {
    name: 'Email List',
    props: ['emails'],
    emits:['removeEmail','showDetails','updateEmail',],
    template: `
        <section class="email-list-wrap">
                <EmailPreview @updateEmail="updateEmail" @click="showDetails(email.id)" @removeEmail = "removeEmail" :email = "email"  v-for="email in emails"/>
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
        updateEmail(email){
            this.$emit('updateEmail',email)
        },
        showDetails(emailId){
            if(this.$route.query){
                const {newComposeId} = this.$route.query
                this.$router.push({
                  path: `/email/${emailId}`,
                  query: {
                    newComposeId: newComposeId,
                  }
                 })
              }
            
            // this.$router.push("/email/" + emailId)

            this.$emit('showDetails')
        }
    },
    computed: {},


}
