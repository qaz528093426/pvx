import { $node } from "@jx3box/jx3box-common/js/https";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
import axios from "axios";
// const $ = axios.create({
//     baseURL : 'http://localhost:7002/'
// })
const $ = $node()

function getPets(params) {
    return $.get("/pets", {
        params: params,
    });
}

function getPet(petid, client = "std") {
    return $.get(`/pet/${petid}`, {
        params: {
            client,
        },
    });
}

function getPetSkill(petid) {
    return $.get(`/pet/${petid}/skill`);
}

function getShopInfo({ item_type, item_id, client = "std" }) {
    return $.get(`/shop`, {
        params: {
            client,
            itemType: item_type,
            itemId: item_id,
        },
    });
}

function getPetLucky() {
    return axios.get(__iconPath + "pvx/pet/output/pet_lucky.json");
}

export { getPets, getPet, getPetSkill, getShopInfo, getPetLucky };
