<template>
    <a class="v-pet-listItemB" target="_self" :href="petObject.Index">
        <!--宠物卡片图-->
        <img :src="getBgPath(petObject.BgPath)" class="v-pet-petImg" />
        <!--宠物边框图-->
        <img :src="getFrame(petObject.Quality)" class="v-pet-petFrame" />
        <!--固定灰色星星贴图-->
        <div class="v-pet-grayStar flex">
            <img
                src="https://icon.jx3box.com/pvx/pet/misc/newpets-81.png"
                v-for="count in 5"
                :key="count"
            />
        </div>
        <!--宠物星级-->
        <div class="v-pet-goldStar flex">
            <img
                src="https://icon.jx3box.com/pvx/pet/misc/newpets-18.png"
                v-for="count in petObject.Star"
                :key="count"
            />
        </div>
        <div class="v-pet-score flex">
            {{ petObject.Score ? petObject.Score : "？" }}
        </div>
        <span>{{ petObject.Name }}</span>
    </a>
</template>

<script>
export default {
    props: {
        petObject: {},
    },
    data: function () {
        return {};
    },
    methods: {
        // 获取宠物图片路径
        getBgPath: function (path) {
            if (path) {
                const imgName = path.match(/.*\\(.*?).tga/);
                if (imgName[1] == "kp_WJ_运输机甲001") {
                    imgName[1] = "kp_wj_运输机甲001";
                }
                return (
                    "https://icon.jx3box.com/pvx/pet/images/" +
                    imgName[1] +
                    ".png"
                );
            }
        },
        // 获取宠物边框图片路径
        getFrame: function (quality) {
            let frameName = "";
            if (quality) {
                switch (quality) {
                    case 2:
                        frameName = "/greenborder.png";
                        break;
                    case 3:
                        frameName = "/blueborder.png";
                        break;
                    case 4:
                        frameName = "/purpleborder.png";
                        break;
                    case 5:
                        frameName = "/purpleborder.png";
                        break;
                }
                return "https://icon.jx3box.com/pvx/pet/frame" + frameName;
            }
        },
    },
};
</script>

<style lang="less">
.v-pet-listItemB {
    width: 230px;
    height: 380px;
    background: none;
    border-radius: 3px;
    margin: 0 15px;
    margin-bottom: 30px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    .v-pet-petImg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 98%;
        height: 98%;
        z-index: -1;
    }
    .v-pet-petFrame {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
    span {
        position: absolute;
        bottom: 11%;
        left: 16%;
        background: none;
        color: #fff2c5;
        font-size: 22px;
        letter-spacing: 5px;
        text-shadow: 0 0 1px #333;
        z-index: 1;
        font-family: "SimSun", "Microsoft YaHei";
        font-weight: bold;
        text-shadow: 0 0 5px #000;
    }
    .v-pet-grayStar,
    .v-pet-goldStar {
        position: absolute;
        z-index: 1;
        width: 20px;
        height: 80px;
        top: 10%;
        right: 2%;
        flex-direction: column;
        justify-content: flex-start;
        img {
            width: 10px;
            height: 10px;
            margin: 3px 0;
        }
    }
    .v-pet-goldStar {
        z-index: 2;
    }
    .v-pet-score {
        position: absolute;
        z-index: 1;
        width: auto;
        height: auto;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        top: 2%;
        right: 5%;
    }
}
</style>