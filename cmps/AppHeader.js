import { svgService } from "../services/svg.service.js"
import { userService } from "../services/user.service.js"

import Logo from "./Logo.js"
import AppFilter from "./AppFilter.js"

export default {
    template: `
        <header class="app-header" v-if="!isLogin">
            <section class="first-section">
                <Logo/>
            </section>

            <section>
                <AppFilter/>
            </section>

              <section class="third-section">
                  <div class="apps-icon" @click ="toggleHover" v-html="getSvg('apps')"></div>   
                  <div class="loggedInUser" v-if="loggedInUser" > <img  :src="loggedInUser.imgUrl" alt="" /> </div>
                </section>  

            <div class="dropdown-content" v-show="isHover">
                <div class="home-logo">
                    <router-link to="/"><img  src="assets/img/main/home.png"></router-link>  
                </div>
                <div>
                    <router-link to="/about"><img  src="assets/img/main/about.png"></router-link>
                </div>

                <div class="gmail-logo">
                    <router-link  to="/email/"><img  src="assets/img/main/gmail.png"></router-link>
                </div>

                <div class="keep-logo" >
                    <router-link to="/note"><img src="https://i.pinimg.com/originals/09/96/92/099692d1d651d51b7caf3040fce0f748.png"></router-link>
                </div>

            </div>
        </header>
    `,
    data() {
        return {
            isHover: false,
            isLogin: false,
            loggedInUser: null
        }
    },
    created() {
        this.loadLoggedInUser()
    },
    methods: {
        loadLoggedInUser() {
            this.loggedInUser = userService.getLoggedinUser()
        },
        toggleHover() {
            this.isHover = !this.isHover
        },
        getSvg(iconName) {
            return svgService.getMailSvg(iconName)
        }
    },
    mounted() {
        this.isHover = false
    },
    unmounted() {
        this.isHover = true
    },
    watch:{
        '$route'(){
            console.log(this.$route);
            if(this.$route.path === '/login') this.isLogin = true
        }
    },
    components: {
        AppFilter,
        Logo
    }
}
