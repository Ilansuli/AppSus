import { svgService } from "../../../services/svg.service.js"
import { mapService } from "../services/map.service.js"

export default {
    name: 'noteVideo',
    props: ['info', 'isEdit'],
    template: `
        <div ref='map' id="map"></div>
        `,
    components: {},
    mounted() {
        // this.onInitMap()

    },
    data() {
        return {
            map: null,
            API_KEY: 'AIzaSyA5r6sPaBXcDNC1HFosp_z4t-zsEz0pOfE'

        }
    },
    methods: {
        initMap(lat = 32.0749831, lng = 34.9120554) {
            return _connectGoogleApi()
                .then(() => {
                    gMap = new google.maps.Map(document.querySelector('#map'), {
                        center: { lat, lng },
                        zoom: 15,
                    })
                })
        },

    },
    computed: {},
}