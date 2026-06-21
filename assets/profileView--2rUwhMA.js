import{o as R,r as p,g as O,a as D,b as P,s as U}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{const a=new URLSearchParams(window.location.search).get("id");if(!a){window.App.showToast("No target user identifier loaded.","error"),setTimeout(()=>{window.location.href="index.html"},1200);return}const v=document.getElementById("view-avatar-char"),f=document.getElementById("view-display-name"),g=document.getElementById("view-display-username"),m=document.getElementById("view-display-email"),L=document.getElementById("stat-posts-count-view"),x=document.getElementById("stat-saves-count-view"),E=document.getElementById("stat-bookmarks-count-view"),T=document.getElementById("view-posts-text"),l=document.getElementById("view-user-posts-list-id");let n=null;R(window.App.auth,i=>{i&&(n=i.uid),B()});async function B(){const i=p(window.App.db,`${window.App.DB_ROOT}/users/${a}`);try{const s=await O(i);if(!s.exists()){f.textContent="Unknown Matrix Citizen",g.textContent="u/unknown",v.textContent="?",m.textContent="Nodes de-referenced.",l.innerHTML="";return}const t=s.val();f.textContent=t.fullName,g.textContent=`u/${t.username}`;const d=t.profilePicture||`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t.username||"M")}`;if(v.innerHTML=`<img src="${d}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" referrerpolicy="no-referrer">`,t.createdAt){const u=new Date(t.createdAt);m.textContent=`Registered Member: ${u.toLocaleDateString()}`}else m.textContent="Registered Member";const o=document.getElementById("btn-message-user-uid");o&&(n&&n!==a?(o.style.display="flex",o.addEventListener("click",()=>{window.location.href=`chat.html?target=${encodeURIComponent(a)}`}),window.lucide&&window.lucide.createIcons()):o.style.display="none"),T.textContent=`u/${t.username} Contributions`}catch(s){console.error(s),window.App.showToast("Bottleneck loading citizen details.","error")}const r=p(window.App.db,`${window.App.DB_ROOT}/posts`);D(r,s=>{l.innerHTML="";let t=0,d=0,o=0;if(!s.exists()){y(),window.App&&window.App.hideLoader&&window.App.hideLoader();return}const u=s.val(),C=Object.keys(u).map(e=>({id:e,...u[e]})).filter(e=>(e.uid===a&&t++,e.likes&&e.likes[a]===!0&&d++,e.saves&&e.saves[a]===!0&&o++,e.uid===a)).sort((e,w)=>w.createdAt-e.createdAt);if(L.textContent=t,x.textContent=d,E.textContent=o,C.length===0){y(),window.App&&window.App.hideLoader&&window.App.hideLoader();return}C.forEach(e=>{const w=e.likes?Object.keys(e.likes).length:0,I=e.comments?Object.keys(e.comments).length:0,M=e.saves?Object.keys(e.saves).length:0,A=n&&e.likes&&e.likes[n]===!0,k=n&&e.saves&&e.saves[n]===!0,c=document.createElement("div");c.className="glass-card post-card";let $="";e.image&&($=`
                <div class="post-image-container">
                  <img src="${e.image}" class="post-image" alt="Artwork attachment" referrerpolicy="no-referrer">
                </div>
              `),c.innerHTML=`
              <div class="post-header">
                <div class="post-meta">
                  <span class="community-badge">c/${e.communityName}</span>
                  <span class="post-time">${window.App.formatRelativeTime(e.createdAt)}</span>
                </div>
              </div>

              <a href="post.html?id=${e.id}" class="post-title">${b(e.title)}</a>
              <p class="post-content">${b(e.content)}</p>
              ${$}

              <div class="post-actions">
                <button class="action-btn like-btn ${A?"active":""}" data-post-id="${e.id}">
                  <i data-lucide="heart"></i>
                  <span>${w}</span>
                </button>
                <a href="comments.html?id=${e.id}" class="action-btn">
                  <i data-lucide="message-square"></i>
                  <span>${I}</span>
                </a>
                <button class="action-btn save-btn ${k?"active":""}" data-post-id="${e.id}">
                  <i data-lucide="bookmark"></i>
                  <span>${M}</span>
                </button>
              </div>
            `,l.appendChild(c),c.querySelector(".like-btn").addEventListener("click",()=>h(e.id,"likes",A)),c.querySelector(".save-btn").addEventListener("click",()=>h(e.id,"saves",k))}),window.lucide.createIcons(),window.App&&window.App.hideLoader&&window.App.hideLoader()})}async function h(i,r,s){if(!n){window.App.showToast("Auth keys missing.","error");return}const t=p(window.App.db,`${window.App.DB_ROOT}/posts/${i}/${r}/${n}`);try{s?await P(t):await U(t,!0)}catch(d){console.error(d)}}function y(){l.innerHTML=`
          <div class="glass-card empty-state" style="padding: 24px;">
            <i data-lucide="compass-off"></i>
            <h3>No Contributions Broadcasted</h3>
            <p>This user has not broadcast any streams on this channel yet.</p>
          </div>
        `,window.lucide.createIcons()}function b(i){return i?i.replace(/[&<>'"]/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[r]||r):""}});
