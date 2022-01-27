import { $node, axios, $team } from "@jx3box/jx3box-common/js/https";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";
// 获取奇遇列表
function getAdventures(params) {
    return $node().get(`/serendipities`, {
        params,
    });
}
// 获取奇遇详情
function getAdventure(id) {
    return $node().get(`/serendipity/${id}`);
}
// 获取奇遇任务链

function getAdventureTask(id) {
    return $node().get(`/serendipity/${id}/task`);
}

function getSerendipityAchievementIds() {
    return axios.get(`${__iconPath}pvx/serendipity/output/serendipity.json`);
}
function getUserSchool() {
    return $team().get("api/team/my-game-roles");
}

export { getAdventures, getAdventure, getAdventureTask, getSerendipityAchievementIds, getUserSchool };
