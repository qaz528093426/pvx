import {
    $cms
} from "@jx3box/jx3box-common/js/https";

function getPets(params) {
    let url = "https://node.jx3box.com/pets?per=15"
    if (params) {
        url += params
    }
    return $cms().get(url);
}

function getPet(petid){
    return $cms().get(`https://node.jx3box.com/pet/${petid}`);
}

function getPetSkill(petid){
    return $cms().get(`https://node.jx3box.com/pet/${petid}/skill`);
}
export {
    getPets , getPet , getPetSkill
};