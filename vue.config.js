const path = require("path");
const pkg = require("./package.json");
const { JX3BOX, SEO } = require("@jx3box/jx3box-common");
const Setting = require("./setting.json");

module.exports = {
    //❤️ Multiple pages ~
    pages: {
        index: {
            title: "休闲栏目 - JX3BOX",
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
        },
        share: {
            title: "捏脸妆容 - JX3BOX",
            entry: "src/pages/share.js",
            template: "public/index.html",
            filename: "share/index.html",
        },
        facedata: {
            title: "妆容解析 - JX3BOX",
            entry: "src/pages/facedata.js",
            template: "public/index.html",
            filename: "facedata/index.html",
        },
        furniture: {
            title: "家具大全 - JX3BOX",
            entry: "src/pages/furniture.js",
            template: "public/index.html",
            filename: "furniture/index.html",
        },
        flower: {
            title: "花价查询 - JX3BOX",
            entry: "src/pages/flower.js",
            template: "public/index.html",
            filename: "flower/index.html",
        },
        pet: {
            title: "宠物大全 - JX3BOX",
            entry: "src/pages/pet.js",
            template: "public/index.html",
            filename: "pet/index.html",
        },
        adventure: {
            title: "奇遇大全 - JX3BOX",
            entry: "src/pages/adventure.js",
            template: "public/index.html",
            filename: "adventure/index.html",
        },
        cooking: {
            title: "技艺助手 - JX3BOX",
            entry: "src/pages/cooking.js",
            template: "public/index.html",
            filename: "cooking/index.html",
        },
        price: {
            title: "物价大全 - JX3BOX",
            entry: "src/pages/price.js",
            template: "public/index.html",
            filename: "price/index.html",
        },
        gold: {
            title: "金价走势 - JX3BOX",
            entry: "src/pages/gold.js",
            template: "public/index.html",
            filename: "gold/index.html",
        },
        dress: {
            title: "外观大全 - JX3BOX",
            entry: "src/pages/dress.js",
            template: "public/index.html",
            filename: "dress/index.html",
        },
    },

    //❤️ Proxy ~
    devServer: {
        proxy: {
            "/api/serendipity": {
                target: "https://pull.j3cx.com/",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/vip": {
                target: "https://pay.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/inspire": {
                target: "https://pay.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/messages": {
                target: "https://helper.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/cms": {
                target: process.env["DEV_SERVER"] == "true" ? "http://localhost:5120" : "https://cms.jx3box.com",
            },
            "/api": {
                target: "https://next2.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
        },
        disableHostCheck: true,
    },

    //❤️ define path for static files ~
    publicPath:
        //FOR Localhost => development
        (process.env.NODE_ENV === "development" && "/") ||
        //BY origin
        (process.env.STATIC_PATH === "origin" && `${JX3BOX.__staticPath["origin"]}${pkg.name}/`) ||
        //BY github
        (process.env.STATIC_PATH === "github" && `${JX3BOX.__staticPath["github"]}${pkg.name}/`) ||
        //BY jsdelivr
        (process.env.STATIC_PATH === "jsdelivr" && `${JX3BOX.__staticPath["jsdelivr"]}${pkg.name}@gh-pages/`) ||
        //BY OSS=>CDN
        (process.env.STATIC_PATH === "mirror" && `${JX3BOX.__staticPath["mirror"]}${pkg.name}/`) ||
        //BY relative path
        (process.env.STATIC_PATH === "repo" && `/${pkg.name}/`) ||
        //BY root path or bind a domain
        (process.env.STATIC_PATH == "root" && "/") ||
        //for lost
        "/",

    chainWebpack: (config) => {
        //💘 html-webpack-plugin ~
        // Multiple pages disable the block below
        // config.plugin("html").tap(args => {
        //     args[0].meta = {                            //------设置SEO信息
        //         Keywords: Setting.keys,
        //         Description: Setting.desc
        //     };
        //     args[0].title = Setting.title + SEO.title;  //------自动添加标题后缀
        //     return args;
        // });

        //💝 in-line small imgs ~
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap((options) => Object.assign(options, { limit: 10240 }));

        //💝 in-line svg imgs ~
        config.module.rule("vue").use("vue-svg-inline-loader").loader("vue-svg-inline-loader");

        //💖 import common less var * mixin ~
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        var preload_styles = [];
        preload_styles.push(
            path.resolve(__dirname, "./node_modules/csslab/base.less"),
            path.resolve(__dirname, "./node_modules/@jx3box/jx3box-common/css/var.less"),
            path.resolve(__dirname, "./src/assets/css/var.less")
        );
        function addStyleResource(rule) {
            rule.use("style-resource").loader("style-resources-loader").options({
                patterns: preload_styles,
            });
        }
        types.forEach((type) => addStyleResource(config.module.rule("less").oneOf(type)));
    },
};
