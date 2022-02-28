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
    return $.get(`/house/furniture/set/${id}`);
}
function getFurnitureColor(id) {
    return $.get(`/house/furniture/color/${id}`);
}

function getFurnitureMaterials(other_id) {
    return $.get(`/manufacture/furniture`,{
		params : {
			id : other_id
		}
	});
}
// 获取物品详情
function getItemDetail(params){
    return $.get(`/other`, {
        params
    })
}


export { getFurniture, getFurnitureDetail, getSetList, getFurnitureColor, getFurnitureMaterials,getItemDetail };
