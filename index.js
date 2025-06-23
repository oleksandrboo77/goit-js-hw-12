import{S as u,i as c}from"./assets/vendor-5ObWk2rO.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function g(s){const i="50867086-a3d680221e2677e18377c4443",r="https://pixabay.com/api/",a=new URLSearchParams({key:i,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${r}?${a}`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>e.hits)}const n=document.querySelector(".gallery"),l=document.querySelector(".loader");let h=new u(".gallery a",{captionsData:"alt",captionDelay:250});function f(){l.classList.remove("hidden")}function p(){l.classList.add("hidden")}function y(){n.innerHTML=""}function v(s){const i=s.map(({likes:r,views:a,comments:e,downloads:t,webformatURL:o,tags:m,largeImageURL:d})=>`
    <li class="image-card">
<a href="${d}" class="gallery-link">
    <img src="${o}" alt="${m}" class="image-icon">
</a>
  <div class="image-card-statistic">

    <div class="image-card-statistic-item">
      <h2 class="image-likes image-card-statistic-item-title">Likes</h2>
      <p class="image-card-statistic-item-number">${r}</p>
    </div>

    <div class="image-card-statistic-item">
      <h2 class="image-views image-card-statistic-item-title">Views</h2>
      <p class="image-card-statistic-item-number">${a}</p>
    </div>

    <div class="image-card-statistic-item">
      <h2 class="image-comments image-card-statistic-item-title">Comments</h2>
      <p class="image-card-statistic-item-number">${e}</p>
    </div>

    <div class="image-card-statistic-item">
      <h2 class="image-downloads image-card-statistic-item-title">Downloads</h2>
      <p class="image-card-statistic-item-number">${t}</p>
    </div>

  </div>

    </li> `).join("");n.innerHTML=i,h.refresh()}const L=document.querySelector(".form");L.addEventListener("submit",w);function w(s){s.preventDefault();const i=s.currentTarget.elements["search-text"].value.trim();if(!i){c.warning({title:"Warning",message:"Please enter a search query",position:"topRight"});return}y(),f(),g(i).then(r=>{if(r.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}v(r)}).catch(r=>{console.log(r),c.error({title:"Error",message:"Something went wrong. Try again later.",position:"topRight"})}).finally(()=>{p()})}
//# sourceMappingURL=index.js.map
