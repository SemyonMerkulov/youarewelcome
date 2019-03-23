var message = Vue.component('message', {
  props: {
    client: Boolean,
    text: String
  },
  computed: {
    classObject: function() {
      return {
        'chat__msg-item': true,
        'chat__msg-item_client': this.client
      }
    } 
  },
  template: '<li :class="classObject">{{ this.text }}</li>'
});

new Vue({
  el: "#app",
  data: {
    field: ''
  },
  components: { message },
  methods: {
    sendMsg: function() {
      const msgComponent = Vue.extend(message);
      const params = new URLSearchParams();


      if (!this.isEmpty) {
      // rendering user's message
        let userMsg = new msgComponent({
          propsData: { client: true, text: this.field }
        });
        userMsg.$mount();
        this.$refs.list.appendChild(userMsg.$el);

        // sending user's message
        params.append('q', this.field);

        axios.post('/api/get-answer', params)
        .then(response => {
        
          // rendering response
          let serverMsg = new msgComponent({
            propsData: { client: false, text: response.data.a } 
          });
          serverMsg.$mount();
          this.$refs.list.appendChild(serverMsg.$el);
        })
        .catch(error => {
          console.log(error);
        });
        
        this.field = '';
      } 
    }
  },
  computed: {
    isEmpty: function() {
      if (!this.field.trim()) {
        return true;
      }
      else {
        return false;
      }
    }
  }
})