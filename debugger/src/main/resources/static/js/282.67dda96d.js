"use strict";(self["webpackChunkdebug_frontend"]=self["webpackChunkdebug_frontend"]||[]).push([[282],{4507:function(t,e,n){n.d(e,{A5:function(){return r},Pu:function(){return o},RU:function(){return d},UK:function(){return i},h8:function(){return u},pu:function(){return l},rK:function(){return s}});var a=n(3326);function u(t){return(0,a.Z)({url:"/data/version/"+t,method:"get"})}function r(){return(0,a.Z)({url:"/data/existtarget",method:"get"})}function o(t){return(0,a.Z)({url:"/data/exist/"+t,method:"get"})}function l(t){return(0,a.Z)({url:"/data/"+t,method:"get"})}function i(){return(0,a.Z)({url:"/data/export/all",method:"get",responseType:"blob"})}function s(){return(0,a.Z)({url:"/data/modify/spring",method:"get"})}function d(){return(0,a.Z)({url:"/data/modify/spring/prefix",method:"get"})}},6282:function(t,e,n){n.r(e),n.d(e,{default:function(){return m}});var a=n(8997),u=n(1165);const r={key:0},o=(0,a.Uk)(" count: ");function l(t,e,n,l,i,s){const d=(0,a.up)("el-header"),c=(0,a.up)("el-table-column"),h=(0,a.up)("el-table"),m=(0,a.up)("el-main"),f=(0,a.up)("el-tag"),p=(0,a.up)("el-footer"),g=(0,a.up)("el-container");return i.exist?((0,a.wg)(),(0,a.iD)("div",r,[(0,a.Wm)(g,null,{default:(0,a.w5)((()=>[(0,a.Wm)(d,null,{default:(0,a.w5)((()=>[(0,a._)("h2",null,"Version: "+(0,u.zw)(i.version),1)])),_:1}),(0,a.Wm)(m,null,{default:(0,a.w5)((()=>[(0,a.Wm)(h,{data:i.tableData,style:{width:"100%"},height:"400"},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{prop:"api",label:"接口",width:"300"}),(0,a.Wm)(c,{prop:"name",label:"映射类",width:"600"})])),_:1},8,["data"])])),_:1}),(0,a.Wm)(p,null,{default:(0,a.w5)((()=>[o,(0,a.Wm)(f,{type:"info"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,u.zw)(i.count),1)])),_:1})])),_:1})])),_:1})])):(0,a.kq)("",!0)}var i=n(4507),s=n(7066),d={setup(){},name:"Tomcat",data(){return{tableData:[],version:"",exist:!1,count:0}},async created(){await(0,i.Pu)("tomcat").then((t=>{t.data.msg?this.exist=!0:((0,s.v)("路由","Tomcat路由获取失败","error"),this.$router.push("/main"),this.exist=!1)})),this.exist&&((0,i.pu)("tomcat").then((t=>{let e=Object.keys(t.data.msg);this.count=e.length;let n=[];for(let a=0;a<e.length;a++){let u=new Object;u.api=e[a],u.name=t.data.msg[e[a]],n.push(u)}this.tableData=n})),(0,i.h8)("tomcat").then((t=>{this.version=t.data.msg})))},mounted(){const t=setInterval((()=>{(0,i.pu)("tomcat").then((t=>{let e=Object.keys(t.data.msg);this.count=e.length;let n=[];for(let a=0;a<e.length;a++){let u=new Object;u.api=e[a],u.name=t.data.msg[e[a]],n.push(u)}this.tableData=n}))}),1e3);(0,a.Jd)((()=>{clearInterval(t),console.log(111)}))}},c=n(6150);const h=(0,c.Z)(d,[["render",l]]);var m=h}}]);
//# sourceMappingURL=282.67dda96d.js.map