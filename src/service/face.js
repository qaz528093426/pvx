import { $next } from "@jx3box/jx3box-common/js/https";

/**
 * 获取捏脸列表
 * @param {*} params 参数
 */
function getFaceList(params) {
    return $next().get("/api/face", { params });
}
/**
 * 获取一个捏脸
 * @param {Object} id
 */
function getOneFaceInfo(id){
    return $next().get(`/api/face/${id}`);
}
/**
 * 获取附件列表
 * @param {Object} postId
 */
function getAccessoryList(postId,params){
    return $next().get(`/api/charge_attachment/face/${postId}`,{
        params: params,
    });
}
/**
 * 获取下载地址
 * @param {Object} postId
 * @param {Object} uuid
 */
function getDownUrl(postId,uuid){
    return $next().get(`/api/charge_attachment/download/face/${postId}/${uuid}`);
}
export {
    getFaceList,getOneFaceInfo,getAccessoryList,getDownUrl
}
