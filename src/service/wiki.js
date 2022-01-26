import { $helper } from "@jx3box/jx3box-common/js/https";

const getWiki = (type, sourceId, client = 'std') => {
    return $helper().get(`api/wiki/post`, {
        params: {
            type,
            source_id: sourceId,
            supply: 1,
            client
        },
    });
};

export { getWiki };
