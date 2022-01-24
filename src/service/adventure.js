import { $node } from "@jx3box/jx3box-common/js/https";

// 获取奇遇列表
function getAdventure(params) {
    return $node().get(`/serendipities`, { params });
}
// 获取奇遇详情
function getAdventureID(id) {
    return $node().get(`/serendipity/${id}`);
}
// 获取奇遇任务链

function getAdventureTask(id) {
    return $node().get(`/serendipity/${id}/task`);
}
export { getAdventure, getAdventureID, getAdventureTask };
