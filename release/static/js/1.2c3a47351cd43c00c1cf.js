webpackJsonp([1],{"0FxO":function(t,e,n){"use strict";e.b=function(t,e){if(/^javas/.test(t)||!t)return;"object"===(void 0===t?"undefined":r()(t))||e&&"string"==typeof t&&!/http/.test(t)?"object"===(void 0===t?"undefined":r()(t))&&!0===t.replace?e.replace(t):"BACK"===t?e.go(-1):e.push(t):window.location.href=t},e.a=function(t,e){if(e&&!e._history&&"string"==typeof t&&!/http/.test(t))return"#!"+t;return t&&"object"!==(void 0===t?"undefined":r()(t))?t:"javascript:void(0);"};var i=n("pFYg"),r=n.n(i)},OQrC:function(t,e){},dVH7:function(t,e){},kgee:function(t,e){},piuB:function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"a",function(){return s});var i=n("0FxO"),r={mounted:function(){this.value>=0&&(this.currentIndex=this.value),this.updateIndex()},methods:{updateIndex:function(){if(this.$children&&this.$children.length){this.number=this.$children.length;for(var t=this.$children,e=0;e<t.length;e++)t[e].currentIndex=e,t[e].currentSelected&&(this.index=e)}}},props:{value:Number},watch:{currentIndex:function(t,e){e>-1&&this.$children[e]&&(this.$children[e].currentSelected=!1),t>-1&&this.$children[t]&&(this.$children[t].currentSelected=!0),this.$emit("input",t),this.$emit("on-index-change",t,e)},index:function(t){this.currentIndex=t},value:function(t){this.index=t}},data:function(){return{index:-1,currentIndex:this.index,number:this.$children.length}}},s={props:{selected:{type:Boolean,default:!1}},mounted:function(){this.$parent.updateIndex()},beforeDestroy:function(){var t=this.$parent;this.$nextTick(function(){t.updateIndex()})},methods:{onItemClick:function(t){var e=this;this.$parent.preventDefault?this.$parent.$emit("on-before-index-change",this.currentIndex):(void 0!==this.disabled&&!1!==this.disabled||(this.currentSelected=!0,this.$parent.currentIndex=this.currentIndex,this.$nextTick(function(){e.$emit("on-item-click",e.currentIndex)})),!0===t&&Object(i.b)(this.link,this.$router))}},watch:{currentSelected:function(t){t&&(this.$parent.index=this.currentIndex)},selected:function(t){this.currentSelected=t}},data:function(){return{currentIndex:-1,currentSelected:this.selected}}}},zRsm:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Dd8w"),r=n.n(i),s=n("piuB"),c=(s.b,String,{mounted:function(){},name:"tabbar",mixins:[s.b],props:{iconClass:String}}),a={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"weui-tabbar"},[this._t("default")],2)},staticRenderFns:[]};var o=n("VU/8")(c,a,!1,function(t){n("dVH7")},null,null).exports,u=(String,Number,{name:"badge",props:{text:[String,Number]}}),l={render:function(){var t=this.$createElement;return(this._self._c||t)("span",{class:["vux-badge",{"vux-badge-dot":void 0===this.text,"vux-badge-single":void 0!==this.text&&1===this.text.toString().length}],domProps:{textContent:this._s(this.text)}})},staticRenderFns:[]};var d=n("VU/8")(u,l,!1,function(t){n("kgee")},null,null).exports,h=(s.a,Boolean,String,String,Object,String,{name:"tabbar-item",components:{Badge:d},mounted:function(){this.$slots.icon||(this.simple=!0),this.$slots["icon-active"]&&(this.hasActiveIcon=!0)},mixins:[s.a],props:{showDot:{type:Boolean,default:!1},badge:String,link:[String,Object],iconClass:String},computed:{isActive:function(){return this.$parent.index===this.currentIndex}},data:function(){return{simple:!1,hasActiveIcon:!1}}}),p={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"weui-tabbar__item",class:{"weui-bar__item_on":t.isActive,"vux-tabbar-simple":t.simple},attrs:{href:"javascript:;"},on:{click:function(e){t.onItemClick(!0)}}},[t.simple?t._e():n("div",{staticClass:"weui-tabbar__icon",class:[t.iconClass||t.$parent.iconClass,{"vux-reddot":t.showDot}]},[t.simple||t.hasActiveIcon&&t.isActive?t._e():t._t("icon"),t._v(" "),!t.simple&&t.hasActiveIcon&&t.isActive?t._t("icon-active"):t._e(),t._v(" "),t.badge?n("sup",[n("badge",{attrs:{text:t.badge}})],1):t._e()],2),t._v(" "),n("p",{staticClass:"weui-tabbar__label"},[t._t("label")],2)])},staticRenderFns:[]},b=n("VU/8")(h,p,!1,null,null,null).exports,f=n("NYxO"),x=(r()({},Object(f.e)(["isHideTabbar"]),Object(f.c)(["role_type"]),{showTabbar:function(){return["/index","/finance","/supplier","/entrepreneur","/my"].includes(this.$route.path)},tabMenus:function(){return[{text:"首页",icon:"icon-home",link:"/index"},{text:"财务",icon:"icon-icon-",link:"/finance"},{text:"店铺",icon:"icon-mendianguanli",link:"/supplier"},"president"===this.role_type?{text:"创客",icon:"icon-dianpu",link:"/entrepreneur"}:{},{text:"我的",icon:"icon-wode",link:"/my"}]}}),{data:function(){return{currentRouter:0}},components:{Tabbar:o,TabbarItem:b},methods:{handleToggle:function(t){this.currentRouter=t}},computed:r()({},Object(f.e)(["isHideTabbar"]),Object(f.c)(["role_type"]),{showTabbar:function(){return["/index","/finance","/supplier","/entrepreneur","/my"].includes(this.$route.path)},tabMenus:function(){return[{text:"首页",icon:"icon-home",link:"/index"},{text:"财务",icon:"icon-icon-",link:"/finance"},{text:"店铺",icon:"icon-mendianguanli",link:"/supplier"},"president"===this.role_type?{text:"创客",icon:"icon-dianpu",link:"/entrepreneur"}:{},{text:"我的",icon:"icon-wode",link:"/my"}]}})}),m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tabbar",{directives:[{name:"show",rawName:"v-show",value:t.showTabbar,expression:"showTabbar"}],staticClass:"tabbarbox",staticStyle:{position:"fixed"}},t._l(t.tabMenus,function(e,i){return Object.keys(e).length?n("tabbar-item",{key:i,attrs:{selected:t.currentRouter==i,link:e.link}},[n("i",{class:["iconfont",e.icon],attrs:{slot:"icon"},slot:"icon"}),t._v(" "),n("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(e.text))])]):t._e()}))},staticRenderFns:[]};var v=n("VU/8")(x,m,!1,function(t){n("OQrC")},"data-v-18943bfa",null);e.default=v.exports}});