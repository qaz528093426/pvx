import {
    $node,
    $helper,
    axios,
    $cms,
    $next
} from "@jx3box/jx3box-common/js/https";
import {
    __iconPath
} from "@jx3box/jx3box-common/data/jx3box";
// 获取奇遇列表
function getAdventure(params) {
    return $node().get(`/serendipities`, {
        params
    });
}
// 获取奇遇详情
function getAdventureID(id) {
    return $node().get(`/serendipity/${id}`);
}
// 获取奇遇任务链

function getAdventureTask(id) {
    return $node().get(`/serendipity/${id}/task`);
}

function getSerendipity(id) {
    return $helper().get("/api/wiki/post", {
        params: {
            type: "achievement",
            source_id: id,
            supply: 1,
        },
    });
}

function getSerendipityJson() {
    return axios.get(`${__iconPath}pvx/serendipity/output/serendipity.json`);
}

function getUserInfo() {
    return $cms().get("/api/cms/user/my/info");
}

function getUserSerendipity(params) {
    return $next().get("/api/serendipity", {
        params
    });
}

export {
    getAdventure,
    getAdventureID,
    getAdventureTask,
    getSerendipity,
    getUserInfo,
    getSerendipityJson,
    getUserSerendipity
};