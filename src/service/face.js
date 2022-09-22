import { $next,$pay } from "@jx3box/jx3box-common/js/https";

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
 * 管理员设置一个精选
 * @param {Object} id
 */
function setStar(id){
    return $next().put(`/face/${id}/manager/set/star`)
}
/**
 * 管理员取消一个精选
 * @param {Object} id
 */
function cancelStar(id){
    return $next().put(`/face/${id}/manager/cancel/star`)
}
/**
 * 管理员上架捏脸
 * @param {Object} id
 */
function onlineFace(id){
    return $next().put(`/face/${id}/manager/online`)
}
/**
 * 管理员下架捏脸
 * @param {Object} id
 */
function offlineFace(id){
    return $next().put(`/face/${id}/manager/offline`)
}
/**
 * 购买捏脸
 * postType {string} 捏脸固定填face
 * PostId {int}  捏脸的主键id， 【可以从捏脸列表中获取id】
 * priceType {string} 支付方式。【可以从捏脸列表中获取 priceType】
 * priceCount {int} 支付数量 【可以从捏脸列表中获取 priceCount】
 * payUserId {int} 购买人的id  【当前登录用户】
 * accessUserId {int} 出售人的id  【可以从捏脸列表中获取 user_id】
 */
function payFace(params){
    return $pay().post(`/api/buy-licence/article/${params.postType}/${params.postId}/pay/${params.priceType}/${params.priceCount}/from/${params.payUserId}/to/${params.accessUserId}`)
}
/**
 * 循环获取支付结果
 * @param {Object} id  购买记录id
 */
function loopPayStatus(id){
    return $pay().get(`/buy-licence/result/${id}`)
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
    getFaceList,getOneFaceInfo,setStar,cancelStar,onlineFace,offlineFace,payFace,loopPayStatus,getAccessoryList,getDownUrl
}
