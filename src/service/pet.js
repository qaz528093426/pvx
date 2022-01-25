import { $node } from "@jx3box/jx3box-common/js/https";
import {__iconPath} from "@jx3box/jx3box-common/data/jx3box.json"
import axios from "axios"
function getPets(params) {
    return $node().get("/pets", {
        params: params,
    });
}

function getPet(petid, client = 'std') {
    return $node().get(`/pet/${petid}?client=${client}`);
}

function getPetSkill(petid) {
    return $node().get(`/pet/${petid}/skill`);
}

function getShopInfo({ item_type, item_id, client = 'std' }) {
    return $node().get(`/shop`, {
        params: {
            client,
            itemType: item_type,
            itemId: item_id
        }
    })
}

function getPetLucky (){
    return axios.get(__iconPath + "pvx/pet/output/pet_lucky.json")
}

export { getPets, getPet, getPetSkill, getShopInfo , getPetLucky };
