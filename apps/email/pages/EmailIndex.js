import EmailList from "../cmps/EmailList.js"

export default {
  name: 'Note Keep', 
  props: [],
  template: `
  <section class="email-index">

  </section>
      <h1>EMAIL</h1>
        <EmailList
         :emails="emails"
         v-if="emails"
         />
        `,
components:{
  EmailList,
},
created() {},
  data() {
    return {
      emails:[
        {  
          id: 'e101',  
          subject: 'Miss you!',  
          body: 'Would love to catch up sometimes',  
          isRead: false,  
          sentAt : 1677666799594,  
          removedAt : null,  
          from: 'momo@momo.com', 
          to: 'user@appsus.com' 
         },
         {  
          id: 'e102',  
          subject: 'Hello',  
          body: 'Your Delivery from AliExpress Arrived',  
          isRead: false,  
          sentAt : Date.now() -3600 ,  
          removedAt : null,  
          from: 'ilan@momo.com', 
          to: 'user@appsus.com' 
         },
         {  
          id: 'e103',  
          subject: 'Fuck You',  
          body: 'Fuck You Sprint III',  
          isRead: false,  
          sentAt : 1551133930594,  
          removedAt : null,  
          from: 'koko@momo.com', 
          to: 'user@appsus.com' 
         } 
      ]
    }
  },
  methods: {},
  computed: {},
}
