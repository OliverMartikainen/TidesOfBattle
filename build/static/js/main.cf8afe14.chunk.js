(this.webpackJsonptidesofbattle_front=this.webpackJsonptidesofbattle_front||[]).push([[0],{43:function(e,r,t){},68:function(e,r,t){},69:function(e,r,t){"use strict";t.r(r);var n,a=t(0),c=t.n(a),s=t(35),o=t.n(s),u=(t(43),t(18)),i=t(3),d=t.n(i),l=t(5),p=t(15),f=t(14),O=t(6),b=t.p+"static/media/one_sword_lite.4871870e.jpg",j=t.p+"static/media/one_tower_lite.5422d4d2.jpg",v=t.p+"static/media/zero_lite.09307b16.jpg",w=t.p+"static/media/zero_skull_lite.3d9aee36.jpg",h=t.p+"static/media/two_lite.e588a68b.jpg",m=t.p+"static/media/three_lite.0750c14f.jpg",x=t.p+"static/media/backside_lite.24c30a04.jpg",g=t(2),S={zero:v,zero_skull:w,one_sword:b,one_tower:j,two:h,three:m},k=function(e){var r=e.card,t=e.username,n=e.handleSelect,a=e.className,c=void 0===a?"tidecard-wrap":a,s=r.cardName,o=r.cardOwner,u=r.cardIndex,i=S[s]||x,d=s||"unknown",l={backgroundColor:o?o===t?"red":"cyan":null};return Object(g.jsxs)("div",{className:c,style:l,onDoubleClick:function(){return n(u)},children:[Object(g.jsx)("img",{className:"tidecard",src:i,alt:d}),"CardOwner: ",o]})},C=t(91),E=t(95),y=t(94),N=t(93),R=Object(C.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120}}})),U=function(e){var r=e.value,t=e.valueOptions,n=e.label,a=e.handleChange,c=e.disabled,s=void 0!==c&&c,o=R(),u=t.map((function(e){return Object(g.jsx)("option",{value:e,children:e},e)})),i=n.toLowerCase(),d="".concat(i,"-native-label-placeholder");return Object(g.jsx)("div",{children:Object(g.jsxs)(y.a,{className:o.formControl,children:[Object(g.jsx)(E.a,{shrink:!0,htmlFor:d,children:n}),Object(g.jsxs)(N.a,{disabled:s,value:r,onChange:function(e){return a(e.target.value)},inputProps:{name:i,id:d},children:[Object(g.jsx)("option",{value:"",children:"None"}),u]})]})})},D=t(13),I=t.n(D),_=function(e){n=e?"bearer ".concat(e):null},A=function(){return{headers:{Authorization:n}}},F=_;console.log("production","http://localhost:3001/api");var T="./api",L="".concat(T,"/cards"),B=function(){var e=Object(l.a)(d.a.mark((function e(r){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=A(),e.next=4,I.a.post("".concat(L,"/select"),{cardIndex:r},t);case 4:return n=e.sent,a=n.data,e.abrupt("return",a);case 9:return e.prev=9,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",null);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(r){return e.apply(this,arguments)}}(),G={cardsSSE:function(){try{return new EventSource("".concat(L,"/sse"))}catch(e){console.error(e)}},forceEnd:function(){var e=Object(l.a)(d.a.mark((function e(){var r,t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=A(),e.next=4,I.a.get("".concat(L,"/forceEnd"),r);case 4:return t=e.sent,e.abrupt("return",204===t.status);case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),nosword:function(){var e=Object(l.a)(d.a.mark((function e(){var r,t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=A(),e.next=4,I.a.get("".concat(L,"/nosword"),r);case 4:return t=e.sent,e.abrupt("return",204===t.status);case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),select:B,initialLoad:function(){var e=Object(l.a)(d.a.mark((function e(){var r,t,n,a,c,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=A(),e.next=4,I.a.get("".concat(L,"/initialLoad"),r);case 4:return t=e.sent,n=t.data,a=n.selectedCards,c=a.ownCards,s=a.othersCards,e.abrupt("return",{swordOwner:n.swordOwner,ownCards:c,othersCards:s});case 10:return e.prev=10,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}()},z="".concat(T,"/users"),M={login:function(){var e=Object(l.a)(d.a.mark((function e(r){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=A(),e.next=4,I.a.post("".concat(z,"/login"),{username:r},t);case 4:if(n=e.sent,a=n.data.token){e.next=9;break}return console.error(n),e.abrupt("return",null);case 9:return _(a),e.abrupt("return",a);case 13:return e.prev=13,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",null);case 17:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(r){return e.apply(this,arguments)}}(),usernames:function(){var e=Object(l.a)(d.a.mark((function e(){var r,t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=A(),e.next=4,I.a.get("".concat(z,"/usernames"),r);case 4:return t=e.sent,e.abrupt("return",t.data||[]);case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",["FAILED TO GET USERNAMES - REFRESH PAGE"]);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),stats:function(){var e=Object(l.a)(d.a.mark((function e(){var r,t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=A(),e.next=4,I.a.get("".concat(z,"/stats"),r);case 4:return t=e.sent,e.abrupt("return",t);case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),changeSwordUser:function(){var e=Object(l.a)(d.a.mark((function e(r){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=A(),e.next=4,I.a.post("".concat(z,"/changeSwordUser"),{newSwordUser:r},t);case 4:return n=e.sent,e.abrupt("return",204===n.status);case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(r){return e.apply(this,arguments)}}(),addUser:function(){var e=Object(l.a)(d.a.mark((function e(r){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=A(),e.next=4,I.a.post("".concat(z,"/add"),{username:r},t);case 4:return n=e.sent,e.abrupt("return",204===n.status);case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(r){return e.apply(this,arguments)}}()},W=function e(r){var t=G.cardsSSE();return t.onopen=function(){console.log("CARD SUB ACTIVE")},t.onerror=function(){console.error("CARD SUB ERROR"),t.close(),setTimeout((function(){return e(r)}),1e4)},t.onmessage=function(e){console.log("CSUB MSG"),function(e,r){try{var t=JSON.parse(e);switch(t.msg){case"end":return r((function(e){var r=t.cards,n=e.username,a=r.filter((function(e){return""!==e.cardOwner&&e.cardOwner!==n}));return Object(O.a)(Object(O.a)({},e),{},{waitingForSword:"",endState:{cards:r,othersCards:a,ownCards:e.ownCards,selectOrder:Object(O.a)({},e.selectOrder)},cards:H(),othersCards:[],ownCards:[],selectOrder:{}})})),void console.log("ROUND END");case"nosword":return void console.log(t.username,"NOSWORD");case"select":return console.log("select"),void r((function(e){var r=t.cardIndex,n=t.cardOwner;e.cards[r].cardOwner=n,e.selectOrder[n]||(e.selectOrder[n]=[]);var a=[].concat(Object(f.a)(e.selectOrder[n]),[r]),c=Object(O.a)(Object(O.a)({},e.selectOrder),{},Object(p.a)({},n,a));return Object(O.a)(Object(O.a)({},e),{},{selectOrder:c})}));case"forceEnd":return console.log(t.username,"FORCE END"),void r((function(e){return Object(O.a)(Object(O.a)({},e),{},{waitingForSword:"",endState:null,cards:H(),othersCards:[],ownCards:[],selectOrder:{}})}));case"too-many-users":return void console.log("TOO MANY USER SELECTED CARDS",t.usernames);case"waiting-sword":return void r((function(e){return Object(O.a)(Object(O.a)({},e),{},{waitingForSword:t.username})}));case"sword-change":return console.log(t.doneBy,"SWORD USER CHANGED TO",t.username),void r((function(e){return Object(O.a)(Object(O.a)({},e),{},{swordOwner:t.username})}));default:console.error("UNDEFINED SSE MSG",t)}}catch(n){console.error(n,e)}}(e.data,r)},t},K=function(e){var r=e.cardStates,t=r.swordOwner===r.username,n=function(){var e=Object(l.a)(d.a.mark((function e(n){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((a=n)!==r.swordOwner&&t){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,M.changeSwordUser(a);case 5:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return Object(g.jsx)(U,{value:r.swordOwner,valueOptions:r.usernameOptions,handleChange:n,label:"SwordOwner",disabled:!t})},H=function(){for(var e=[],r=0;r<24;r++)e.push({cardName:"",cardOwner:"",cardIndex:r});return e},J=function(e){var r=e.username,t=e.usernameOptions,n=e.logout,c=Object(a.useState)((function(){return function(e,r){return{cards:H(),ownCards:[],othersCards:[],waitingForSword:"",swordOwner:"",usernameOptions:r,username:e,selectOrder:{},endState:null}}(r,t)})),s=Object(u.a)(c,2),o=s[0],i=s[1],p=!!o.endState,b=o.endState?o.endState:o,j=b.cards,v=b.ownCards,w=b.othersCards;Object(a.useEffect)((function(){(function(){var e=Object(l.a)(d.a.mark((function e(){var r,t,n,a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G.initialLoad();case 2:r=e.sent,t=r.swordOwner,n=r.ownCards,a=r.othersCards,c=[].concat(Object(f.a)(n),Object(f.a)(a)),i((function(e){var r=e.cards;return c.forEach((function(e){var t=e.cardOwner,n=e.cardIndex;r[n].cardOwner=t})),Object(O.a)(Object(O.a)({},e),{},{cards:r,swordOwner:t,ownCards:n,othersCards:a})}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()();var e=W(i);return function(){return e.close()}}),[]);var h=function(){var e=Object(l.a)(d.a.mark((function e(r){var t,n,a,c,s,u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!p){e.next=2;break}return e.abrupt("return");case 2:if(t=o.username,n=o.swordOwner,a=o.cards,""===a[r].cardOwner){e.next=6;break}return e.abrupt("return");case 6:if(c=a.filter((function(e){return""!==e.cardOwner})),s=c.filter((function(e){return e.cardOwner===t})),1!==c.length||1!==s.length){e.next=10;break}return e.abrupt("return");case 10:if(2!==c.length||1===s.length&&n===t){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,G.select(r);case 14:if(u=e.sent){e.next=17;break}return e.abrupt("return");case 17:i((function(e){return Object(O.a)(Object(O.a)({},e),{},{ownCards:[].concat(Object(f.a)(e.ownCards),[u])})}));case 18:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),m=function(){var e=Object(l.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!p){e.next=2;break}return e.abrupt("return");case 2:if(o.swordOwner===r){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,G.nosword();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(l.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!p){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,G.forceEnd();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=j.map((function(e){return Object(g.jsx)(k,{username:r,card:e,handleSelect:h},e.cardIndex)})),C=Object.keys(w.reduce((function(e,r){return e[r.cardOwner]=r.cardOwner,e}),{})).reduce((function(e,r){var t,n=w.filter((function(e){return e.cardOwner===r})),a=Object(f.a)(n),c=null===o||void 0===o||null===(t=o.endState)||void 0===t?void 0:t.selectOrder[r],s=c&&c.length===n.length;return s?a=c.map((function(e){return n.find((function(r){return r.cardIndex===e}))})):console.log("ORDER NOT KNOWN",r),e[r]={cards:a,orderKnown:s,playerName:r},e}),{}),E=v.map((function(e){return Object(g.jsx)(k,{username:r,card:e,handleSelect:null,className:"tidecard-small"},e.cardIndex)})),y=Object.values(C).map((function(e){var t=e.cards.map((function(e){return Object(g.jsx)(k,{username:r,card:e,handleSelect:null,className:"tidecard-small"},e.cardIndex)}));return Object(g.jsxs)("div",{style:{borderRight:"3px solid black",paddingRight:3},children:[Object(g.jsx)("div",{className:"player-cards-holder",children:t},e.playerName),"OrderKnwon: ",e.orderKnown+""]},e.playerName)})),N=o.swordOwner===r,R=!1;if(N){var U=o.cards.filter((function(e){return""!==e.cardOwner})),D=U.filter((function(e){return e.cardOwner===r}));2===U.length&&1===D.length&&(R=!0)}return Object(g.jsxs)("div",{children:[Object(g.jsxs)("div",{style:{display:"flex"},children:[Object(g.jsxs)("button",{onClick:function(){return n()},children:["Logout - ",r]}),Object(g.jsx)(K,{cardStates:o}),Object(g.jsx)("button",{disabled:!o.endState,onClick:function(){i((function(e){return Object(O.a)(Object(O.a)({},e),{},{endState:null})}))},children:"REFRESH"})]}),Object(g.jsxs)("div",{style:{display:"grid"},children:[Object(g.jsx)("div",{className:"player-cards-holder",children:S}),N&&Object(g.jsx)("button",{disabled:!R,onClick:m,children:"DONT USE SWORD"}),Object(g.jsx)("div",{children:Object(g.jsxs)("div",{className:"player-cards-holder",children:[E,Object(g.jsx)("div",{className:"divider"}),y]})}),Object(g.jsx)("div",{style:{height:55}}),N&&Object(g.jsx)("button",{onClick:x,disabled:p,children:"FORCE RESET - FOR BUGS ONLY"})]})]})},P=(t(68),function(e,r){localStorage.setItem("Username",e),localStorage.setItem("Token",r)}),Y=function(e){var r=e.username,t=e.setUsername,n=e.usernameOptions,a=function(){var e=Object(l.a)(d.a.mark((function e(r){var n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((n=r)&&"None"!==n){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,M.login(n);case 5:if(a=e.sent){e.next=9;break}return console.log("login failed"),e.abrupt("return");case 9:P(n,a),t(n);case 11:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return Object(g.jsx)(U,{value:r,valueOptions:n,handleChange:a,label:"Username"})},V=function(){var e=Object(a.useState)((function(){return function(){var e=localStorage.getItem("Username"),r=localStorage.getItem("Token");return e&&r?(F(r),e):""}()})),r=Object(u.a)(e,2),t=r[0],n=r[1],c=Object(a.useState)([]),s=Object(u.a)(c,2),o=s[0],i=s[1];if(Object(a.useEffect)((function(){(function(){var e=Object(l.a)(d.a.mark((function e(){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.usernames();case 2:r=e.sent,i(r);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),!t)return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(Y,{username:t,setUsername:n,usernameOptions:o})});return Object(g.jsx)("div",{className:"App",children:o.length>0?Object(g.jsx)(J,{logout:function(){localStorage.clear(),n("")},username:t,usernameOptions:o}):"Loading..."})};o.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(V,{})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.cf8afe14.chunk.js.map