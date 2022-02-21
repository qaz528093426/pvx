import axios from "axios";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";

const $ = axios.create({
    baseURL: __iconPath + "pvx/house/output/",
});

// 获取房屋升级需求表
function getHomelandLevelUp() {
    return $.get("house_level_up.json");
}

// 获取房屋日常活动奖励
function getHomelandGame() {
    return $.get("homeland_game_play.json");
}

// 获取地图房屋坐标
function getHomelandCoord(mapId) {
    return $.get(`landinfo/${mapId}.json`);
}

export { getHomelandLevelUp, getHomelandGame, getHomelandCoord };
