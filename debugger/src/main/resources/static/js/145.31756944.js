"use strict";(self["webpackChunkdebug_frontend"]=self["webpackChunkdebug_frontend"]||[]).push([[145],{4507:function(t,e,n){n.d(e,{A5:function(){return r},Pu:function(){return l},UK:function(){return o},h8:function(){return u},pu:function(){return s}});var a=n(3326);function u(t){return(0,a.Z)({url:"/data/version/"+t,method:"get"})}function r(){return(0,a.Z)({url:"/data/existtarget",method:"get"})}function l(t){return(0,a.Z)({url:"/data/exist/"+t,method:"get"})}function s(t){return(0,a.Z)({url:"/data/"+t,method:"get"})}function o(){return(0,a.Z)({url:"/data/export/all",method:"get",responseType:"blob"})}},4145:function(t,e,n){n.r(e),n.d(e,{default:function(){return f}});var a=n(8997),u=n(1165);const r={key:0},l=(0,a.Uk)(" count: ");function s(t,e,n,s,o,i){const d=(0,a.up)("el-table-column"),c=(0,a.up)("el-table"),h=(0,a.up)("el-main"),f=(0,a.up)("el-tag"),m=(0,a.up)("el-footer"),p=(0,a.up)("el-container");return o.exist?((0,a.wg)(),(0,a.iD)("div",r,[(0,a.Wm)(p,null,{default:(0,a.w5)((()=>[(0,a.Wm)(h,null,{default:(0,a.w5)((()=>[(0,a.Wm)(c,{data:o.tableData,style:{width:"100%"},height:"400"},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{prop:"api",label:"接口",width:"300"}),(0,a.Wm)(d,{prop:"name",label:"映射类",width:"600"})])),_:1},8,["data"])])),_:1}),(0,a.Wm)(m,null,{default:(0,a.w5)((()=>[l,(0,a.Wm)(f,{type:"info"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,u.zw)(o.count),1)])),_:1})])),_:1})])),_:1})])):(0,a.kq)("",!0)}var o=n(4507),i=n(7066),d={name:"Struts",data(){return{tableData:[],exist:!1,count:0,moduleName:""}},async created(){await(0,o.Pu)("struts").then((t=>{t.data.msg?this.exist=!0:((0,i.v)("路由","Struts路由获取失败","error"),this.$router.push("/main"),this.exist=!1)})),this.exist&&(0,o.pu)("struts").then((t=>{let e=Object.keys(t.data.msg);this.count=e.length;let n=[];for(let a=0;a<e.length;a++){let u=new Object;u.api=e[a],u.name=t.data.msg[e[a]],n.push(u)}this.tableData=n}))},mounted(){const t=setInterval((()=>{(0,o.pu)("struts").then((t=>{let e=Object.keys(t.data.msg);this.count=e.length;let n=[];for(let a=0;a<e.length;a++){let u=new Object;u.api=e[a],u.name=t.data.msg[e[a]],n.push(u)}this.tableData=n}))}),1e3);(0,a.Jd)((()=>{clearInterval(t)}))}},c=n(6150);const h=(0,c.Z)(d,[["render",s]]);var f=h}}]);
//# sourceMappingURL=145.31756944.js.map