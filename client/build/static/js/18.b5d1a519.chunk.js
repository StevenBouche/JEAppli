(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1227:function(e,t,n){"use strict";n.r(t);var a=n(888),r=n.n(a),c=n(889),o=n(930),s=n(227),u=n(228),i=n(230),l=n(229),p=n(231),f=n(3),h=n.n(f),m=n(938),d=n(939),w=n(940),v=n(1015),b=n(1016),y=n(1017),g=n(941),x=n(942),E=n(909),k=n(943),j=n(915),S=n(86),C=n(908),O=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,u=new Array(a),p=0;p<a;p++)u[p]=arguments[p];return(n=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(u)))).state={values:{name:"",email:"",password:"",passwordrepeat:""},touched:{name:!1,email:!1,password:!1,passwordrepeat:!1},errors:{name:null,email:null,password:null,passwordrepeat:null},isValid:!1,isLoading:!1,submitError:null,showSignInError:null},n.handleFieldChange=function(e,t){var a=Object(o.a)({},n.state);a.submitError=null,a.touched[e]=!0,a.values[e]=t,n.setState(a,n.validateForm)},n.handleSignUp=Object(c.a)(r.a.mark(function e(){var t,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=n.props.history,a=n.state.values,e.next=5,C.a.register(a.name,a.email,a.password);case 5:t.push("/"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),n.setState({isLoading:!1,serviceError:e.t0});case 11:case"end":return e.stop()}},e,null,[[0,8]])})),n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return h.a.createElement("div",{className:"app flex-row align-items-center"},h.a.createElement(m.a,null,h.a.createElement(d.a,{className:"justify-content-center"},h.a.createElement(w.a,{md:"9",lg:"7",xl:"6"},h.a.createElement(v.a,{className:"mx-4"},h.a.createElement(b.a,{className:"p-4"},h.a.createElement(y.a,null,h.a.createElement("h1",null,"Register"),h.a.createElement("p",{className:"text-muted"},"Create your account"),h.a.createElement(g.a,{className:"mb-3"},h.a.createElement(x.a,{addonType:"prepend"},h.a.createElement(E.a,null,h.a.createElement("i",{className:"icon-user"}))),h.a.createElement(k.a,{type:"text",onChange:function(t){return e.handleFieldChange("name",t.target.value)},placeholder:"Username",autoComplete:"username"})),h.a.createElement(g.a,{className:"mb-3"},h.a.createElement(x.a,{addonType:"prepend"},h.a.createElement(E.a,null,"@")),h.a.createElement(k.a,{onChange:function(t){return e.handleFieldChange("email",t.target.value)},type:"text",placeholder:"Email",autoComplete:"email"})),h.a.createElement(g.a,{className:"mb-3"},h.a.createElement(x.a,{addonType:"prepend"},h.a.createElement(E.a,null,h.a.createElement("i",{className:"icon-lock"}))),h.a.createElement(k.a,{onChange:function(t){return e.handleFieldChange("password",t.target.value)},type:"password",placeholder:"Password",autoComplete:"new-password"})),h.a.createElement(j.a,{onClick:this.handleSignUp,color:"success",block:!0},"Create Account"))))))))}}]),t}(f.Component);t.default=Object(S.o)(O)},895:function(e,t,n){"use strict";(function(e){var a=n(918),r=n.n(a),c=n(907),o={encrypt:function(t,n){var a=r.a.randomBytes(16),c=r.a.randomBytes(64),o=r.a.pbkdf2Sync(t,c,2145,32,"sha512"),s=r.a.createCipheriv("aes-256-cbc",o,a),u=s.update(n);return u=e.concat([u,s.final()]),a.toString("hex")+":"+c.toString("hex")+":"+u.toString("hex")},decrypt:function(t,n){var a=n.toString().split(":"),c=e.from(a.shift(),"hex"),o=e.from(a.shift(),"hex"),s=r.a.pbkdf2Sync(t,o,2145,32,"sha512"),u=e.from(a.join(":"),"hex"),i=r.a.createDecipheriv("aes-256-cbc",s,c),l=i.update(u);return(l=e.concat([l,i.final()])).toString()},cryptWithKey:function(t){var n=r.a.randomBytes(16),a=r.a.randomBytes(64),o=r.a.pbkdf2Sync(c.a,a,2145,32,"sha512"),s=r.a.createCipheriv("aes-256-cbc",o,n),u=s.update(t);return u=e.concat([u,s.final()]),n.toString("hex")+":"+a.toString("hex")+":"+u.toString("hex")},decryptWithKey:function(t){var n=t.toString().split(":"),a=e.from(n.shift(),"hex"),o=e.from(n.shift(),"hex"),s=r.a.pbkdf2Sync(c.a,o,2145,32,"sha512"),u=e.from(n.join(":"),"hex"),i=r.a.createDecipheriv("aes-256-cbc",s,a),l=i.update(u);return(l=e.concat([l,i.final()])).toString()}};t.a=o}).call(this,n(893).Buffer)},903:function(e,t,n){"use strict";var a=n(888),r=n.n(a),c=n(889),o=n(917),s=n.n(o),u=n(906),i=n(895),l="https://appJe.stevenbouche.com:8080/api",p={};function f(){return{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+function(){var e=(new u.a).get("jwt_token");if(e)return i.a.decrypt("5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)",e)}()}}p.get=function(){var e=Object(c.a)(r.a.mark(function e(t,n){var a,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a={}).method="GET",a.headers=f(),e.next=5,fetch(l+""+t+n,a);case 5:if((c=e.sent).ok){e.next=10;break}throw new Error("request error"+c);case 10:return e.next=12,c.json();case 12:return e.abrupt("return",e.sent);case 13:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),p.post=function(){var e=Object(c.a)(r.a.mark(function e(t,n){var a,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a={}).method="POST",a.headers=f(),a.body=JSON.stringify(n),e.next=6,fetch(l+""+t,a);case 6:if((c=e.sent).ok){e.next=11;break}throw new Error("request error"+c);case 11:return e.abrupt("return",c);case 12:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),p.put=function(){var e=Object(c.a)(r.a.mark(function e(t,n){var a,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a={}).method="PUT",a.headers=f(),a.body=JSON.stringify(n),e.next=6,fetch(l+""+t,a);case 6:if((c=e.sent).ok){e.next=11;break}throw new Error("request error"+c);case 11:return e.abrupt("return",c);case 12:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),p.delete=function(e,t){s.a.delete(l+""+e,t).then(function(e){return e}).catch(function(e){return e})},t.a=p},907:function(e,t,n){"use strict";t.a="5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)"},908:function(e,t,n){"use strict";var a=n(888),r=n.n(a),c=n(889),o=n(903),s=n(906),u=n(895),i={};function l(e){var t=u.a.encrypt("5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)",e);(new s.a).set("jwt_token",t,{path:"/"})}i.isLogin=function(){return!!function(){var e=(new s.a).get("jwt_token");if(e)return u.a.decrypt("5v8y/B?E(H+MbQeThVmYq3t6w9z$C&F)",e)}()},i.login=function(){var e=Object(c.a)(r.a.mark(function e(t,n){var a,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={email:t,password:n},e.next=3,o.a.post("/user/login",a);case 3:return c=e.sent,e.next=6,c.json();case 6:if((c=e.sent).token){e.next=9;break}throw new Error("Token null");case 9:l(c.token);case 10:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),i.logout=Object(c.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.post("/user/logout",{});case 2:e.sent.ok&&(new s.a).remove("jwt_token",{path:"/"});case 4:case"end":return e.stop()}},e)})),i.register=function(){var e=Object(c.a)(r.a.mark(function e(t,n,a){var c,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return c={name:t,email:n,password:a},e.next=3,o.a.post("/user",c);case 3:return s=e.sent,e.next=6,s.json();case 6:if((s=e.sent).token){e.next=9;break}throw new Error("Token null");case 9:l(s.token);case 10:case"end":return e.stop()}},e)}));return function(t,n,a){return e.apply(this,arguments)}}(),t.a=i},921:function(e,t){},922:function(e,t){},924:function(e,t){},925:function(e,t){}}]);
//# sourceMappingURL=18.b5d1a519.chunk.js.map