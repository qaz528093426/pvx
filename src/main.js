Vue.config.productionTip = false;

// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 通用UI模块
import JX3BOX_UI from "@jx3box/jx3box-common-ui";
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);

// 数据与路由
// import router from "./router";
// import store from "./store";

Vue.prototype.$addStorageEvent = function (key, data) {
	// 创建一个StorageEvent事件
	var newStorageEvent = document.createEvent("StorageEvent");
	const storage = {
		setItem: function (k, val) {
			localStorage.setItem(k, val);
			// 初始化创建的事件
			newStorageEvent.initStorageEvent("setItem", false, false, k, null, val, null, null);
			// 派发对象
			window.dispatchEvent(newStorageEvent);
		},
	};
	return storage.setItem(key, data);
};

import App from "./App.vue";
new Vue({
	// router,
	// store,
	render: (h) => h(App),
}).$mount("#app");
