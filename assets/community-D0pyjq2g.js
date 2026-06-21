import{o as I,r as l,a as v,b as $,s as A}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{const a=new URLSearchParams(window.location.search).get("id");if(!a){window.App.showToast("No community specified.","error"),setTimeout(()=>{window.location.href="index.html"},1200);return}const p=document.getElementById("community-meta-card-container"),d=document.getElementById("community-posts-stream-id"),h=document.getElementById("community-posts-banner-id");let n=null;I(window.App.auth,t=>{t&&(n=t.uid),T()});function T(){const t=l(window.App.db,`${window.App.DB_ROOT}/communities/${a}`);v(t,i=>{if(!i.exists()){p.innerHTML=`
              <div class="glass-card community-header">
                <div class="community-meta-wrap">
                  <h2 class="community-title">c/${a}</h2>
                  <p class="community-sub" style="margin-top: 4px;">This community hasn't been officially mapped yet.</p>
                </div>
                <a href="create-post.html" class="btn btn-primary btn-sm">
                  Initialize Community
                </a>
              </div>
            `,h.textContent=`c/${a} broadcasts (0)`,d.innerHTML=`
              <div class="glass-card empty-state">
                <i data-lucide="compass"></i>
                <h3>Uncharted Territory</h3>
                <p>Be the pioneer! Create a broadcast tagged c/${a} to build this community.</p>
              </div>
            `,window.lucide.createIcons();return}const r=i.val();k(r)});const s=l(window.App.db,`${window.App.DB_ROOT}/posts`);v(s,i=>{if(d.innerHTML="",!i.exists()){w();return}const r=i.val(),o=Object.keys(r).map(e=>({id:e,...r[e]})).filter(e=>e.communityId===a).sort((e,u)=>u.createdAt-e.createdAt);if(h.textContent=`c/${a} broadcasts (${o.length})`,o.length===0){w();return}o.forEach(e=>{const u=e.likes?Object.keys(e.likes).length:0,C=e.comments?Object.keys(e.comments).length:0,L=e.saves?Object.keys(e.saves).length:0,y=n&&e.likes&&e.likes[n]===!0,g=n&&e.saves&&e.saves[n]===!0,c=document.createElement("div");c.className="glass-card post-card";let f="";e.image&&(f=`
                <div class="post-image-container">
                  <img src="${e.image}" class="post-image" alt="Post graphic" referrerpolicy="no-referrer">
                </div>
              `);const O=e.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(e.username||"A")}`;c.innerHTML=`
              <div class="post-header">
                <div class="post-meta">
                  <span class="avatar-bubble" style="width:28px; height:28px; font-size:12px; overflow:hidden;">
                    <img src="${O}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">
                  </span>
                  <a href="profile-view.html?id=${e.uid}" class="author-name">u/${e.username}</a>
                  <span class="post-time">${window.App.formatRelativeTime(e.createdAt)}</span>
                </div>
              </div>

              <a href="post.html?id=${e.id}" class="post-title">${m(e.title)}</a>
              <p class="post-content">${m(e.content)}</p>
              
              ${f}

              <div class="post-actions">
                <button class="action-btn like-btn ${y?"active":""}" data-post-id="${e.id}">
                  <i data-lucide="heart"></i>
                  <span>${u}</span>
                </button>
                <a href="comments.html?id=${e.id}" class="action-btn">
                  <i data-lucide="message-square"></i>
                  <span>${C}</span>
                </a>
                <button class="action-btn save-btn ${g?"active":""}" data-post-id="${e.id}">
                  <i data-lucide="bookmark"></i>
                  <span>${L}</span>
                </button>
              </div>
            `,d.appendChild(c),c.querySelector(".like-btn").addEventListener("click",()=>b(e.id,"likes",y)),c.querySelector(".save-btn").addEventListener("click",()=>b(e.id,"saves",g))}),window.lucide.createIcons()})}function k(t){const s=t.members?Object.keys(t.members).length:0,i=n&&t.members&&t.members[n]===!0;p.innerHTML=`
          <div class="glass-card community-header" style="border-color: rgba(56, 189, 248, 0.25);">
            <div class="community-meta-wrap">
              <span class="community-sub" style="color:var(--accent-color); font-weight:bold; letter-spacing:1px; text-transform:uppercase;">Decentralized Node</span>
              <h1 class="community-title" style="font-size:24px; text-shadow:0 0 10px rgba(255,255,255,0.1);">c/${t.name}</h1>
              <p class="community-sub">${m(t.description)}</p>
              <p class="community-sub" style="margin-top: 10px; font-weight:bold; color:white;">
                <i data-lucide="users" style="width:14px; height:14px; display:inline-block; vertical-align:middle; margin-right:4px;"></i> ${s} Members registered
              </p>
            </div>
            
            <button class="btn ${i?"btn-danger":"btn-primary"} btn-sm" id="btn-toggle-membership-id" style="min-width:110px;">
              ${i?'<i data-lucide="minus"></i> Leave':'<i data-lucide="plus"></i> Join'}
            </button>
          </div>
        `,document.getElementById("btn-toggle-membership-id").addEventListener("click",()=>x(i)),window.lucide.createIcons()}async function x(t){if(!n){window.App.showToast("Authenticate credential parameters to register membership.","error");return}const s=l(window.App.db,`${window.App.DB_ROOT}/communities/${a}/members/${n}`);try{t?(await $(s),window.App.showToast(`Left c/${a}`,"info")):(await A(s,!0),window.App.showToast(`Joined c/${a}!`,"success"))}catch(i){console.error(i),window.App.showToast("Failed to update membership path.","error")}}async function b(t,s,i){if(!n){window.App.showToast("Access key required.","error");return}const r=l(window.App.db,`${window.App.DB_ROOT}/posts/${t}/${s}/${n}`);try{i?await $(r):await A(r,!0)}catch(o){console.error(o)}}function w(){d.innerHTML=`
          <div class="glass-card empty-state">
            <i data-lucide="file-warning"></i>
            <h3>No broadcasts found</h3>
            <p>The channel is currently transmitting quiet codes.</p>
            <a href="create-post.html" class="btn btn-primary mt-12 btn-sm">
              <i data-lucide="edit"></i> Transmit New Post
            </a>
          </div>
        `,window.lucide.createIcons()}function m(t){return t?t.replace(/[&<>'"]/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[s]||s):""}});
