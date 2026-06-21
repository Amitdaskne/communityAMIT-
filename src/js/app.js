import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut,
  sendEmailVerification
} from "firebase/auth";
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  update, 
  push, 
  child,
  onValue,
  off,
  remove,
  runTransaction
} from "firebase/database";

// 1. Firebase Configuration (Exposed exactly as requested)
const firebaseConfig = {
  apiKey: "AIzaSyALHFd8-PhTpNSn8ipHlLsQYeUjEiBDRMs",
  authDomain: "chat2-6bd92.firebaseapp.com",
  projectId: "chat2-6bd92",
  databaseURL: "https://chat2-6bd92-default-rtdb.firebaseio.com",
  storageBucket: "chat2-6bd92.appspot.com",
  messagingSenderId: "1052210817036",
  appId: "1:1052210817036:web:80674c39836371f46487e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// 2. Toast Notification System
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const dots = {
    info: '<span class="toast-dot info-dot"></span>',
    success: '<span class="toast-dot success-dot"></span>',
    error: '<span class="toast-dot error-dot"></span>'
  };
  const dotHtml = dots[type] || dots.info;

  toast.innerHTML = `
    ${dotHtml}
    <span class="toast-text">${message}</span>
    <button class="toast-close">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger reflow for slide animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Auto remove
  const autoClose = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);

  // Manual close
  toast.querySelector(".toast-close").addEventListener("click", () => {
    clearTimeout(autoClose);
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  });
}

// 3. Premium Button System / Ripple Effect
function initButtonRipple(button) {
  button.addEventListener("click", function (e) {
    // If disabled, skip ripple
    if (this.disabled) return;

    let x = e.clientX - e.target.getBoundingClientRect().left;
    let y = e.clientY - e.target.getBoundingClientRect().top;

    let ripple = document.createElement("span");
    ripple.className = "ripple-span";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 500);
  });
}

// Set dynamic loading state on a button
function setButtonLoading(button, isLoading, originalHTML = "") {
  if (isLoading) {
    button.disabled = true;
    const currentHTML = button.innerHTML;
    button.dataset.originalHtml = originalHTML || currentHTML;
    button.innerHTML = `<span class="btn-loading-spinner"></span> Please wait...`;
  } else {
    button.disabled = false;
    if (button.dataset.originalHtml) {
      button.innerHTML = button.dataset.originalHtml;
    }
  }
}

// Initialize components on load
function initUI() {
  // Inject Shared Elements
  injectSharedUI();

  // Inject Premium Popup markup
  injectPopupHTML();

  // Apply ripple to existing buttons
  document.querySelectorAll(".btn").forEach(button => {
    initButtonRipple(button);
  });

  // Render Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Generate shared headers, footers & bottom nav bars automatically
function injectSharedUI() {
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = `
      <header class="global-header" id="global-header-uid">
        <a href="index.html" class="header-brand" id="header-brand-uid">
          <i data-lucide="pocket"></i> CommunityAMIT
        </a>
      </header>
    `;
  }

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = `
      <footer class="global-footer" id="global-footer-uid">
        Powered By AMIT
      </footer>
    `;
  }

  const navPlaceholder = document.getElementById("nav-placeholder");
  if (navPlaceholder) {
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";

    navPlaceholder.innerHTML = `
      <nav class="bottom-nav" id="bottom-nav-uid">
        <a href="index.html" class="nav-item ${pageName === "index.html" ? "active" : ""}" id="nav-item-home">
          <i data-lucide="home"></i>
          <span>Home</span>
        </a>
        <a href="search.html" class="nav-item ${pageName === "search.html" ? "active" : ""}" id="nav-item-search">
          <i data-lucide="search"></i>
          <span>Search</span>
        </a>
        <a href="create-post.html" class="nav-item ${pageName === "create-post.html" ? "active" : ""}" id="nav-item-create">
          <i data-lucide="plus-square"></i>
          <span>Create</span>
        </a>
        <a href="notifications.html" class="nav-item ${pageName === "notifications.html" ? "active" : ""}" id="nav-item-notifications">
          <span style="position: relative; display: inline-flex; align-items: center; justify-content: center;">
            <i data-lucide="bell"></i>
            <span id="alerts-nav-badge-uid" style="position: absolute; top: -6px; right: -8px; background: #ea4335; color: #ffffff; border-radius: 50%; min-width: 16px; height: 16px; padding: 0 4px; font-size: 10px; font-weight: 900; font-family: 'Share Tech Mono', sans-serif; display: none; align-items: center; justify-content: center; box-shadow: 0 0 6px rgba(234, 67, 53, 0.7); border: 2px solid rgba(10, 10, 10, 0.95);"></span>
          </span>
          <span>Alerts</span>
        </a>
        <a href="chat.html" class="nav-item ${pageName === "chat.html" ? "active" : ""}" id="nav-item-chats">
          <span style="position: relative; display: inline-flex; align-items: center; justify-content: center;">
            <i data-lucide="message-square"></i>
            <span id="chats-nav-badge-uid" style="position: absolute; top: -6px; right: -8px; background: #ea4335; color: #ffffff; border-radius: 50%; min-width: 16px; height: 16px; padding: 0 4px; font-size: 10px; font-weight: 900; font-family: 'Share Tech Mono', sans-serif; display: none; align-items: center; justify-content: center; box-shadow: 0 0 6px rgba(234, 67, 53, 0.7); border: 2px solid rgba(10, 10, 10, 0.95);"></span>
          </span>
          <span>Chats</span>
        </a>
        <a href="profile.html" class="nav-item ${pageName === "profile.html" || pageName === "edit-profile.html" || pageName === "my-posts.html" || pageName === "saved-posts.html" ? "active" : ""}" id="nav-item-profile">
          <i data-lucide="user"></i>
          <span>Profile</span>
        </a>
      </nav>
    `;
  }
}

// 4. Cloudinary Multi-Media Storage
async function uploadImageToCloudinary(file, onProgress) {
  const cloudName = "dlsiskxua";
  const uploadPreset = "ml_default";
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

    if (onProgress && xhr.upload) {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data.secure_url);
        } catch (e) {
          reject(new Error("Failed to parse Cloudinary response"));
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData.error?.message || "Image upload failed"));
        } catch (e) {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during image upload"));
    };

    xhr.send(formData);
  });
}

// 5. Auth State Guard Check
const PROTECTED_PAGES = [
  "index.html",
  "profile.html",
  "search.html",
  "notifications.html",
  "create-post.html",
  "community.html",
  "post.html",
  "comments.html",
  "saved-posts.html",
  "my-posts.html",
  "edit-profile.html",
  "profile-view.html",
  "chat.html"
];

function checkPageAuth() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";

  const isProtected = PROTECTED_PAGES.includes(pageName);

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      if (isProtected) {
        showToast("Access Demanded — Authentic Credentials Required.", "error");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1200);
      }
    } else {
      // Enforce that user must have a profile picture in the DB
      const profileRef = ref(db, `${DB_ROOT}/users/${user.uid}`);
      try {
        const snap = await get(profileRef);
        if (snap.exists()) {
          const profile = snap.val();
          if (!profile.profilePicture) {
            const defaultPic = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(profile.username || user.uid)}`;
            await update(profileRef, { profilePicture: defaultPic });
          }
        }
      } catch (err) {
        console.error("Could not seed missing profilePicture:", err);
      }

      // Realtime listener for total unread direct message count
      try {
        const inboxRef = ref(db, `${DB_ROOT}/user_chats/${user.uid}`);
        onValue(inboxRef, (snapshot) => {
          let totalUnread = 0;
          if (snapshot.exists()) {
            const data = snapshot.val();
            Object.values(data).forEach(room => {
              if (room && typeof room.unreadCount === "number") {
                totalUnread += room.unreadCount;
              }
            });
          }

          const badgeEl = document.getElementById("chats-nav-badge-uid");
          if (badgeEl) {
            if (totalUnread > 0) {
              badgeEl.innerText = totalUnread; // Displays unread count, centered
              badgeEl.style.display = "flex";
            } else {
              badgeEl.innerText = "";
              badgeEl.style.display = "none";
            }
          }
        });
      } catch (err) {
        console.error("Failed to register unread chat counts subscription:", err);
      }

      // Realtime listener for total unread notifications/alerts count
      try {
        const notifListenerRef = ref(db, `${DB_ROOT}/notifications/${user.uid}`);
        onValue(notifListenerRef, (snapshot) => {
          let totalUnreadNotif = 0;
          if (snapshot.exists()) {
            const data = snapshot.val();
            Object.values(data).forEach(notif => {
              if (notif && notif.read === false) {
                totalUnreadNotif += 1;
              }
            });
          }

          const badgeEl = document.getElementById("alerts-nav-badge-uid");
          if (badgeEl) {
            if (totalUnreadNotif > 0) {
              badgeEl.innerText = totalUnreadNotif; // Displays unread notifications count, centered
              badgeEl.style.display = "flex";
            } else {
              badgeEl.innerText = "";
              badgeEl.style.display = "none";
            }
          }
        });
      } catch (err) {
        console.error("Failed to register unread alerts subscription:", err);
      }

      // User is logged in. Check if email is verified
      // Wait: we only enforce verification if email verification checks are requested
      if (!user.emailVerified && isProtected && pageName !== "login.html" && pageName !== "register.html") {
        // Redir if verified flag is false on firebase
        showToast("Email address must be verified first.", "error");
        setTimeout(() => {
          signOut(auth).then(() => {
            window.location.href = "login.html";
          });
        }, 1500);
      }
    }
  });
}

