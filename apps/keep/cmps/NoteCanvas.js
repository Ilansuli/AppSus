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
        <canvas @mousedown="start"
                @mousemove="draw"
                @mouseup="stop" 
                ref="canvas">
        </canvas>

    </div>
        `,
    components: {},
    mounted() {
        if (!this.info.title) this.info.title = "Title"
        this.ctx = this.$refs.canvas.getContext("2d");
        this.$refs.canvas.height = '300';
        this.$refs.canvas.width = '300';
    },
    data() {
        return {
            ctx: null,
            pos: {
                x: null,
                y: null
            }
        }
    },
    methods: {
        updateTitle(event) {
            var txt = event.target.innerText
            this.info.title = txt
            this.$emit('update-info', this.info)
        },
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        start(e) {
            console.log(e);
            this.isDraw = true;
            this.pos.x = e.clientX;
            this.pos.y = e.clientY;
        },
        draw() {
            if (this.isEdit && this.isDraw) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.pos.x,
                    this.pos.y)
                this.ctx.lineWidth = 3
                this.ctx.strokeStyle = 'red'
                this.ctx.stroke()
            }
        },
        stop() {
            this.isDraw = false
        }
    },
    computed: {},
}