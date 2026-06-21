import{o as h,r as a,a as m,b as v,u as p}from"./app-DSFfU5DC.js";document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("notifications-stream-container"),w=document.getElementById("btn-clear-notifications-id");let d=null;h(window.App.auth,e=>{e&&(d=e.uid,l())});function l(){const e=a(window.App.db,`${window.App.DB_ROOT}/notifications/${d}`);m(e,i=>{if(c.innerHTML="",!i.exists()){s(),window.App&&window.App.hideLoader&&window.App.hideLoader();return}const r=i.val(),n=Object.keys(r).map(t=>({id:t,...r[t]})).sort((t,o)=>o.createdAt-t.createdAt);if(n.length===0){s(),window.App&&window.App.hideLoader&&window.App.hideLoader();return}n.forEach(t=>{const o=document.createElement("a");o.href=t.relativeUrl||"#",o.className=`notification-item ${t.read?"":"unread"}`,o.innerHTML=`
              <div class="notification-text">
                <div style="font-weight: 500; font-size:14px; color:white;">${f(t.text)}</div>
                <div class="notification-time">${window.App.formatRelativeTime(t.createdAt)}</div>
              </div>
              <i data-lucide="arrow-right-circle" style="color:var(--text-muted); width:18px; height:18px;"></i>
            `,c.appendChild(o),o.addEventListener("click",()=>{if(!t.read){const A=a(window.App.db,`${window.App.DB_ROOT}/notifications/${d}/${t.id}`);p(A,{read:!0})}})}),u(n),window.lucide.createIcons(),window.App&&window.App.hideLoader&&window.App.hideLoader()})}function s(){c.innerHTML=`
          <div class="glass-card empty-state">
            <i data-lucide="bell" style="color: var(--text-muted);"></i>
            <h3>Portal Clear</h3>
            <p>Your notification metrics are quiet. You have zero active system alerts.</p>
          </div>
        `,window.lucide.createIcons(),window.App&&window.App.hideLoader&&window.App.hideLoader()}async function u(e){const i=e.filter(n=>!n.read);if(i.length===0)return;const r={};i.forEach(n=>{r[`${window.App.DB_ROOT}/notifications/${d}/${n.id}/read`]=!0});try{await p(a(window.App.db),r)}catch(n){console.error(n)}}w.addEventListener("click",async()=>{if(!d)return;const e=a(window.App.db,`${window.App.DB_ROOT}/notifications/${d}`);try{await v(e),window.App.showToast("Alert node cleared.","success")}catch(i){console.error(i),window.App.showToast("Could not clear notification node.","error")}});function f(e){return e?e.replace(/[&<>'"]/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[i]||i):""}});
