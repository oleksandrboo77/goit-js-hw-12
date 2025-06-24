import{S as L,a as v,i as n}from"./assets/vendor-Dy2ZTtfi.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const d=document.querySelector(".gallery"),u=document.querySelector(".loader"),m=document.querySelector(".load-more"),o={page:1,currentQuery:"",totalHits:0,totalLoaded:0};let g=new L(".gallery a",{captionsData:"alt",captionDelay:250});function h(){u.classList.remove("hidden")}function p(){u.classList.add("hidden")}function w(){d.innerHTML=""}function f({likes:i,views:a,comments:r,downloads:s,webformatURL:e,tags:t,largeImageURL:c}){return`
      <li class="image-card">
        <a href="${c}" class="gallery-link">
          <img src="${e}" alt="${t}" class="image-icon">
        </a>
        <div class="image-card-statistic">
          <div class="image-card-statistic-item">
            <h2 class="image-likes image-card-statistic-item-title">Likes</h2>
            <p class="image-card-statistic-item-number">${i}</p>
          </div>
          <div class="image-card-statistic-item">
            <h2 class="image-views image-card-statistic-item-title">Views</h2>
            <p class="image-card-statistic-item-number">${a}</p>
          </div>
          <div class="image-card-statistic-item">
            <h2 class="image-comments image-card-statistic-item-title">Comments</h2>
            <p class="image-card-statistic-item-number">${r}</p>
          </div>
          <div class="image-card-statistic-item">
            <h2 class="image-downloads image-card-statistic-item-title">Downloads</h2>
            <p class="image-card-statistic-item-number">${s}</p>
          </div>
        </div>
      </li>
    `}function b(i){const a=i.map(f).join("");d.innerHTML=a,g.refresh()}function E(){m.classList.replace("load-more-hidden","load-more")}function l(){m.classList.replace("load-more","load-more-hidden")}function S(i){const a=i.map(f).join("");d.insertAdjacentHTML("beforeend",a),g.refresh()}async function y(i,a=1){const r="50867086-a3d680221e2677e18377c4443",s="https://pixabay.com/api/",e=new URLSearchParams({key:r,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15});try{const t=await v.get(`${s}?${e}`);return{hits:t.data.hits,totalHits:t.data.totalHits}}catch(t){throw t}}const q=document.querySelector(".form");q.addEventListener("submit",H);m.addEventListener("click",M);async function H(i){i.preventDefault();const a=i.currentTarget.elements["search-text"].value.trim();if(!a){n.warning({title:"Warning",message:"Please enter a search query",position:"topRight"});return}o.currentQuery=a,o.page=1,o.totalLoaded=0,w(),h();try{const{hits:r,totalHits:s}=await y(a,o.page);if(!r||r.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query.",position:"topRight"}),l();return}b(r),o.totalLoaded=r.length,o.totalHits=s;const e=Math.ceil(s/15);o.page<e?E():(l(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{n.error({title:"Error",message:"Something went wrong. Try again later.",position:"topRight"})}finally{p()}}async function M(){h(),o.page+=1;try{const{hits:i}=await y(o.currentQuery,o.page);if(!i||i.length===0){l(),n.info({title:"Info",message:"No more images found.",position:"topRight"});return}S(i),o.totalLoaded+=i.length;const a=Math.ceil(o.totalHits/15);o.page>=a&&(l(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}catch{n.error({title:"Error",message:"Could not load more images.",position:"topRight"})}finally{p()}}
//# sourceMappingURL=index.js.map
