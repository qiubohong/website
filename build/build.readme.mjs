import {
    readFileSync,
    writeFileSync
} from 'fs'

import path from 'path'

import { fileURLToPath } from 'url';

// 解决ES6 Module中没有 __dirname的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const websites = JSON.parse(readFileSync(path.resolve(__dirname, '../public/website.json')).toString())

const titleMap = {
    "self": "个人网站",
    "today": "每日必学",
    "book": "在读书籍",
    "blog": "博客收集",
    "framework": "开源框架",
    "learn": "学习资源",
    "week": "技术周刊",
    "lowcode": "低代码相关",
    "time": "定期重温学习",
    "other": "其他收集",
    "jobs": "找工作",
}

const statusMap = {
    "0": "未读",
    "1": "在读",
    "2": "读完",
}

const readeMe = `
# 个人收集网站
主要收集如下：
${Object.keys(titleMap).map(key => {
    const t = `
##${titleMap[key]}
|  标题   | 描述  | 访问链接 | 状态 |
|  ----  | ----  |  ----  | ----  |
${websites[key].map(item => {
        return `|${item.title}|${item.description}|${item.url}|${statusMap[item.status + ''] || ""}`
    }).join('\n')
        }
`
    return t;
}).join('\n')}
`

writeFileSync(path.resolve(__dirname, '../README.md'), readeMe)