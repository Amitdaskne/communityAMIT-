import{o as $,r as l,a as v,b as y,s as x,g as f}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{const c=new URLSearchParams(window.location.search).get("id");if(!c){window.App.showToast("No broadcast identifier loaded.","error"),setTimeout(()=>{window.location.href="index.html"},1200);return}const u=document.getElementById("thread-full-container"),m=document.getElementById("comments-box-list-id"),h=document.getElementById("comments-title-id");let s=null;$(window.App.auth,e=>{e&&(s=e.uid),g()});function g(){const e=l(window.App.db,`${window.App.DB_ROOT}/posts/${c}`);v(e,n=>{if(!n.exists()){u.innerHTML=`
              <div class="glass-card empty-state">
                <i data-lucide="shield-alert"></i>
                <h3>Broadcast Missing</h3>
                <p>The post was deleted or has been offline.</p>
              </div>
            `,window.lucide.createIcons();return}const i=n.val();b(i)});const a=l(window.App.db,`${window.App.DB_ROOT}/posts/${c}/comments`);v(a,n=>{if(m.innerHTML="",!n.exists()){h.textContent="Discussion replies (0)",m.innerHTML=`
              <p style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px 0;">No comments found on this post. Be the first to start the chain.</p>
            `;return}const i=n.val(),o=Object.keys(i).map(t=>({id:t,...i[t]})).sort((t,r)=>r.createdAt-t.createdAt);h.textContent=`Discussion replies (${o.length})`,o.forEach(t=>{const r=t.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t.username||"A")}`,d=document.createElement("div");d.className="comment-item",d.innerHTML=`
              <span class="avatar-bubble" style="width:34px; height:34px; font-size:14px; flex-shrink:0; overflow:hidden;">
                <img src="${r}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">
              </span>
              <div class="comment-content-wrap">
                <div class="comment-meta">
                  <a href="profile-view.html?id=${t.uid}" class="commenter-name">u/${t.username}</a>
                  <span class="comment-time">${window.App.formatRelativeTime(t.createdAt)}</span>
                </div>
                <p class="comment-body">${p(t.comment)}</p>
              </div>
            `,m.appendChild(d)})})}function b(e){const a=e.likes?Object.keys(e.likes).length:0,n=e.saves?Object.keys(e.saves).length:0,i=e.comments?Object.keys(e.comments).length:0,o=s&&e.likes&&e.likes[s]===!0,t=s&&e.saves&&e.saves[s]===!0;let r="";e.image&&(r=`
            <div class="post-image-container" style="max-height: 500px; margin-top:20px;">
              <img src="${e.image}" class="post-image" alt="Thread visual cover" referrerpolicy="no-referrer">
            </div>
          `);const d=e.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(e.username||"U")}`;u.innerHTML=`
          <div class="glass-card post-card" style="padding: 28px;">
            <div class="post-header">
              <div class="post-meta">
                <span class="avatar-bubble" style="width: 32px; height: 32px; font-size: 14px; overflow:hidden;">
                  <img src="${d}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">
                </span>
                <a href="community.html?id=${e.communityId}" class="community-badge">c/${e.communityName}</a>
                <a href="profile-view.html?id=${e.uid}" class="author-name">u/${e.username}</a>
                <span class="post-time">${window.App.formatRelativeTime(e.createdAt)}</span>
              </div>
            </div>

            <h1 style="color:white; font-size: 26px; line-height: 1.4; margin-top: 10px; font-weight:800;">${p(e.title)}</h1>
            <p class="post-content" style="font-size: 15px; margin-top: 14px; line-height:1.6;">${p(e.content)}</p>

            ${r}

            <div class="post-actions" style="margin-top: 24px;">
              <button class="action-btn like-btn ${o?"active":""}" id="action-like-uid">
                <i data-lucide="heart"></i>
                <span style="font-weight:bold;">${a} Upvotes</span>
              </button>
              <a href="comments.html?id=${c}" class="action-btn">
                <i data-lucide="message-square"></i>
                <span style="font-weight:bold;">${i} Replies</span>
              </a>
              <button class="action-btn save-btn ${t?"active":""}" id="action-save-uid">
                <i data-lucide="bookmark"></i>
                <span style="font-weight:bold;">${n} Saves</span>
              </button>
            </div>
          </div>
        `,document.getElementById("action-like-uid").addEventListener("click",()=>w("likes",o)),document.getElementById("action-save-uid").addEventListener("click",()=>w("saves",t)),window.lucide.createIcons()}async function w(e,a){if(!s){window.App.showToast("Signed credentials requested.","error");return}const n=l(window.App.db,`${window.App.DB_ROOT}/posts/${c}/${e}/${s}`);try{if(a)await y(n);else{await x(n,!0);const i=await f(l(window.App.db,`${window.App.DB_ROOT}/posts/${c}/uid`));if(i.exists()&&i.val()!==s){const o=await f(l(window.App.db,`${window.App.DB_ROOT}/users/${s}/username`)),t=o.exists()?o.val():"Someone",r=e==="likes"?"upvoted":"saved";await window.App.pushNotification(i.val(),`u/${t} ${r} your post!`,`post.html?id=${c}`)}}}catch(i){console.error(i)}}function p(e){return e?e.replace(/[&<>'"]/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[a]||a):""}});
