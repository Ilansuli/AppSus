import { svgService } from "../../../services/svg.service.js"

export default {
    name: 'noteImg',
    props: ['info', 'isEdit'],
    template: `
         <div class="note-info ">
         <h1 :contenteditable="isEdit" class="note-title" v-text="info.title" @blur="updateTitle" ref="txt"></h1>
            <section class="url-container audio" v-if="!isEdit">
            <audio alt="No Audio Found" v-if="info.url" controls>
                    <source  @error="errorImg" :src="info.url" />
            </audio>
            </section>

            <section class="url-container audio edit"  v-if='isEdit' @mouseover="isHover=true" @mouseleave="isHover=false">
            <audio v-if="info.url" controls>
                    <source  @error="errorImg" :src="info.url" />
            </audio>
            <button class="remove-url" @click="info.url=''" v-if="info.url && isHover">
            <div className="icon" v-html="getSvg('trash2')"></div>
            </button>
                <input v-if="!info.url"
                @blur="updateUrl"
                placeholder="Audio Url"
                >
            </section>

        </div>
        `,
    components: {

    },
    created() {
        if (!this.info.title) this.info.title = "Title"
    },
    data() {
        return {
            isHover: false
        }
    },
    methods: {
        updateTitle(ev) {
            var txt = ev.target.innerText
            this.info.title = txt
            this.$emit('update-info', this.info)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        errorImg(event) {
            event.target.src = '../../assets/img/note/error.png'
        },
        updateUrl(ev) {
            const url = ev.target.value
            this.info.url = url
        }
    },
    computed: {},
}