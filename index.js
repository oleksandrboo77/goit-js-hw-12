import{S as L,a as w,i as n}from"./assets/vendor-Dy2ZTtfi.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=t(e);fetch(e.href,i)}})();const d=document.querySelector(".gallery"),g=document.querySelector(".loader"),u=document.querySelector(".load-more"),r={page:1,currentQuery:"",totalHits:0,totalLoaded:0};let h=new L(".gallery a",{captionsData:"alt",captionDelay:250});function p(){g.classList.remove("hidden")}function f(){g.classList.add("hidden")}function b(){d.innerHTML=""}function $(a){const s=a.map(({likes:t,views:o,comments:e,downloads:i,webformatURL:c,tags:l,largeImageURL:m})=>`
    <li class="image-card">
<a href="${m}" class="gallery-link">
    <img src="${c}" alt="${l}" class="image-icon">
</a>
  <div class="image-card-statistic">

    <div class="image-card-statistic-item">
      <h2 class="image-likes image-card-statistic-item-title">Likes</h2>
      <p class="image-card-statistic-item-number">${t}</p>
    </div>

    <div class="image-card-statistic-item">
      <h2 class="image-views image-card-statistic-item-title">Views</h2>
      <p class="image-card-statistic-item-number">${o}</p>
    </div>

    <div class="image-card-statistic-item">
      <h2 class="image-comments image-card-statistic-item-title">Comments</h2>
      <p class="image-card-statistic-item-number">${e}</p>
    </div>

    <div class="image-card-statistic-item">
      <h2 class="image-downloads image-card-statistic-item-title">Downloads</h2>
      <p class="image-card-statistic-item-number">${i}</p>
    </div>

  </div>

    </li> `).join("");d.innerHTML=s,h.refresh()}function E(){u.classList.replace("load-more-hidden","load-more")}async function y(a){const s="50867086-a3d680221e2677e18377c4443",t="https://pixabay.com/api/",o=new URLSearchParams({key:s,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r.page,per_page:15});try{return(await w.get(`${t}?${o}`)).data.hits}catch(e){throw e}}const S=document.querySelector(".form");S.addEventListener("submit",q);u.addEventListener("click",R);function q(a){a.preventDefault();const s=a.currentTarget.elements["search-text"].value.trim();if(!s){n.warning({title:"Warning",message:"Please enter a search query",position:"topRight"});return}r.currentQuery=s,r.page=1,b(),p(),y(s).then(t=>{if(!t||t.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}$(t),E(),r.totalLoaded=t.length,r.totalHits=t.totalHits,r.totalLoaded>=r.totalHits&&(hideLoadMoreButton(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}).catch(t=>{console.log(t),n.error({title:"Error",message:"Something went wrong. Try again later.",position:"topRight"})}).finally(()=>{f()})}async function R(){p(),r.page+=1;try{const a=await y(r.currentQuery);if(r.totalLoaded+=a.length,r.totalLoaded>=r.totalHits&&(hideLoadMoreButton(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),!a||a.length===0){n.info({title:"Info",message:"No more images found.",position:"topRight"});return}const s=a.map(({likes:o,views:e,comments:i,downloads:c,webformatURL:l,tags:m,largeImageURL:v})=>`
      <li class="image-card">
  <a href="${v}" class="gallery-link">
      <img src="${l}" alt="${m}" class="image-icon">
  </a>
    <div class="image-card-statistic">
  
      <div class="image-card-statistic-item">
        <h2 class="image-likes image-card-statistic-item-title">Likes</h2>
        <p class="image-card-statistic-item-number">${o}</p>
      </div>
  
      <div class="image-card-statistic-item">
        <h2 class="image-views image-card-statistic-item-title">Views</h2>
        <p class="image-card-statistic-item-number">${e}</p>
      </div>
  
      <div class="image-card-statistic-item">
        <h2 class="image-comments image-card-statistic-item-title">Comments</h2>
        <p class="image-card-statistic-item-number">${i}</p>
      </div>
  
      <div class="image-card-statistic-item">
        <h2 class="image-downloads image-card-statistic-item-title">Downloads</h2>
        <p class="image-card-statistic-item-number">${c}</p>
      </div>
  
    </div>
  
      </li> `).join("");d.insertAdjacentHTML("beforeend",s),h.refresh();const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch{n.error({title:"Error",message:"Could not load more images.",position:"topRight"})}finally{f()}}
//# sourceMappingURL=index.js.map