// 6. DB Helper Utilities (Always within communityAMIT/)
const DB_ROOT = "communityAMIT";

async function pushNotification(uid, text, relativeUrl = "#") {
  if (!uid) return;
  const notificationsRef = ref(db, `${DB_ROOT}/notifications/${uid}`);
  const newNotifRef = push(notificationsRef);
  await set(newNotifRef, {
    id: newNotifRef.key,
    text: text,
    relativeUrl: relativeUrl,
    read: false,
    createdAt: Date.now()
  });
}

// Format Unix Timestamp nicely
function formatRelativeTime(timestamp) {
  if (!timestamp) return "just now";
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Global confirm callbacks
let currentConfirmCallback = null;
let currentCancelCallback = null;

function injectPopupHTML() {
  if (!document.getElementById("bottom-sheet-backdrop")) {
    const sheetDiv = document.createElement("div");
    sheetDiv.className = "sheet-backdrop";
    sheetDiv.id = "bottom-sheet-backdrop";
    sheetDiv.innerHTML = `
      <div class="sheet">
        <div class="sheet-handle"></div>
        <div class="sheet-title" id="sheet-title-text">Premium Action</div>
        <div class="sheet-desc" id="sheet-desc-text">Modern animated bottom sheet popup with glassmorphic style and smooth spring animation.</div>
        <div class="sheet-actions" id="sheet-actions-container">
          <button class="sheet-btn sheet-cancel">Cancel</button>
          <button class="sheet-btn primary sheet-confirm">Continue</button>
        </div>
      </div>
    `;
    document.body.appendChild(sheetDiv);
    
    // Close on backdrop click (outside click)
    sheetDiv.addEventListener("click", (e) => {
      if (e.target.id === "bottom-sheet-backdrop") {
        closePopup();
      }
    });
  }
}

function openPopup(
  title = "Premium Action",
  message = "Modern animated bottom sheet popup with glassmorphic style.",
  options = {}
) {
  // Ensure the bottom sheet exists
  injectPopupHTML();

  const backdrop = document.getElementById("bottom-sheet-backdrop");
  if (!backdrop) return;

  const titleEl = document.getElementById("sheet-title-text");
  const descEl = document.getElementById("sheet-desc-text");
  const actionsContainer = document.getElementById("sheet-actions-container");

  if (titleEl) titleEl.innerText = title;
  if (descEl) descEl.innerText = message;

  // Clear and dynamically reconstruct buttons to avoid stale listener leakage
  if (actionsContainer) {
    actionsContainer.innerHTML = "";

    const showCancel = (typeof options === "object" && options !== null) ? options.showCancel !== false : true;
    const cancelText = (typeof options === "object" && options !== null) ? (options.cancelText || "Cancel") : "Cancel";
    const confirmText = (typeof options === "object" && options !== null) ? (options.confirmText || "Continue") : "Continue";
    const isDanger = (typeof options === "object" && options !== null) && 
      (options.type === "danger" || options.type === "error" || options.icon === "⚠");

    let cancelBtn = null;
    if (showCancel) {
      cancelBtn = document.createElement("button");
      cancelBtn.className = "sheet-btn sheet-cancel";
      cancelBtn.innerText = cancelText;
      actionsContainer.appendChild(cancelBtn);
    }

    const confirmBtn = document.createElement("button");
    confirmBtn.className = `sheet-btn ${isDanger ? "danger" : "primary"} sheet-confirm`;
    confirmBtn.innerText = confirmText;
    actionsContainer.appendChild(confirmBtn);

    // Save callbacks (safeguarding for callbacks)
    if (typeof options === "object" && options !== null) {
      currentConfirmCallback = options.onConfirm || null;
      currentCancelCallback = options.onCancel || null;
    } else {
      currentConfirmCallback = null;
      currentCancelCallback = null;
    }

    // Attach click events & trigger beautiful ripple systems
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        if (currentCancelCallback) {
          currentCancelCallback();
        }
        closePopup();
      });
      initButtonRipple(cancelBtn);
    }

    confirmBtn.addEventListener("click", () => {
      if (currentConfirmCallback) {
        currentConfirmCallback();
      }
      closePopup();
    });
    initButtonRipple(confirmBtn);
  }

  // Set visible on next microtick
  backdrop.classList.add("show");
}

