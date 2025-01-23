/*
 jQuery Cookie Plugin v1.4.1
 https://github.com/carhartl/jquery-cookie

 Copyright 2013 Klaus Hartl
 Released under the MIT license
*/
'use strict';(function(d){"function"===typeof define&&define.amd?define(["jquery"],d):"object"===typeof exports?d(require("jquery")):d(jQuery)})(function(d){function l(a,c){if(e.raw)var b=a;else a:{0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{a=decodeURIComponent(a.replace(m," "));b=e.json?JSON.parse(a):a;break a}catch(h){}b=void 0}return d.isFunction(c)?c(b):b}var m=/\+/g,e=d.cookie=function(a,c,b){if(void 0!==c&&!d.isFunction(c)){b=d.extend({},e.defaults,b);
if("number"===typeof b.expires){var h=b.expires,g=b.expires=new Date;g.setTime(+g+864E5*h)}a=e.raw?a:encodeURIComponent(a);c=e.json?JSON.stringify(c):String(c);c=e.raw?c:encodeURIComponent(c);return document.cookie=[a,"\x3d",c,b.expires?"; expires\x3d"+b.expires.toUTCString():"",b.path?"; path\x3d"+b.path:"",b.domain?"; domain\x3d"+b.domain:"",b.secure?"; secure":""].join("")}b=a?void 0:{};h=document.cookie?document.cookie.split("; "):[];g=0;for(var n=h.length;g<n;g++){var f=h[g].split("\x3d");var k=
f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("\x3d");if(a&&a===k){b=l(f,c);break}a||void 0===(f=l(f))||(b[k]=f)}return b};e.defaults={};d.removeCookie=function(a,c){if(void 0===d.cookie(a))return!1;d.cookie(a,"",d.extend({},c,{expires:-1}));return!d.cookie(a)}});