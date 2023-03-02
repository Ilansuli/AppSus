import { svgService } from "../../../services/svg.service.js"
export default {
    name: "note preview",
    props: ['note'],
    template: `
    
            <div class="text-box">
                <h1 class="note-title">{{note.info.title}}</h1>
                <p class="note-text">{{ note.info.txt }}</p>
            </div>
            
    `, methods: {
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
    },
    computed: {

    },


}
