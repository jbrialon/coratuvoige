webpackJsonp([2,0],{0:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var s=i(19),r=a(s),n=i(53),d=a(n);r.default.config.ignoredElements=["dd"],new r.default({el:"#app",template:"<App/>",components:{App:d.default}})},21:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.dbRidesRef=t.dbDriversRef=t.dbConfigRef=t.firebaseDB=t.firebaseApp=void 0;var s=i(19),r=a(s),n=i(56),d=a(n),c=i(26),o=a(c);r.default.use(d.default);var l=t.firebaseApp=o.default.initializeApp({apiKey:"AIzaSyBJrsysCANrrrvvaZsHQ5JCVFtuefmwgiw",authDomain:"coratuvoige.firebaseapp.com",databaseURL:"https://coratuvoige.firebaseio.com",storageBucket:"coratuvoige.appspot.com",messagingSenderId:"420022212127"});t.firebaseDB=l.database(),t.dbConfigRef=l.database().ref("/config"),t.dbDriversRef=l.database().ref("/drivers"),t.dbRidesRef=l.database().ref("/rides")},22:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0});var r=i(21),n=s(r),d=i(51),c=a(d),o=i(50),l=a(o);t.default={name:"app",data:function(){return{newRide:{driver:"",checkbox:{},date:""}}},computed:{canSubmit:function(){return""!==this.newRide.driver&&!(0,l.default)(this.newRide.checkbox)&&""!==this.newRide.date}},methods:{add:function(){var e={driver:this.newRide.driver,passengers:(0,c.default)(this.newRide.checkbox),date:this.newRide.date};this.canSubmit&&n.dbRidesRef.push(e)},getDriverPerId:function(e){return void 0!==e?this.drivers[".value"][e].name:""}},firebase:{config:{source:n.dbConfigRef,asObject:!0},drivers:{source:n.dbDriversRef,asObject:!0},rides:{source:n.dbRidesRef,asObject:!0}}}},23:function(e,t){},53:function(e,t,i){i(23);var a=i(54)(i(22),i(55),null,null);e.exports=a.exports},55:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container",attrs:{id:"app"}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col.m6.offset-m3.s12"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col s12 align-center center-align"},[i("h1",[e._v("\n            "+e._s(e.config.name)+"\n          ")])])])])]),e._v(" "),i("div",{staticClass:"row"},[i("div",{staticClass:"col m8 offset-m2 s12"},[i("div",{staticClass:"row"},[e._m(0),e._v(" "),i("div",{staticClass:"input-field col m6 s12"},[i("select",{directives:[{name:"model",rawName:"v-model",value:e.newRide.driver,expression:"newRide.driver"}],on:{change:function(t){e.newRide.driver=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t})[0]}}},e._l(e.drivers[".value"],function(t){return i("option",{attrs:{disabled:0===t.candrive},domProps:{value:t.id}},[e._v(e._s(t.name))])}))])]),e._v(" "),i("div",{staticClass:"row"},e._l(e.drivers[".value"],function(t){return i("div",{staticClass:"input-field col m2"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.newRide.checkbox[t.id],expression:"newRide.checkbox[driver.id]"}],staticClass:"filled-in",attrs:{type:"checkbox",id:t.name},domProps:{checked:Array.isArray(e.newRide.checkbox[t.id])?e._i(e.newRide.checkbox[t.id],null)>-1:e.newRide.checkbox[t.id]},on:{click:function(i){var a=e.newRide.checkbox[t.id],s=i.target,r=!!s.checked;if(Array.isArray(a)){var n=null,d=e._i(a,n);r?d<0&&(e.newRide.checkbox[t.id]=a.concat(n)):d>-1&&(e.newRide.checkbox[t.id]=a.slice(0,d).concat(a.slice(d+1)))}else e.newRide.checkbox[t.id]=r}}}),e._v(" "),i("label",{attrs:{for:t.name}},[e._v(e._s(t.name))])])})),e._v(" "),i("div",{staticClass:"row"},[i("div",{staticClass:"input-field col m6 s12"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.newRide.date,expression:"newRide.date"}],attrs:{placeholder:"date",id:"first_name",type:"date"},domProps:{value:e._s(e.newRide.date)},on:{input:function(t){t.target.composing||(e.newRide.date=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"col m6 s12"},[i("a",{staticClass:"btn-floating btn-large waves-effect waves-light red",class:{disabled:!e.canSubmit},on:{click:function(t){e.add()}}},[i("i",{staticClass:"material-icons"},[e._v("add")])])])]),e._v(" "),i("table",{staticClass:"striped responsive-table"},[e._m(1),e._v(" "),i("tbody",e._l(e.rides,function(t){return i("tr",[i("td",[e._v("\n              "+e._s(e.getDriverPerId(t.driver))+"\n            ")]),e._v(" "),i("td",e._l(t.passengers,function(t){return i("span",[e._v(" "+e._s(e.getDriverPerId(t))+" ")])})),e._v(" "),i("td",[e._v("\n              "+e._s(t.date)+"\n            ")]),e._v(" "),i("td")])}))])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"input-field col m6 s12"},[i("label",{attrs:{for:"first_name"}},[e._v("Driver: ")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("thead",[i("tr",[i("th",{attrs:{"data-field":"driver"}},[e._v("\n              Driver\n            ")]),e._v(" "),i("th",{attrs:{"data-field":"passengers"}},[e._v("\n              Passengers\n            ")]),e._v(" "),i("th",{attrs:{"data-field":"date"}},[e._v("\n              Date\n            ")]),e._v(" "),i("th",{attrs:{"data-field":"action"}},[e._v("\n              Action\n            ")])])])}]}}});
//# sourceMappingURL=app.js.map