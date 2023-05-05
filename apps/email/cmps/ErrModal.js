import { svgService } from "../../../services/svg.service.js"
export default {
  name: 'Error Modal',
  props: [],
  emits: [],
  template: `
  <section class="modal-wrapper">
    <form @submit.prevent="closeErrModal" class="err-modal">
        <header>
            <h1>Error</h1>
            <button class="icon-x" v-html="getSvg('x')"></button>
        </header>
        <p>Please specify recipient.</p>
        <button class="ok-btn">OK</button>
    </form>
  </section>
  `,
  components: {},
  created() {

  },
  data() {
    return {}
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
    closeErrModal(){
      this.$emit('closeErrModal')
    }
  },
  computed: {},


}
