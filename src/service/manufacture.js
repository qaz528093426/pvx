import { $node, $helper } from "@jx3box/jx3box-common/js/https";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
import axios from "axios";
const $n = $node();
const $h = $helper();

function getmanufacture(obj) {
	return $n.get(`/manufacture/${obj.type}/${obj.id}`, {
		params: obj,
	});
}

function getItemsPrice(obj) {
	return $h.get(`/api/items/price`, {
		params: obj,
	});
}
function getOther(obj) {
	return $n.get(`/other`, {
		params: obj,
	});
}
// 获取技艺某种类型的列表
function getManufactures(params) {
	return $n.get("/manufactures", { params });
}
// 获取技艺某种类型的单个详细信息
function getManufactureItem(type, id) {
	return $n.get(`/manufacture/${type}/${id}`);
}
function getCraftJson() {
	return axios.get(`${__iconPath}pvx/manufacture/output/craft_belong.json`).then((res) => {
		return res;
	});
}
export { getManufactures, getManufactureItem, getCraftJson, getItemsPrice, getmanufacture, getOther };
