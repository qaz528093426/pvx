import { $helper } from "@jx3box/jx3box-common/js/https";

const getWiki = (params) => {
    return $helper().get(`/api/wiki/post`, {
        params,
    });
};

export { getWiki };
