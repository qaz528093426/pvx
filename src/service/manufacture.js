import { $node, $helper } from "@jx3box/jx3box-common/js/https";

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
	return $n.get("/manufactures", {params});
}

export { getManufactures, getItemsPrice, getmanufacture, getOther };
