import{r as f,g as m}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("global-search-input"),a=document.getElementById("search-results-list"),l=document.querySelectorAll(".tab-header");let n="posts",o={posts:[],users:[],communities:[]};l.forEach(r=>{r.addEventListener("click",()=>{l.forEach(e=>e.classList.remove("active")),r.classList.add("active"),n=r.dataset.category,u()})}),c.addEventListener("input",()=>{u()});async function u(){const r=c.value.toLowerCase().trim();if(!r){a.innerHTML=`
            <div class="glass-card empty-state" style="padding: 30px;">
              <i data-lucide="search-code"></i>
              <h3>Awaiting Search Parameters</h3>
              <p>Type in keywords above to initiate matching across the system.</p>
            </div>
          `,window.lucide.createIcons();return}a.innerHTML=`
          <div class="glass-card shimmer" style="height: 80px; width:100%; border-radius:16px;"></div>
          <div class="glass-card shimmer" style="height: 80px; width:100%; border-radius:16px; margin-top:10px;"></div>
        `;try{await h(n);const e=p(o[n],r,n);v(e,n)}catch(e){console.error(e),window.App.showToast("Bottleneck reading records.","error")}}async function h(r){if(o[r].length>0)return;const e=f(window.App.db,`${window.App.DB_ROOT}/${r}`),t=await m(e);if(t.exists()){const s=t.val();o[r]=Object.keys(s).map(i=>({id:i,...s[i]}))}}function p(r,e,t){return t==="posts"?r.filter(s=>s.title.toLowerCase().includes(e)||s.content.toLowerCase().includes(e)||s.username.toLowerCase().includes(e)):t==="users"?r.filter(s=>s.fullName.toLowerCase().includes(e)||s.username.toLowerCase().includes(e)):t==="communities"?r.filter(s=>s.name.toLowerCase().includes(e)||s.description.toLowerCase().includes(e)):[]}function v(r,e){if(a.innerHTML="",r.length===0){a.innerHTML=`
            <div class="glass-card empty-state" style="padding: 30px;">
              <i data-lucide="frown"></i>
              <h3>No match records found</h3>
              <p>Your search parameter returned no traces in c/${e}.</p>
            </div>
          `,window.lucide.createIcons();return}r.forEach(t=>{if(e==="posts"){const s=t.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t.username||"P")}`,i=document.createElement("a");i.href=`post.html?id=${t.id}`,i.className="user-row",i.innerHTML=`
              <div class="row-info">
                <span class="avatar-bubble" style="width:34px; height:34px; font-size:14px; flex-shrink:0; overflow:hidden;">
                  <img src="${s}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">
                </span>
                <div>
                  <div class="row-label">${d(t.title)}</div>
                  <div class="row-sub">c/${t.communityName} • u/${t.username}</div>
                </div>
              </div>
              <i data-lucide="chevron-right" style="color:var(--text-muted);"></i>
            `,a.appendChild(i)}else if(e==="users"){const s=t.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t.username||"U")}`,i=document.createElement("a");i.href=`profile-view.html?id=${t.id}`,i.className="user-row",i.innerHTML=`
              <div class="row-info">
                <span class="avatar-bubble" style="width:38px; height:38px; font-size:16px; flex-shrink:0; overflow:hidden;">
                  <img src="${s}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">
                </span>
                <div>
                  <div class="row-label">${d(t.fullName)}</div>
                  <div class="row-sub">u/${t.username}</div>
                </div>
              </div>
              <i data-lucide="chevron-right" style="color:var(--text-muted);"></i>
            `,a.appendChild(i)}else if(e==="communities"){const s=document.createElement("a");s.href=`community.html?id=${t.id}`,s.className="community-row",s.innerHTML=`
              <div class="row-info">
                <span class="avatar-bubble" style="width:38px; height:38px; font-size:16px; flex-shrink:0; background:linear-gradient(135deg, #a855f7 0%,#a855f7 100%);">
                  C
                </span>
                <div>
                  <div class="row-label">c/${t.name}</div>
                  <div class="row-sub">${d(t.description)}</div>
                </div>
              </div>
              <i data-lucide="chevron-right" style="color:var(--text-muted);"></i>
            `,a.appendChild(s)}}),window.lucide.createIcons()}function d(r){return r?r.replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e]||e):""}});
