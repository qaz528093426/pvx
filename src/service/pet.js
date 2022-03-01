import { $node } from "@jx3box/jx3box-common/js/https";
import { __dataPath } from "@jx3box/jx3box-common/data/jx3box.json";
import axios from "axios";
// const $ = axios.create({
//     baseURL : 'http://localhost:9002/'
// })
const $ = $node()

function getPets(params) {
    return $.get("/pets", {
        params: params,
    });
}

function getPet(petid, params) {
    return $.get(`/pet/${petid}`, {
        params
    });
}

function getPetSkill(petid,  params) {
    return $.get(`/pet/${petid}/skill`,{
        params
    });
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
    return axios.get(__dataPath + "pvx/pet/output/pet_lucky.json");
}

function getSkill(params) {
    return $.get('/skills', {
        params
    })
}

export { getPets, getPet, getPetSkill, getShopInfo, getPetLucky, getSkill };
