import { defineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'

console.log(path.resolve(__dirname, './src/components/Async.vue'))

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [TDesignResolver({
    //     library: 'vue-next'
    //   })],
    // }),
    // Components({
    //   resolvers: [TDesignResolver({
    //     library: 'vue-next'
    //   })],
    // }),
  ],
  publicDir: false, // 忽略public资源包
  build: {
    cssCodeSplit: false, // 禁用 CSS 代码分割
    lib: {
      entry: {
        'AsyncComponent': './src/components/Async.vue',
        'ListWebSite': './src/components/ListWebSite.vue'
      },
      formats: ['es'],
      name: '[name]',
      fileName: '[name]'
    },
    rollupOptions: {
      // input: {
      //   Async: path.resolve(__dirname, './src/components/Async.vue'),
      // },
      external: ['vue'],
      output: {
        // format: 'umd',
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        // preserveModules: false,
        globals: {
          vue: 'Vue',
        },
        dir: 'dist/remote',
      },
    },
  },
})
