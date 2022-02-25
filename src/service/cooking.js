import { $node, $helper } from "@jx3box/jx3box-common/js/https";

const $n = $node()
const $h = $helper()
function getManufactures(obj) {
  return $n.get(`/manufactures/${obj.type}`, {
    params: obj,
  })
}
function getmanufacture(obj) {
  return $n.get(`/manufacture/${obj.type}/${obj.id}`, {
    params: obj,
  })
}

function getItemsPrice(obj) {
  return $h.get(`/api/items/price`, {
    params: obj,
  })
}
function getOther(obj) {
  return $n.get(`/other`, {
    params: obj,
  })
}
export { getManufactures, getItemsPrice, getmanufacture,getOther };
