source ~/.bash_profile
nvm use v18.16.0
# 生成readme
node build/build.readme.mjs
# 构建
yarn build
git add . *
git commit -m "update"
git push

# rsync同步
rsync -av -e ssh  /Users/borfyqiu/Desktop/study/github/website/dist/* root@1.13.188.124:/data/borfyqiu.oa.com/