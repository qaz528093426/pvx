import { $node } from "@jx3box/jx3box-common/js/https";
const $ = $node();

function getFurniture(params) {
	return $.get("/house/furniture", {
		params: params,
	});
}
function getFurnitureDetail(id) {
	return $.get(`/house/furniture/${id}`);
}
function getSetList(id) {
	return $.get(`/house/set/${id}`);
}
export { getFurniture, getFurnitureDetail, getSetList };
