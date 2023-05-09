import { svgService } from "../services/svg.service.js"

import Logo from "./Logo.js"
import AppFilter from "./AppFilter.js"

export default {
    template: `
        <header class="app-header" v-if="!isLogin">
            <section class="first-section">
             <router-link  to="/"><Logo/></router-link>
            </section>

            <section>
                <AppFilter/>
            </section>

              <section class="third-section">
                  <div class="apps-icon" @click ="toggleDropDownMenu" v-html="getSvg('apps')"></div>   
                </section>  

            <ul class="dropdown-content" v-if="isDropDownMenu" ref="dropdown">
                <li class="home-logo">
                    <router-link to="/"><img  src="assets/img/main/home.png"></router-link>  
                </li>
                <li>
                    <router-link to="/about"><img  src="assets/img/main/about.png"></router-link>
                </li>

                <li class="gmail-logo">
                    <router-link  to="/email/"><img  src="assets/img/main/gmail.png"></router-link>
                </li>

                <li class="keep-logo" >
                    <router-link to="/note"><img src="https://i.pinimg.com/originals/09/96/92/099692d1d651d51b7caf3040fce0f748.png"></router-link>
                </li>

            </ul>
        </header>
    `,
    data() {
        return {
            isDropDownMenu: false,
        }
    },
    created() {
    },
    methods: {
        toggleDropDownMenu(event) {
            event.stopPropagation()
            this.isDropDownMenu = !this.isDropDownMenu
        },
        closeDropDownMenu() {
            this.isDropDownMenu = false
        },
        getSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
        // closeOutsideDropdown(event) {
        //     if (!this.$refs.dropdown.contains(event.target)) {
        //         this.closeDropdownMenu()
        //     }
        // }
    },
    // mounted() {
    //     this.isDropDownMenu = false
    // },
    // unmounted() {
    //     this.isDropDownMenu = true
    // },
    watch: {
        '$route'() {
            console.log(this.$route);
            // if(this.$route.path === '/login') this.isLogin = true
        }
    },
    mounted() {
        window.addEventListener('click', this.closeDropDownMenu)
    },
    beforeUnmount() {
        window.removeEventListener('click', this.closeDropDownMenu)
    },
    components: {
        AppFilter,
        Logo
    }
}
