import { $node } from "@jx3box/jx3box-common/js/https";

function getPets(params) {
    return $node().get("/pets", {
        params: params,
    });
}

function getPet(petid) {
    return $node().get(`/pet/${petid}`);
}

function getPetSkill(petid) {
    return $node().get(`/pet/${petid}/skill`);
}
export { getPets, getPet, getPetSkill };
