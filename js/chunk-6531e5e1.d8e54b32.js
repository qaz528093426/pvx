(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6531e5e1"],{"097b6":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-pet-single"},[i("div",{staticClass:"m-pet-navigation"},[i("el-button",{staticClass:"u-goback",attrs:{size:"medium",icon:"el-icon-arrow-left",plain:""},on:{click:t.goBack}},[t._v("返回列表")]),i("div",{staticClass:"m-pet-links"},[i("a",{staticClass:"u-link u-item",attrs:{href:t.getLink("item",t.item_id)}},[i("i",{staticClass:"el-icon-collection-tag"}),t._v("物品信息")]),t.achievement_id?[i("em",[t._v(" | ")]),i("a",{staticClass:"u-link u-achievement",attrs:{href:t.getLink("cj",t.achievement_id)}},[i("i",{staticClass:"el-icon-trophy"}),t._v("成就信息")])]:t._e()],2)],1),i("div",{staticClass:"m-pet-content flex"},[i("petCard",{attrs:{petObject:t.pet,lucky:t.luckyList}}),i("div",{staticClass:"m-pet-info"},[i("h1",{staticClass:"u-title"},[i("span",{staticClass:"u-name"},[t._v(t._s(t.pet.Name))]),i("span",{staticClass:"u-type"},[t._v(t._s(t.getPetType(t.pet.Class))+" · "+t._s(t.getPetSource(t.pet.Source)))]),i("i",{staticClass:"u-stars"},t._l(t.pet.Star,(function(t){return i("i",{key:t,staticClass:"el-icon-star-on"})})),0)]),i("div",{staticClass:"m-pet-skills"},t._l(t.petWiki.skills,(function(e,n){return i("div",{key:n,staticClass:"u-skill"},[i("el-popover",{key:n,attrs:{trigger:"hover","popper-class":"m-pet-skill","visible-arrow":!1,placement:"top"}},[i("div",{staticClass:"u-skill-pop"},[i("div",{staticClass:"u-skill-name"},[t._v(t._s(e.Name))]),i("div",{staticClass:"u-skill-desc"},[t._v(t._s(e.Desc))])]),i("img",{staticClass:"u-skill-icon",attrs:{slot:"reference",src:t._f("iconLink")(e.IconID),alt:e.Name},slot:"reference"})])],1)})),0),i("div",{staticClass:"u-metas"},[i("div",{staticClass:"u-meta u-score"},[i("span",{staticClass:"u-meta-label"},[t._v("宠物分数：")]),t._v(t._s(t.pet.Score))]),i("div",{staticClass:"u-meta u-desc"},[i("span",{staticClass:"u-meta-label"},[t._v("宠物说明：")]),t._l(t.getPetDesc(t.pet.Desc),(function(e){return[i("div",{key:e.text,domProps:{innerHTML:t._s(e.text)}})]}))],2),i("div",{staticClass:"u-meta u-source"},[i("span",{staticClass:"u-meta-label"},[t._v("获取线索：")]),t._l(t.getPetDesc(t.pet.OutputDes),(function(e){return[i("span",{key:e.text},[t._v(t._s(t._f("cleanResourceText")(e.text)))])]}))],2),t.shopInfo.RewardsPrice||t.shopInfo.CoinPrice?i("div",{staticClass:"u-meta u-shop"},[i("span",{staticClass:"u-meta-label"},[t._v("商城价格：")]),i("span",{staticClass:"u-price"},[i("el-tag",{staticClass:"u-price-item u-rewards"},[t._v("积分"),i("b",[t._v(t._s(t.shopInfo.RewardsPrice))]),i("i",{staticClass:"u-icon-rewards"})]),i("el-tag",{staticClass:"u-price-item u-coin"},[t._v("通宝"),i("b",[t._v(t._s(t.shopInfo.CoinPrice))]),i("i",{staticClass:"u-icon-coin"})])],1)]):t._e()])])],1),t.petWiki?i("div",{staticClass:"m-pet-wiki"},[i("detail",{attrs:{achievement_id:t.petWiki.achievement_id,item_id:t.item_id,title:"宠物攻略"}})],1):t._e(),i("div",{staticClass:"m-pet-serendipity"},[i("Serendipity",{attrs:{title:t.title}})],1)])},s=[],a=(i("7db0"),i("d3b7"),i("b0c0"),i("4d63"),i("c607"),i("ac1f"),i("2c3e"),i("25f0"),i("5319"),i("fb6a"),i("99af"),i("2ca0"),i("9b7f")),c=i("c967"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"m-pet-card"},[i("img",{staticClass:"u-image",attrs:{src:t.getImgSrc(t.petObject.BgPath)}}),i("img",{staticClass:"u-frame",attrs:{src:t.getFrameSrc(t.petObject.Quality)}}),i("div",{staticClass:"u-stars"},[i("i",{staticClass:"u-star",class:"u-star-"+t.petObject.Star})]),t.getLucky(t.petObject.Index)?i("i",{staticClass:"u-lucky"}):t._e(),i("div",{staticClass:"u-score flex"},[t._v(" "+t._s(t.petObject.Score||"？")+" ")]),i("span",{staticClass:"u-name"},[t._v(t._s(t.petObject.Name))])])},o=[],u=(i("466d"),i("65c2")),l={props:{petObject:{},lucky:{}},data:function(){return{}},methods:{getImgSrc:function(t){if(t){var e=t.match(/.*[\/,\\](.*?).tga/);return u["__iconPath"]+"pvx/pet/images/"+e[1]+".png"}},getFrameSrc:function(t){var e="";if(t){switch(t){case 2:e="/greenborder.png";break;case 3:e="/blueborder.png";break;case 4:e="/purpleborder.png";break;case 5:e="/purpleborder.png";break}return u["__iconPath"]+"pvx/pet/frame"+e}},getLucky:function(t){if(t)return-1!=this.lucky.indexOf(t.toString())}}},p=l,d=(i("2d4f"),i("2877")),f=Object(d["a"])(p,r,o,!1,null,null,null),v=f.exports,m=i("c599"),g=i("60f8"),h=i("4649"),_=i("85e4"),b=i("711f"),k={name:"PetSingle",props:[],components:{petCard:v,Detail:m["a"],Serendipity:b["a"]},data:function(){return{pet:{},petWiki:"",shopInfo:"",luckyList:[]}},computed:{id:function(){return this.$route.params.id},item_id:function(){var t,e;return(null===(t=this.pet)||void 0===t?void 0:t.ItemTabType)+"_"+(null===(e=this.pet)||void 0===e?void 0:e.ItemTabIndex)},achievement_id:function(){return this.petWiki.achievement_id},client:function(){return this.$store.state.client},title:function(){return this.pet.Name}},watch:{},methods:{getPetInfo:function(){var t=this;Object(a["a"])(this.id).then((function(e){t.pet=e.data,t.getPetWiki(),t.getShopInfo()}))},getPetWiki:function(){var t=this;this.item_id&&Object(c["a"])("item",this.item_id,this.client).then((function(e){var i,n,s;t.petWiki=null===e||void 0===e||null===(i=e.data)||void 0===i||null===(n=i.data)||void 0===n||null===(s=n.source)||void 0===s?void 0:s.pet}))},getShopInfo:function(){var t=this,e={item_type:this.pet.ItemTabType,item_id:this.pet.ItemTabIndex};Object(a["d"])(e).then((function(e){t.shopInfo=(null===e||void 0===e?void 0:e.data)||""}))},getPetType:function(t){var e=g.find((function(e){return e.class===t}));return(null===e||void 0===e?void 0:e.name)||""},getPetSource:function(t){var e=h.find((function(e){return~~t===~~e.source}));return(null===e||void 0===e?void 0:e.name)||""},getPetDesc:function(t){var e,i=new RegExp("<text>text=([\\s\\S]*?)font=([0-9]+)[\\s\\S]*?<\\/text>","gimy"),n=[];while(e=i.exec(t))n.push(e);for(var s=[],a=0,c=n;a<c.length;a++){var r=c[a];s.push({font:~~r[2],text:r[1].slice(1,-2).replace(/[\\n]/g,"")})}return s},goBack:function(){this.$router.push({name:"list"})},goItem:function(){var t=this.pet,e=t.ItemTabType,i=t.ItemTabIndex,n=Object(_["getLink"])("item","".concat(e,"_").concat(i));window.open(n,"_blank")},getPetLucky:function(){var t=this;Object(a["b"])().then((function(e){var i=e.data.std,n=new Date,s=n.getMonth()+1+""+n.getDate();t.luckyList=i[s]}))},getLink:_["getLink"]},filters:{iconLink:_["iconLink"],cleanResourceText:function(t){return t&&t.startsWith("获取线索：")?t.replace("获取线索：",""):t}},created:function(){this.getPetLucky()},mounted:function(){this.getPetInfo()}},C=k,y=(i("d889"),Object(d["a"])(C,n,s,!1,null,null,null));e["default"]=y.exports},"25f0":function(t,e,i){"use strict";var n=i("e330"),s=i("5e77").PROPER,a=i("6eeb"),c=i("825a"),r=i("3a9b"),o=i("577e"),u=i("d039"),l=i("ad6d"),p="toString",d=RegExp.prototype,f=d[p],v=n(l),m=u((function(){return"/a/b"!=f.call({source:"a",flags:"b"})})),g=s&&f.name!=p;(m||g)&&a(RegExp.prototype,p,(function(){var t=c(this),e=o(t.source),i=t.flags,n=o(void 0===i&&r(d,t)&&!("flags"in d)?v(t):i);return"/"+e+"/"+n}),{unsafe:!0})},"2d4f":function(t,e,i){"use strict";i("ea20")},4649:function(t){t.exports=JSON.parse('[{"source":"","name":"所有途径"},{"source":5,"name":"世界奇遇"},{"source":6,"name":"积分回馈"},{"source":7,"name":"秘境奇遇"},{"source":8,"name":"门派特有"},{"source":9,"name":"游戏活动"},{"source":10,"name":"限时宠物"},{"source":11,"name":"运营活动"}]')},"466d":function(t,e,i){"use strict";var n=i("c65b"),s=i("d784"),a=i("825a"),c=i("50c4"),r=i("577e"),o=i("1d80"),u=i("dc4a"),l=i("8aa5"),p=i("14c3");s("match",(function(t,e,i){return[function(e){var i=o(this),s=void 0==e?void 0:u(e,t);return s?n(s,e,i):new RegExp(e)[t](r(i))},function(t){var n=a(this),s=r(t),o=i(e,n,s);if(o.done)return o.value;if(!n.global)return p(n,s);var u=n.unicode;n.lastIndex=0;var d,f=[],v=0;while(null!==(d=p(n,s))){var m=r(d[0]);f[v]=m,""===m&&(n.lastIndex=l(s,c(n.lastIndex),u)),v++}return 0===v?null:f}]}))},"4d63":function(t,e,i){var n=i("83ab"),s=i("da84"),a=i("e330"),c=i("94ca"),r=i("7156"),o=i("9112"),u=i("9bf2").f,l=i("241c").f,p=i("3a9b"),d=i("44e7"),f=i("577e"),v=i("ad6d"),m=i("9f7f"),g=i("6eeb"),h=i("d039"),_=i("1a2d"),b=i("69f3").enforce,k=i("2626"),C=i("b622"),y=i("fce3"),x=i("107c"),I=C("match"),w=s.RegExp,S=w.prototype,P=s.SyntaxError,O=a(v),j=a(S.exec),E=a("".charAt),R=a("".replace),T=a("".indexOf),L=a("".slice),D=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,W=/a/g,N=/a/g,A=new w(W)!==W,$=m.MISSED_STICKY,J=m.UNSUPPORTED_Y,B=n&&(!A||$||y||x||h((function(){return N[I]=!1,w(W)!=W||w(N)==N||"/a/i"!=w(W,"i")}))),M=function(t){for(var e,i=t.length,n=0,s="",a=!1;n<=i;n++)e=E(t,n),"\\"!==e?a||"."!==e?("["===e?a=!0:"]"===e&&(a=!1),s+=e):s+="[\\s\\S]":s+=e+E(t,++n);return s},F=function(t){for(var e,i=t.length,n=0,s="",a=[],c={},r=!1,o=!1,u=0,l="";n<=i;n++){if(e=E(t,n),"\\"===e)e+=E(t,++n);else if("]"===e)r=!1;else if(!r)switch(!0){case"["===e:r=!0;break;case"("===e:j(D,L(t,n+1))&&(n+=2,o=!0),s+=e,u++;continue;case">"===e&&o:if(""===l||_(c,l))throw new P("Invalid capture group name");c[l]=!0,a[a.length]=[l,u],o=!1,l="";continue}o?l+=e:s+=e}return[s,a]};if(c("RegExp",B)){for(var U=function(t,e){var i,n,s,a,c,u,l=p(S,this),v=d(t),m=void 0===e,g=[],h=t;if(!l&&v&&m&&t.constructor===U)return t;if((v||p(S,t))&&(t=t.source,m&&(e="flags"in h?h.flags:O(h))),t=void 0===t?"":f(t),e=void 0===e?"":f(e),h=t,y&&"dotAll"in W&&(n=!!e&&T(e,"s")>-1,n&&(e=R(e,/s/g,""))),i=e,$&&"sticky"in W&&(s=!!e&&T(e,"y")>-1,s&&J&&(e=R(e,/y/g,""))),x&&(a=F(t),t=a[0],g=a[1]),c=r(w(t,e),l?this:S,U),(n||s||g.length)&&(u=b(c),n&&(u.dotAll=!0,u.raw=U(M(t),i)),s&&(u.sticky=!0),g.length&&(u.groups=g)),t!==h)try{o(c,"source",""===h?"(?:)":h)}catch(_){}return c},Y=function(t){t in U||u(U,t,{configurable:!0,get:function(){return w[t]},set:function(e){w[t]=e}})},q=l(w),z=0;q.length>z;)Y(q[z++]);S.constructor=U,U.prototype=S,g(s,"RegExp",U)}k("RegExp")},"60f8":function(t){t.exports=JSON.parse('[{"class":"","type":0,"name":"所有种类"},{"class":1,"type":1,"name":"水族"},{"class":3,"type":2,"name":"走兽"},{"class":2,"type":3,"name":"禽鸟"},{"class":4,"type":4,"name":"机关"}]')},"9b7f":function(t,e,i){"use strict";i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return u})),i.d(e,"d",(function(){return l})),i.d(e,"b",(function(){return p}));var n=i("41cb"),s=i("65c2"),a=i("bc3a"),c=i.n(a),r=Object(n["e"])();function o(t){return r.get("/pets",{params:t})}function u(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"std";return r.get("/pet/".concat(t),{params:{client:e}})}function l(t){var e=t.item_type,i=t.item_id,n=t.client,s=void 0===n?"std":n;return r.get("/shop",{params:{client:s,itemType:e,itemId:i}})}function p(){return c.a.get(s["__iconPath"]+"pvx/pet/output/pet_lucky.json")}},c607:function(t,e,i){var n=i("da84"),s=i("83ab"),a=i("fce3"),c=i("c6b6"),r=i("9bf2").f,o=i("69f3").get,u=RegExp.prototype,l=n.TypeError;s&&a&&r(u,"dotAll",{configurable:!0,get:function(){if(this!==u){if("RegExp"===c(this))return!!o(this).dotAll;throw l("Incompatible receiver, RegExp required")}}})},d889:function(t,e,i){"use strict";i("dd66")},dd66:function(t,e,i){},ea20:function(t,e,i){}}]);
//# sourceMappingURL=chunk-6531e5e1.d8e54b32.js.map