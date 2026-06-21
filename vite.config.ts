import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: false,
      watch: null,
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          login: path.resolve(__dirname, 'login.html'),
          register: path.resolve(__dirname, 'register.html'),
          profile: path.resolve(__dirname, 'profile.html'),
          editProfile: path.resolve(__dirname, 'edit-profile.html'),
          createPost: path.resolve(__dirname, 'create-post.html'),
          comments: path.resolve(__dirname, 'comments.html'),
          post: path.resolve(__dirname, 'post.html'),
          community: path.resolve(__dirname, 'community.html'),
          search: path.resolve(__dirname, 'search.html'),
          myPosts: path.resolve(__dirname, 'my-posts.html'),
          savedPosts: path.resolve(__dirname, 'saved-posts.html'),
          notifications: path.resolve(__dirname, 'notifications.html'),
          profileView: path.resolve(__dirname, 'profile-view.html'),
        }
      }
    }
  };
});
