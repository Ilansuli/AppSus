import { svgService } from "../services/svg.service.js"
import AppFilter from "./AppFilter.js"

export default {
    template: `
        <header class="app-header">
            <div class="logo">
                <div class="a">A</div>
                <div class="first-p">p</div>
                <div class="second-p">p</div>
                <div class="first-s">s</div>
                <div class="u">u</div>
                <div class="second-s">s</div>
            </div>
                    <AppFilter/>
            <div class="apps-icon" @click ="toggleHover" v-html="getSvg('apps')"></div> 

            <div class="dropdown-content" v-show="isHover">
                <div class="home-logo">
                    <router-link to="/"><img  src="assets/img/main/home.png"></router-link>  
                </div>
                <div>
                    <router-link to="/about"><img  src="assets/img/main/about.png"></router-link>
                </div>

                <div class="gmail-logo">
                    <router-link  to="/email"><img  src="assets/img/main/gmail.png"></router-link>
                </div>

                <div class="keep-logo" >
                    <router-link to="/note"><img src="https://i.pinimg.com/originals/09/96/92/099692d1d651d51b7caf3040fce0f748.png"></router-link>
                </div>

            </div>
        </header>
    `,
    data() {
        return {
            isHover: false
        }
    },
    methods: {
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
    components: {
        AppFilter
    }
}
