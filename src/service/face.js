import { $next } from "@jx3box/jx3box-common/js/https";

/**
 * 获取捏脸列表
 * @param {*} params 参数
 */
function getFaceList(params) {
    return $next().get("/api/face", { params });
}

export {
    getFaceList
}
