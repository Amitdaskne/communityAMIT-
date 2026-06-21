import{o as $,r,a as B,u as L,b as k}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{const l=document.getElementById("my-posts-stream-container"),p=document.getElementById("edit-modal-overlay"),x=document.getElementById("modal-edit-form-id"),m=document.getElementById("modal-post-id"),u=document.getElementById("modal-post-title"),w=document.getElementById("modal-post-content"),A=document.getElementById("btn-modal-cancel-id"),y=document.getElementById("btn-modal-save-id");let b=null;$(window.App.auth,t=>{t&&(b=t.uid,T())});function T(){const t=r(window.App.db,`${window.App.DB_ROOT}/posts`);B(t,n=>{if(l.innerHTML="",!n.exists()){g();return}const o=n.val(),a=Object.keys(o).map(e=>({id:e,...o[e]})).filter(e=>e.uid===b).sort((e,i)=>i.createdAt-e.createdAt);if(a.length===0){g();return}a.forEach(e=>{const i=e.likes?Object.keys(e.likes).length:0,I=e.comments?Object.keys(e.comments).length:0,d=document.createElement("div");d.className="glass-card post-card";let h="";e.image&&(h=`
                <div class="post-image-container" style="max-height:180px;">
                  <img src="${e.image}" class="post-image" alt="Thumbnail" referrerpolicy="no-referrer">
                </div>
              `),d.innerHTML=`
              <div class="post-header">
                <div class="post-meta">
                  <span class="community-badge" style="background:rgba(255,255,255,0.05); color:white;">c/${e.communityName}</span>
                  <span class="post-time">${window.App.formatRelativeTime(e.createdAt)}</span>
                </div>
              </div>

              <h3 class="post-title">${v(e.title)}</h3>
              <p class="post-content" style="max-height:80px; overflow:hidden; text-overflow:ellipsis;">${v(e.content)}</p>
              ${h}

              <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:12px; margin-top:8px;">
                <div style="display:flex; gap:10px; font-size:12px; color:var(--text-secondary);">
                  <span><i data-lucide="heart" style="width:12px; height:12px; display:inline-block; vertical-align:middle;"></i> ${i} to local upvotes</span>
                  <span><i data-lucide="message-square" style="width:12px; height:12px; display:inline-block; vertical-align:middle;"></i> ${I} replies</span>
                </div>

                <div style="display:flex; gap:8px;">
                  <button class="btn btn-sm btn-edit" data-id="${e.id}" data-title="${encodeURIComponent(e.title)}" data-content="${encodeURIComponent(e.content)}">
                    <i data-lucide="edit-2"></i> Edit
                  </button>
                  <button class="btn btn-sm btn-danger btn-delete" data-id="${e.id}">
                    <i data-lucide="trash-2"></i> Delete
                  </button>
                </div>
              </div>
            `,l.appendChild(d),d.querySelector(".btn-edit").addEventListener("click",c=>{const s=c.currentTarget;C(s.dataset.id,decodeURIComponent(s.dataset.title),decodeURIComponent(s.dataset.content))}),d.querySelector(".btn-delete").addEventListener("click",c=>{const s=c.currentTarget;E(s.dataset.id)})}),window.lucide.createIcons()})}function g(){l.innerHTML=`
          <div class="glass-card empty-state">
            <i data-lucide="folder-open"></i>
            <h3>No Contributions Yet</h3>
            <p>You haven't transmitted any broadcasts to feed streams yet.</p>
            <a href="create-post.html" class="btn btn-primary mt-12 btn-sm">
              <i data-lucide="plus"></i> Make First Broadcast
            </a>
          </div>
        `,window.lucide.createIcons()}function E(t){window.App.openPopup("Delete Post","Are you absolutely sure you want to delete this broadcast? This action cannot be reverted.",{icon:"⚠",type:"danger",confirmText:"Delete",cancelText:"Cancel",onConfirm:async()=>{const n=r(window.App.db,`${window.App.DB_ROOT}/posts/${t}`);try{await k(n),window.App.showToast("Broadcast de-referenced successfully.","success")}catch(o){console.error(o),window.App.showToast("Failed to remove node.","error")}}})}function C(t,n,o){m.value=t,u.value=n,w.value=o,p.style.display="flex",window.lucide.createIcons()}function f(){p.style.display="none"}A.addEventListener("click",f),x.addEventListener("submit",async t=>{t.preventDefault();const n=m.value,o=u.value.trim(),a=w.value.trim();if(!o||!a){window.App.showToast("Input cells cannot be empty.","error");return}window.App.setButtonLoading(y,!0);const e=r(window.App.db,`${window.App.DB_ROOT}/posts/${n}`);try{await L(e,{title:o,content:a}),window.App.showToast("Broadcast modified successfully.","success"),f()}catch(i){console.error(i),window.App.showToast("Failed to write updates.","error")}finally{window.App.setButtonLoading(y,!1)}});function v(t){return t?t.replace(/[&<>'"]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[n]||n):""}});
