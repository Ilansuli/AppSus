export default {
  name: 'Email Preview', 
  props: ['email'],
  template: `
        <div>
            <span>{{email.subject}}</span>
            <span>{{email.body}}...</span>
            <span>{{convertTimeStamp}}</span>
        </div>
        <pre>{{email}}</pre>
        `,
components:{},
created() {},
  data() {
    return {
    }
  },
  methods: {
  
  },
  computed: {
    convertTimeStamp(){
        const currentDateTS = Date.now()
        const sentTS = this.email.sentAt
        const sentDate = new Date(sentTS)
        if(currentDateTS - sentTS < 604800){
            return sentDate.getMonth() + 1
        }
    }
  },
}
