"use strict";(self["webpackChunkdebug_frontend"]=self["webpackChunkdebug_frontend"]||[]).push([[81],{4507:function(t,e,n){n.d(e,{A5:function(){return u},NV:function(){return d},Pu:function(){return l},UK:function(){return o},pu:function(){return r}});var a=n(3326);function u(){return(0,a.Z)({url:"/data/SurvivalObject",method:"get"})}function l(t){return(0,a.Z)({url:"/data/exist/"+t,method:"get"})}function r(t){return(0,a.Z)({url:"/data/"+t,method:"get"})}function o(){return(0,a.Z)({url:"/data/export/all",method:"get",responseType:"blob"})}function d(){return(0,a.Z)({url:"/data/filter",method:"get"})}},8081:function(t,e,n){n.r(e),n.d(e,{default:function(){return f}});var a=n(8997),u=n(1165);const l={"element-loading-text":"未完成分析"},r=(0,a.Uk)(" count: ");function o(t,e,n,o,d,i){const c=(0,a.up)("el-header"),s=(0,a.up)("el-table-column"),f=(0,a.up)("el-table"),h=(0,a.up)("el-main"),m=(0,a.up)("el-tag"),p=(0,a.up)("el-footer"),g=(0,a.up)("el-container"),b=(0,a.Q2)("loading");return(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",l,[(0,a.Wm)(g,null,{default:(0,a.w5)((()=>[(0,a.Wm)(c),(0,a.Wm)(h,null,{default:(0,a.w5)((()=>[(0,a.Wm)(f,{data:d.tableData,style:{width:"100%"},height:"400"},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{prop:"api",label:"接口"}),(0,a.Wm)(s,{prop:"name",label:"映射类"})])),_:1},8,["data"])])),_:1}),(0,a.Wm)(p,null,{default:(0,a.w5)((()=>[r,(0,a.Wm)(m,{type:"info"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,u.zw)(d.count),1)])),_:1})])),_:1})])),_:1})],512)),[[b,d.loading]])}var d=n(4507),i={name:"Jersey",data(){return{tableData:[],loading:!0,count:0}},mounted(){const t=setInterval((()=>{this.loading?(0,d.Pu)("jersey").then((t=>{t.data.msg?(this.loading=!1,(0,d.pu)("jersey").then((t=>{let e=Object.keys(t.data.msg);this.count=e.length;let n=[];for(let a=0;a<e.length;a++){let u=new Object;u.api=e[a],u.name=t.data.msg[e[a]],n.push(u)}this.tableData=n}))):(this.$router.push("/main"),this.loading=!0)})):clearInterval(t)}),1e3);(0,a.Jd)((()=>{clearInterval(t)}))}},c=n(6150);const s=(0,c.Z)(i,[["render",o]]);var f=s}}]);
//# sourceMappingURL=81.5639851c.js.map