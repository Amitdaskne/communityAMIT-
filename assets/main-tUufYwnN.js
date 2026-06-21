import{o as L,r as o,a as T,b as f,s as A,g as l}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{let i=null;const p=document.getElementById("feed-posts-container"),b=document.getElementById("feed-search-input");let c=[];L(window.App.auth,a=>{a&&(i=a.uid),$()});function $(){const a=o(window.App.db,`${window.App.DB_ROOT}/posts`);T(a,e=>{if(!e.exists()){w(),window.App&&window.App.hideLoader&&window.App.hideLoader();return}const s=e.val();c=Object.keys(s).map(t=>({id:t,...s[t]})).sort((t,n)=>n.createdAt-t.createdAt),u(c),window.App&&window.App.hideLoader&&window.App.hideLoader()},e=>{console.error("Database connection failure:",e),window.App.showToast("Connection failed. Check Firebase security rules.","error"),window.App&&window.App.hideLoader&&window.App.hideLoader()})}function u(a){if(p.innerHTML="",a.length===0){w();return}a.forEach(e=>{const s=e.likes?Object.keys(e.likes).length:0,t=e.comments?Object.keys(e.comments).length:0,n=e.saves?Object.keys(e.saves).length:0,r=i&&e.likes&&e.likes[i]===!0,h=i&&e.saves&&e.saves[i]===!0,d=document.createElement("div");d.className="glass-card post-card",d.id=`post-${e.id}`;let v="";e.image&&(v=`
              <div class="post-image-container">
                <img src="${e.image}" class="post-image" alt="Uploaded media" referrerpolicy="no-referrer">
              </div>
            `);const k=e.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(e.username||"A")}`;d.innerHTML=`
            <div class="post-header">
              <div class="post-meta">
                <span class="avatar-bubble" style="width:28px; height:28px; font-size:12px; overflow:hidden;">
                  <img src="${k}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">
                </span>
                <a href="community.html?id=${encodeURIComponent(e.communityId||"all")}" class="community-badge">
                  c/${e.communityName||"all"}
                </a>
                <a href="profile-view.html?id=${e.uid}" class="author-name">
                  u/${e.username||"anonymous"}
                </a>
                <span class="post-time">${window.App.formatRelativeTime(e.createdAt)}</span>
              </div>
            </div>

            <a href="post.html?id=${e.id}" class="post-title">${m(e.title)}</a>
            <p class="post-content">${m(e.content)}</p>
            
            ${v}

            <div class="post-actions">
              <button class="action-btn like-btn ${r?"active":""}" data-post-id="${e.id}">
                <i data-lucide="heart"></i>
                <span class="likes-count">${s}</span>
              </button>
              <a href="comments.html?id=${e.id}" class="action-btn">
                <i data-lucide="message-square"></i>
                <span>${t}</span>
              </a>
              <button class="action-btn save-btn ${h?"active":""}" data-post-id="${e.id}">
                <i data-lucide="bookmark"></i>
                <span class="saves-count">${n}</span>
              </button>
            </div>
          `,p.appendChild(d),d.querySelector(".like-btn").addEventListener("click",()=>y(e.id,r)),d.querySelector(".save-btn").addEventListener("click",()=>g(e.id,h))}),window.lucide.createIcons()}function w(){p.innerHTML=`
          <div class="glass-card empty-state">
            <i data-lucide="inbox"></i>
            <h3>No Active Transmission</h3>
            <p>The matrix is empty. Be the first to post something incredible.</p>
            <a href="create-post.html" class="btn btn-primary mt-12 btn-sm">
              <i data-lucide="plus-square"></i> Create Post
            </a>
          </div>
        `,window.lucide.createIcons()}async function y(a,e){if(!i){window.App.showToast("Please log in to upvote.","error");return}const s=o(window.App.db,`${window.App.DB_ROOT}/posts/${a}/likes/${i}`);try{if(e)await f(s);else{await A(s,!0);const t=await l(o(window.App.db,`${window.App.DB_ROOT}/posts/${a}/uid`));if(t.exists()&&t.val()!==i){const n=await l(o(window.App.db,`${window.App.DB_ROOT}/users/${i}/username`)),r=n.exists()?n.val():"Someone";await window.App.pushNotification(t.val(),`u/${r} upvoted your post!`,`post.html?id=${a}`)}}}catch(t){console.error(t),window.App.showToast("Could not modify upvote state.","error")}}async function g(a,e){if(!i){window.App.showToast("Please log in to save.","error");return}const s=o(window.App.db,`${window.App.DB_ROOT}/posts/${a}/saves/${i}`);try{if(e)await f(s),window.App.showToast("Post removed from saved bookmarks.","success");else{await A(s,!0),window.App.showToast("Post saved successfully.","success");const t=await l(o(window.App.db,`${window.App.DB_ROOT}/posts/${a}/uid`));if(t.exists()&&t.val()!==i){const n=await l(o(window.App.db,`${window.App.DB_ROOT}/users/${i}/username`)),r=n.exists()?n.val():"Someone";await window.App.pushNotification(t.val(),`u/${r} saved your post!`,`post.html?id=${a}`)}}}catch(t){console.error(t),window.App.showToast("Failed to modify save status.","error")}}b.addEventListener("input",a=>{const e=a.target.value.toLowerCase().trim();if(!e){u(c);return}const s=c.filter(t=>t.title.toLowerCase().includes(e)||t.content.toLowerCase().includes(e)||t.communityName&&t.communityName.toLowerCase().includes(e)||t.username.toLowerCase().includes(e));u(s)});function m(a){return a?a.replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e]||e):""}});
