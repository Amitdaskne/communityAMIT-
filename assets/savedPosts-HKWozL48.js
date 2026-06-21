import{o as g,r as p,a as w,b as f}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("saved-stream-container");let o=null;g(window.App.auth,t=>{t&&(o=t.uid,u())});function u(){const t=p(window.App.db,`${window.App.DB_ROOT}/posts`);w(t,a=>{if(n.innerHTML="",!a.exists()){d();return}const i=a.val(),l=Object.keys(i).map(e=>({id:e,...i[e]})).filter(e=>e.saves&&e.saves[o]===!0).sort((e,r)=>r.createdAt-e.createdAt);if(l.length===0){d();return}l.forEach(e=>{const r=e.likes?Object.keys(e.likes).length:0,h=e.comments?Object.keys(e.comments).length:0,s=document.createElement("div");s.className="glass-card post-card";let m="";e.image&&(m=`
                <div class="post-image-container" style="max-height:160px;">
                  <img src="${e.image}" class="post-image" alt="Visual asset" referrerpolicy="no-referrer">
                </div>
              `),s.innerHTML=`
              <div class="post-header">
                <div class="post-meta">
                  <span class="community-badge">c/${e.communityName}</span>
                  <a href="profile-view.html?id=${e.uid}" class="author-name">u/${e.username}</a>
                  <span class="post-time">${window.App.formatRelativeTime(e.createdAt)}</span>
                </div>
              </div>

              <a href="post.html?id=${e.id}" class="post-title">${c(e.title)}</a>
              <p class="post-content" style="max-height:90px; overflow:hidden; text-overflow:ellipsis;">${c(e.content)}</p>
              ${m}

              <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:12px; margin-top:8px;">
                <div style="display:flex; gap:10px; font-size:12px; color:var(--text-secondary);">
                  <span><i data-lucide="heart" style="width:12px; height:12px; display:inline-block; vertical-align:middle;"></i> ${r} to upvotes</span>
                  <span><i data-lucide="message-square" style="width:12px; height:12px; display:inline-block; vertical-align:middle;"></i> ${h} replies</span>
                </div>

                <button class="btn btn-sm btn-danger remove-bookmarks-btn" data-id="${e.id}">
                  <i data-lucide="bookmark-minus"></i> Remove Bookmark
                </button>
              </div>
            `,n.appendChild(s),s.querySelector(".remove-bookmarks-btn").addEventListener("click",b=>{v(b.currentTarget.dataset.id)})}),window.lucide.createIcons()})}function d(){n.innerHTML=`
          <div class="glass-card empty-state">
            <i data-lucide="bookmark"></i>
            <h3>No Saved Bookmarks</h3>
            <p>You haven't bookmarked any transmissions to your local records yet.</p>
            <a href="index.html" class="btn btn-primary mt-12 btn-sm">
              <i data-lucide="compass"></i> Explore Home Feed
            </a>
          </div>
        `,window.lucide.createIcons()}async function v(t){const a=p(window.App.db,`${window.App.DB_ROOT}/posts/${t}/saves/${o}`);try{await f(a),window.App.showToast("Bookmark dismissed.","success")}catch(i){console.error(i),window.App.showToast("Error dismissing bookmark.","error")}}function c(t){return t?t.replace(/[&<>'"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[a]||a):""}});
