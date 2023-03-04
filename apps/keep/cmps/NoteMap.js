import { svgService } from "../../../services/svg.service.js"

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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.286163733088!2d34.83463778495322!3d32.11557318117685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d49bd9ca994a7%3A0x44c60419fc182184!2z15nXpteX16cg15jXkdeg16fXmdefIDU1LCDXqtecINeQ15HXmdeRLdeZ16TXlQ!5e0!3m2!1siw!2sil!4v1677918107752!5m2!1siw!2sil"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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