function closePopup() {
  const backdrop = document.getElementById("bottom-sheet-backdrop");
  if (backdrop) {
    backdrop.classList.remove("show");
  }
}

// Dynamic elegant Full-page Loading overlay
function createPageLoader() {
  // Prevent duplicate loaders
  if (document.getElementById("page-loader-overlay-id")) return;

  const overlay = document.createElement("div");
  overlay.id = "page-loader-overlay-id";
  overlay.className = "page-loader-overlay";
  overlay.innerHTML = `
    <div class="loader-container">
      <div class="loader-circle-wrapper">
        <div class="loader-outer-ring"></div>
        <div class="loader-inner-ring"></div>
        <div class="loader-core"></div>
      </div>
      <p class="loader-text">SYNCING_SECURE_NODE</p>
      <p class="loader-subtext">COMMUNITYAMIT // RESOLVING_PAYLOAD</p>
    </div>
  `;
  document.body.appendChild(overlay);

  // Maximum loading timeout safety (e.g. 1000ms) to guarantee no frozen screens
  setTimeout(() => {
    hideLoader();
  }, 1000);
}

function hideLoader() {
  const overlay = document.getElementById("page-loader-overlay-id");
  if (overlay && !overlay.classList.contains("hidden")) {
    overlay.classList.add("hidden");
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 450);
  }
}

