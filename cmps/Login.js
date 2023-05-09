import Logo from "./Logo.js"
import customInput from "./customInput.js"
export default {
    template: `
    <section class="login-wrapper">
        <article class="login-main">
            <header>
                <Logo/>
                <h1>Login</h1>
                <h3>to continue to Gmail</h3>
            </header>
            <customInput :label="'Email or Username'"  />
            </article>
    </section>
    `,
    data() {
        return {
            path: this.$route.path
        }
    },
    created() { },
    methods: {

    },
    computed: {
      
    },
    watch: {

    },
    components: {
        Logo,
        customInput
    }
}
