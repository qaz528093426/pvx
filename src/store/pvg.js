import Vue from "vue";
import Vuex from "vuex";
import { getOther, getItemsPrice } from "@/service/manufacture";

Vue.use(Vuex);

let store = {
    state: {
        client: location.href.includes("origin") ? "origin" : "std",
        server: "蝶恋花",
        craft_key: "",
        item_id: "",
        item: {},
        itemData: {},
        priceData: {},
        myPrice: {},
        auctionPrice: {},
        cartList: [],
        childrenList: [],
        hasItems: [],
    },
    mutations: {
        toState(state, data) {
            Object.keys(data).forEach((item) => {
                state[item] = data[item];
            });
        },
        toMergeItem(state, { itemData }) {
            let childrenList = state.childrenList;
            Object.keys(itemData).forEach((item) => {
                childrenList = childrenList.map((el) => {
                    if (el.id == item) el = Object.assign(el, itemData[item]);
                    return el;
                });
            });
            state.childrenList = childrenList;
        },
        toMergePrice(state, { priceData }) {
            const childrenList = state.childrenList.map((item) => {
                if (priceData[item.id]) item.Price = priceData[item.id];
                return item;
            });
            state.childrenList = childrenList;
        },
        // 加入购物车
        toCart(state, { item }) {
            if (state.cartList.findIndex((cart) => cart.ID == item.ID) == -1) {
                state.cartList.push(JSON.parse(JSON.stringify(item)));
            } else {
                state.cartList = state.cartList.map((cart) => {
                    if (cart.ID == item.ID) cart.count += item.count;
                    console.log(cart, item);
                    return cart;
                });
            }
        },
        // 自定义价格
        toMyPrice(state, { id, Price }) {
            Vue.set(state.myPrice, id, Price);
        },
    },

    actions: {
        asyncChildrenList(ctx, arr) {
            const state = ctx.state;
            const { client } = state;
            const ids = arr.map((item) => item.id).filter((item) => !state.priceData[item]);
            const item_ids = arr.map((item) => item.id).filter((item) => !state.itemData[item]);

            if (item_ids.length) {
                getOther({ client, ids: item_ids.join(), per: arr.length }).then((res) => {
                    let itemData = {};
                    res.data.list.forEach((item) => {
                        let _obj = {};
                        Object.keys(item).forEach((el) => {
                            if (item[el]) _obj[el] = item[el];
                        });
                        delete _obj.Price;
                        itemData[item.ID] = _obj;
                    });
                    itemData = Object.assign(state.itemData, itemData);
                    ctx.commit("toState", { itemData });
                    ctx.commit("toMergeItem", { itemData });
                });
            } else {
                ctx.commit("toMergeItem", { itemData: state.itemData });
            }

            if (ids.length) {
                getItemsPrice({ ids: ids.join(), client }).then((res) => {
                    let priceData = {};
                    res.data.forEach((item) => {
                        priceData[item.ItemIndex] = item.Price;
                    });
                    priceData = Object.assign(state.priceData, priceData);
                    ctx.commit("toState", { priceData });
                    ctx.commit("toMergePrice", { priceData });
                });
            } else {
                ctx.commit("toMergePrice", { priceData: state.priceData });
            }
        },
        //添加物品进购物车
        toAddCart(ctx, { count }) {
            const state = ctx.state;
            let { item, childrenList, myPrice, auctionPrice } = state;
            item.childrenList = childrenList.map((child) => {
                if (!child.Price) {
                    if (auctionPrice[child.price_id]) child.Price = auctionPrice[child.price_id];
                    if (myPrice[child.id]) child.Price = myPrice[child.id];
                }
                return child;
            });
            item.count = count;
            ctx.commit("toCart", { item });
        },
    },
};

export default new Vuex.Store(store);