// Set global exposures for script compatibility
window.openPopup = openPopup;
window.closePopup = closePopup;

// Expose full application API to window
window.App = {
  auth,
  db,
  DB_ROOT,
  showToast,
  initButtonRipple,
  setButtonLoading,
  uploadImageToCloudinary,
  pushNotification,
  formatRelativeTime,
  initUI,
  openPopup,
  closePopup,
  createPageLoader,
  hideLoader,
  signOutUser: () => signOut(auth).then(() => { window.location.href = "login.html"; })
};

// Global high-performance page transition interceptor
function initPageTransitions() {
  if (!document.getElementById("top-loading-bar")) {
    const bar = document.createElement("div");
    bar.id = "top-loading-bar";
    bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 0%;
      background: #ffffff;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
      z-index: 99999;
      transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    `;
    document.body.appendChild(bar);
  }

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript:") || anchor.target === "_blank") {
      return;
    }

    try {
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }
    } catch (err) {
      return;
    }

    e.preventDefault();

    const bar = document.getElementById("top-loading-bar");
    if (bar) {
      bar.style.width = "45%";
      setTimeout(() => {
        bar.style.width = "88%";
      }, 80);
    }

    const appContainer = document.querySelector(".app-container");
    const globalFooter = document.querySelector(".global-footer");

    if (appContainer) {
      appContainer.style.transition = "opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1), transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)";
      appContainer.style.opacity = "0";
      appContainer.style.transform = "translateY(-6px)";
    }
    if (globalFooter) {
      globalFooter.style.transition = "opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1)";
      globalFooter.style.opacity = "0";
    }

    // Fallback to body only if app-container is not found
    if (!appContainer) {
      document.body.style.transition = "opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1)";
      document.body.style.opacity = "0";
    }

    setTimeout(() => {
      window.location.href = href;
    }, 180);
  });
}

// Auto-run guard & UI initializer on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  createPageLoader();
  checkPageAuth();
  initPageTransitions();
  initUI();
});
