(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(12),a=n.n(r),c=n(1),o=n.n(c),u=n(2),i=n(13),l=n.n(i),d=function(){return l.a.get("https://tides-of-battle-lite.herokuapp.com/cards").then(function(e){return e.data})},f=(n(37),function(e){var t=e.card;return t?o.a.createElement("img",{source:t.path,heigth:"200",width:"200"}):o.a.createElement("p",null,"Shit")}),s=function(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(),i=Object(u.a)(a,2),l=i[0],s=i[1];Object(c.useEffect)(function(){d().then(function(e){r(e)})},[]);return o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){var e=function(){var e=Math.round(24*Math.random());return e<9?"zero":e<11?"zero_skull":e<15?"one_sword":e<19?"one_tower":e<23?"two":"three"}();s(n.find(function(t){return t.id===e}))}()},"Draw Card"),o.a.createElement(f,{card:l}),o.a.createElement("h3",null,"Add a new"))};a.a.render(o.a.createElement(s,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.1b0adb3a.chunk.js.map