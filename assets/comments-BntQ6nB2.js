import{o as k,r as c,g as A,a as g,p as B,s as y,b as C}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{const s=new URLSearchParams(window.location.search).get("id");if(!s){window.App.showToast("No thread ID parameter specified.","error"),setTimeout(()=>{window.location.href="index.html"},1200);return}const l=document.getElementById("active-post-container"),$=document.getElementById("comment-add-form-uid"),u=document.getElementById("comment-input-text"),w=document.getElementById("btn-comment-submit"),m=document.getElementById("comments-list-id"),h=document.getElementById("comments-title-total-id");let i=null,d=null;k(window.App.auth,async e=>{if(!e)return;i=e.uid;const o=c(window.App.db,`${window.App.DB_ROOT}/users/${e.uid}`);try{const n=await A(o);n.exists()&&(d=n.val())}catch(n){console.error(n)}});const L=c(window.App.db,`${window.App.DB_ROOT}/posts/${s}`);g(L,e=>{if(!e.exists()){l.innerHTML=`
            <div class="glass-card empty-state">
              <i data-lucide="unlink"></i>
              <h3>Post Not Found</h3>
              <p>The requested post node has been de-referenced or deleted.</p>
            </div>
          `,window.lucide.createIcons(),window.App&&window.App.hideLoader&&window.App.hideLoader();return}const o=e.val();T(o),window.App&&window.App.hideLoader&&window.App.hideLoader()});function T(e){const o=e.likes?Object.keys(e.likes).length:0,n=e.saves?Object.keys(e.saves).length:0,t=e.comments?Object.keys(e.comments).length:0,a=i&&e.likes&&e.likes[i]===!0,r=i&&e.saves&&e.saves[i]===!0;let b="";e.image&&(b=`
            <div class="post-image-container">
              <img src="${e.image}" class="post-image" alt="Broadcasting media" referrerpolicy="no-referrer">
            </div>
          `);const x=e.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(e.username||"A")}`;l.innerHTML=`
          <div class="glass-card post-card" style="border-color: rgba(255,255,255,0.15);">
            <div class="post-header">
              <div class="post-meta">
                <span class="avatar-bubble" style="width:28px; height:28px; font-size:12px; overflow:hidden;">
                  <img src="${x}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">
                </span>
                <span class="community-badge">c/${e.communityName||"all"}</span>
                <a href="profile-view.html?id=${e.uid}" class="author-name">u/${e.username}</a>
                <span class="post-time">${window.App.formatRelativeTime(e.createdAt)}</span>
              </div>
            </div>

            <h2 style="color:white; font-size:22px; line-height:1.3;">${p(e.title)}</h2>
            <p class="post-content">${p(e.content)}</p>

            ${b}

            <div class="post-actions">
              <button class="action-btn like-btn ${a?"active":""}" id="btn-post-like-id">
                <i data-lucide="heart"></i>
                <span>${o}</span>
              </button>
              <div class="action-btn">
                <i data-lucide="message-square"></i>
                <span>${t}</span>
              </div>
              <button class="action-btn save-btn ${r?"active":""}" id="btn-post-save-id">
                <i data-lucide="bookmark"></i>
                <span>${n}</span>
              </button>
            </div>
          </div>
        `,document.getElementById("btn-post-like-id").addEventListener("click",()=>v("likes",a)),document.getElementById("btn-post-save-id").addEventListener("click",()=>v("saves",r)),window.lucide.createIcons()}async function v(e,o){if(!i){window.App.showToast("Authorized credentials needed.","error");return}const n=c(window.App.db,`${window.App.DB_ROOT}/posts/${s}/${e}/${i}`);try{o?await C(n):await y(n,!0)}catch(t){console.error(t)}}const f=c(window.App.db,`${window.App.DB_ROOT}/posts/${s}/comments`);g(f,e=>{if(m.innerHTML="",!e.exists()){h.textContent="Comments (0)",m.innerHTML=`
            <p style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px 0;">No reply transmissions detected on this node yet.</p>
          `,window.App&&window.App.hideLoader&&window.App.hideLoader();return}const o=e.val(),n=Object.keys(o).map(t=>({id:t,...o[t]})).sort((t,a)=>a.createdAt-t.createdAt);h.textContent=`Comments (${n.length})`,n.forEach(t=>{const a=t.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t.username||"A")}`,r=document.createElement("div");r.className="comment-item",r.innerHTML=`
            <span class="avatar-bubble" style="width:34px; height:34px; font-size:14px; flex-shrink:0; overflow:hidden;">
              <img src="${a}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">
            </span>
            <div class="comment-content-wrap">
              <div class="comment-meta">
                <a href="profile-view.html?id=${t.uid}" class="commenter-name">u/${t.username||"anonymous"}</a>
                <span class="comment-time">${window.App.formatRelativeTime(t.createdAt)}</span>
              </div>
              <p class="comment-body">${p(t.comment)}</p>
            </div>
          `,m.appendChild(r)}),window.lucide.createIcons(),window.App&&window.App.hideLoader&&window.App.hideLoader()}),$.addEventListener("submit",async e=>{if(e.preventDefault(),!i||!d){window.App.showToast("Sign-in required to post replies.","error");return}const o=u.value.trim();if(o){window.App.setButtonLoading(w,!0);try{const n=B(f);await y(n,{id:n.key,uid:i,username:d.username,profilePicture:d.profilePicture||"",comment:o,createdAt:Date.now()});const t=await A(c(window.App.db,`${window.App.DB_ROOT}/posts/${s}/uid`));t.exists()&&t.val()!==i&&await window.App.pushNotification(t.val(),`u/${d.username} commented on your broadcast thread!`,`comments.html?id=${s}`),u.value="",window.App.showToast("Comment transmitted.","success")}catch(n){console.error(n),window.App.showToast("Could not send comment reply.","error")}finally{window.App.setButtonLoading(w,!1)}}});function p(e){return e?e.replace(/[&<>'"]/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[o]||o):""}});
