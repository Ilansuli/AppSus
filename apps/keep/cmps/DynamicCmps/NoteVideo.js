import { svgService } from "../../../../services/svg.service.js"

export default {
    name: 'noteVideo',
    props: ['info', 'isEdit'],
    template: `
         <div class="note-info">
         <h1 
         :contenteditable="isEdit" 
         class="note-title" 
         v-text="info.title" 
         @blur="updateTitle" 
       >
        </h1>
        <section class="url-container" v-if='!isEdit'>
        <video   class='video' autoplay loop muted > 
            <source :src='info.url' type='video/mp4' @error="errorImg">
        </video>
        </section>


        <section class="url-container edit"  v-if='isEdit' @mouseover="isHover=true" @mouseleave="isHover=false">
            <video   v-if="info.url" class='video' autoplay loop muted > 
            <source :src='info.url' type='video/mp4' @error="errorImg">
        </video>
            <button class="remove-url" @click="info.url=''" v-if="info.url && isHover">
            <div className="icon" v-html="getSvg('trash2')"></div>
            </button>
                <input v-if="!info.url"
                @blur="updateUrl"
                placeholder="Video Url"
                >
            </section>

    </div>
        `,
    components: {},
    created() {
        if (!this.info.title) this.info.title = "Title"
    },
    data() {
        return {
            isHover: false
        }
    },
    methods: {
        updateTitle(event) {
            var txt = event.target.innerText
            this.info.title = txt
            this.$emit('update-info', this.info)
        },
        errorImg(event) {
            event.target.src = '../../assets/img/note/error.png'
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        updateUrl(ev) {
            const url = ev.target.value
            this.info.url = url
        }
    },
    computed: {},
}