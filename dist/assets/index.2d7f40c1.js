import{j as x,r as i,R as b,a as S}from"./vendor.b1059b47.js";const k=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const u of e.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function c(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=c(t);fetch(t.href,e)}};k();const o=x.exports.jsx,l=x.exports.jsxs,p=new FileReader;function E(){const[n,s]=i.exports.useState(null),c=i.exports.useCallback(a=>s(a),[]);return l("div",{className:"App",children:[o(F,{onCssChange:c}),n?o(L,{css:n}):"Select file to preview"]})}function F({onCssChange:n}){const[s,c]=i.exports.useState(),[a,t]=i.exports.useState(""),[e,u]=i.exports.useState(""),[f,v]=i.exports.useState(100),[m,h]=i.exports.useState(0),[g,y]=i.exports.useState(0);return i.exports.useEffect(()=>{if(s){const r=function(){t(p.result)};return p.addEventListener("load",r),p.readAsDataURL(s),()=>p.removeEventListener("load",r)}},[s]),i.exports.useEffect(()=>{const d={backgroundImage:`url(${e||a})`,opacity:f/100,backgroundRepeat:"no-repeat",backgroundPosition:`${m}% ${g}%`};n==null||n(d)},[n,f,a,e,m,g]),l("form",{className:"input-form",children:[l("label",{children:["Choose background image",o("input",{type:"file",accept:"image/*",onChange:r=>{var d;return c((d=r.target.files)==null?void 0:d[0])}})]}),l("label",{children:["Background image url",o("input",{type:"text",value:e,onChange:r=>u(r.target.value)})]}),l("label",{children:["Opacity",o("input",{type:"range",min:"0",max:"100",value:f,onChange:r=>v(parseFloat(r.target.value))})]}),l("div",{className:"input-form-bg-position",children:[l("label",{children:["Position horizontal shift",o("input",{type:"range",min:"0",max:"100",value:m,onChange:r=>h(parseFloat(r.target.value))})]}),l("label",{children:["Position vertical shift",o("input",{type:"range",min:"0",max:"100",value:g,onChange:r=>y(parseFloat(r.target.value))})]})]})]})}function L({css:n}){return o("div",{className:"preview-div",style:n,children:o(N,{})})}function N(){const[n,s]=i.exports.useState(!1),[c,a]=i.exports.useState("Double Click to Edit");return n?l("div",{className:"d-flex flex-col align-items-start justify-content-start revert-text-color",children:[o("textarea",{value:c,onChange:e=>a(e.target.value)}),o("button",{onClick:()=>s(!1),children:"Finish Edit"})]}):o("span",{className:"preview-text",onDoubleClick:function(){s(e=>!e)},children:c})}b.render(o(S.StrictMode,{children:o(E,{})}),document.getElementById("root"));
