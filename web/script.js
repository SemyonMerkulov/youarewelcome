var message = Vue.component('message', {
	props: {
		client: ,
		text: ''
	},
	template: '<li :class="{ chat__msg-item: true, chat__msg-item_client: true }">{{ this.text }}</li>'
});

new Vue({
	el: "#app",
	components: { message },
	methods: {
		sendMsg: function() {
			var ComponentClass = Vue.extend(message);
      var instance = new ComponentClass({
        propsData: { client: true, text: 'Test text' }
      });
      instance.$mount();
      // console.log(this.message);
			this.$refs.list.appendChild(instance.$el);
		}
	}
})