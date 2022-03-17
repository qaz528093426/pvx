import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
	state: {
		client: location.href.includes("origin") ? "origin" : "std",
		cart_item: "",
	},
	mutations: {
		replaceItem(state, data) {
			state.cart_item = data;
		},
	},
	getters: {},
	actions: {},
	modules: {},
};

export default new Vuex.Store(store);
