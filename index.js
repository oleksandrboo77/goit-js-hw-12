import{S as L,a as v,i as n}from"./assets/vendor-Dy2ZTtfi.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const d=document.querySelector(".gallery"),g=document.querySelector(".loader"),m=document.querySelector(".load-more"),o={page:1,currentQuery:"",totalHits:0,totalLoaded:0};let u=new L(".gallery a",{captionsData:"alt",captionDelay:250});function h(){g.classList.remove("hidden")}function p(){g.classList.add("hidden")}function w(){d.innerHTML=""}function f({likes:t,views:i,comments:r,downloads:s,webformatURL:e,tags:a,largeImageURL:c}){return`
      <li class="image-card">
        <a href="${c}" class="gallery-link">
          <img src="${e}" alt="${a}" class="image-icon">
        </a>
        <div class="image-card-statistic">
          <div class="image-card-statistic-item">
            <h2 class="image-likes image-card-statistic-item-title">Likes</h2>
            <p class="image-card-statistic-item-number">${t}</p>
          </div>
          <div class="image-card-statistic-item">
            <h2 class="image-views image-card-statistic-item-title">Views</h2>
            <p class="image-card-statistic-item-number">${i}</p>
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
    `}function b(t){const i=t.map(f).join("");d.innerHTML=i,u.refresh()}function E(){m.classList.replace("load-more-hidden","load-more")}function l(){m.classList.replace("load-more","load-more-hidden")}async function y(t){const i="50867086-a3d680221e2677e18377c4443",r="https://pixabay.com/api/",s=new URLSearchParams({key:i,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o.page,per_page:15});try{return(await v.get(`${r}?${s}`)).data.hits}catch(e){throw e}}const S=document.querySelector(".form");S.addEventListener("submit",M);m.addEventListener("click",q);function M(t){t.preventDefault();const i=t.currentTarget.elements["search-text"].value.trim();if(!i){n.warning({title:"Warning",message:"Please enter a search query",position:"topRight"});return}o.currentQuery=i,o.page=1,w(),h(),y(i).then(r=>{if(!r||r.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(r),E(),o.totalLoaded=r.length,o.totalHits=r.totalHits;const s=Math.ceil(o.totalHits/15);o.page>=s&&(l(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}).catch(r=>{console.log(r),n.error({title:"Error",message:"Something went wrong. Try again later.",position:"topRight"})}).finally(()=>{p()})}async function q(){h(),o.page+=1;try{const t=await y(o.currentQuery);o.totalLoaded+=t.length;const i=Math.ceil(o.totalHits/15);if(o.page>=i&&(l(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),!t||t.length===0){l(),n.info({title:"Info",message:"No more images found.",position:"topRight"});return}const r=t.map(f).join("");d.insertAdjacentHTML("beforeend",r),u.refresh();const{height:s}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}catch{n.error({title:"Error",message:"Could not load more images.",position:"topRight"})}finally{p()}}
//# sourceMappingURL=index.js.map
