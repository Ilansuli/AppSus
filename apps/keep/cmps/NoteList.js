import NotePreview from './NotePreview.js'
import { svgService } from "../../../services/svg.service.js"

export default {
    name: "note list",
    props: ['notes'],
    template: `  
    <section class="notes-list">
        <article 
                v-for="note in notes" 
                :key="note.id" 
                class="note" 
                >
                <NotePreview 
                :note="note" 
                @click="getDetails(note.id)"
                
                    />
            <div class="tool-bar">
                    <button><div className="icon" v-html="getSvg('pin')"></div>
            </button>
                    <button @click="toggleColorPicker"><div className="icon" v-html="getSvg('palette')"></div></button>
                    <button @click="remove(note.id)"><div className="icon" v-html="getSvg('trash')"></div></button>
            </div>
            <section class="color-picker"       v-if="isSelectColor">
                <article @click="changeBcgColor('#f28b82',note.id)" class="color red" ></article>
                <article class="color orange"  @click="changeBcgColor('#fabc02',note)"></article>
                <article class="color yellow"   @click="changeBcgColor('#fff476',note)"></article>
                <article class="color green"  @click="changeBcgColor('#ccff90',note)"></article>
                <article class="color blue"  @click="changeBcgColor('#a7ffeb',note)"></article>
            </section>
        </article>
    </section>
  
    `,
    data() {
        return {
            isSelectColor: false,
            note: null
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        getDetails(noteId) {
            this.$router.push('/note/' + noteId)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        toggleColorPicker() {
            this.isSelectColor = !this.isSelectColor
        },
        changeBcgColor(color, note) {
            note.style.backgroundColor = color
            console.log(note);
            this.$emit('update', note)
        }
    },
    computed: {
        styleObject(note) {
            console.log(note);
            return {
                backgroundColor: note.style.backgroundColor || '#ffffff'
            }
        }
    },
    created() {

    },
    components: {
        NotePreview,
    },

}