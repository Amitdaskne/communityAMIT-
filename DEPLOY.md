# Auto Deployment Pipelines & Instructions

This repository is equipped with fully automated continuous integration & continuous deployment (CI/CD) pipelines inside `.github/workflows` to enable zero-downtime automated builds and deployments.

---

## 🚀 Option 1: Automatic Deployment to GitHub Pages

GitHub Pages is the easiest static hosting option for this application. It is 100% free.

### How to use:
1. Push this code to your **GitHub Repository** on the `main` or `master` branch.
2. Under your repository settings page:
   - Go to **Settings** > **Actions** > **General**.
   - Under **Workflow permissions**, select **"Read and write permissions"** (required so the runner can publish the static pages) and hit **Save**.
3. Under **Settings** > **Pages**:
   - In the **Build and deployment** section, set the Source to **"Deploy from a branch"**.
   - Once the action runs, select `gh-pages` branch and `/ (root)` folder, then hit **Save**.
4. Push any change to the `main` or `master` branch. GitHub will automatically:
   - Check and lint the styles/scripts.
   - Compile production assets into the `dist` folder.
   - Push and host your app live on GitHub Pages!

---

## 🔥 Option 2: Automatic Deployment to Firebase Hosting

Since this platform depends on Firebase Database & Auth configs, you can auto-deploy direct to highly performant Firebase CDN nodes.

### Setup Steps:
1. Open your terminal or console, install Firebase local tools if you haven't:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and initialize the project link:
   ```bash
   firebase login
   firebase init hosting
   ```
   *Note: Choose the existing project matching your database configuration. Specify **`dist`** as your public directory and answer **`Yes`** to configuring as a single-page app.*
3. Generate a secure deployment Token for GitHub:
   ```bash
   firebase login:ci
   ```
   *Or utilize a Firebase Service Account key.*
4. Place the credentials inside GitHub Repository secrets:
   - Go to your GitHub repository > **Settings** > **Secrets and variables** > **Actions**.
   - Create a new secret called `FIREBASE_SERVICE_ACCOUNT` containing your Firebase credentials/keys.
5. Pushing changes directly compiles and deploys to production live channels containerized by Firebase SSL instantly!

---

## 🐳 Option 3: Standard Docker Container Placement

If you want to deploy on container networks such as **Google Cloud Run**, Vercel, VPS nodes, Azure or AWS ECS:
1. Run local container tests:
   ```bash
   docker build -t community-app .
   docker run -p 3000:3000 community-app
   ```
2. Access the container directly via your browser at `http://localhost:3000`. The embedded production-grade Nginx package handles all SPA routing paths correctly.
