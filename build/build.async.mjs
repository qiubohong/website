import { defineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'

/**
 * 生成
 * @param {*} cssCode 
 * @param {*} styleId 
 * @returns 
 */
function injectCssIntoHtml(cssCode, styleId) {
    cssCode = '`'+cssCode+'`'
    const styleHtml = `
    ;(function(){ 
        try {
            var elementStyle = document.createElement(\'style\'); 
            var styleNode = document.createTextNode(${cssCode});
            elementStyle.appendChild(styleNode);
            elementStyle.id = "${styleId | Date.now()}";
            document.head.appendChild(elementStyle);
        }catch(e){
            console.error(\'vite-plugin-css-injected-by-js\', e);
        }
    })();
    `.replace(/\n/g, '') // 简单压缩
    return styleHtml;
}

/**
 * 将组件样式注入js中，generateBundle 是Rollup的hook函数，时间点在bundle资源生成末尾，write写入之前调用
 * 大概实现原理，在构建bundle中，去掉css的资源生成，将其代码通过js代码进行实现
 * @param {*} styleId 样式id
 */
function VitePluginStyleInject(styleId) {
    let styleCode = '';

    return {
        name: 'vite-plugin-style-inject', // 插件名称
        apply: 'build', // 应用模式
        enforce: 'post', // 作用阶段
        generateBundle: function (opts, bundle) {
            // + 遍历bundle
            for (const key in bundle) {
                if (bundle[key]) {
                    const chunk = bundle[key]; // 拿到文件名对应的值
                    // 判断+提取+移除
                    if (chunk.type === 'asset' && chunk.fileName.includes('.css')) {
                        styleCode += chunk.source;
                        console.log('key:', key, styleCode + " ========>")
                        delete bundle[key];
                    }
                }
            }

            // 找到对应js资源，将生成的styleCode写入
            const styleTemplate = injectCssIntoHtml(styleCode, styleId); 
            for (const key in bundle) {
                const chunk = bundle[key]
                if(chunk && chunk.type === 'chunk' && chunk.fileName.match(/.[cm]?js$/) !== null){
                    const initialCode = chunk.code; // 保存原有代码
                    // 拼接原有代码
                    chunk.code = styleTemplate + initialCode 
                    // 一个bundle插入一次即可
                    break; 
                }
            }
        }
    };
}

/**
 * 获取需要编译的入口组件列表
 * @returns 
 */
const getBuildItems = () => {
    return [
        {
            entry: path.resolve('./src/components/Async.vue'), // 入口文件地址
            name: 'AsyncComponent', // 组件名称
        },
        {
            entry: path.resolve('./src/components/ListWebSite.vue'),
            name: 'ListWebSite',
        }
    ]
}

const buildItems = getBuildItems()

buildItems.forEach(item => {
    build({
        configFile: false,
        resolve: {
            alias: {
                '@': '/src',
                'vue': 'vue/dist/vue.esm-bundler.js'
            },
        },
        plugins: [
            vue(),
            VitePluginStyleInject(),
        ],
        publicDir: false, // 忽略public资源包
        build: {
            cssCodeSplit: false, // 禁用 CSS 代码分割
            lib: {
                entry: item.entry,
                formats: ['umd'],
                name: item.name
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    entryFileNames: () => '[name].[format].js',
                    assetFileNames: `[name].[ext]`,
                    globals: {
                        vue: 'Vue',
                    },
                    dir: `dist/remote/${item.name}`, // 固定到对应文件夹中
                },
            },
        }

    })
})
