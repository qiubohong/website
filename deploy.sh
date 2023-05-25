source ~/.bash_profile
nvm use v14.21.3
yarn build
git add . *
git commit -m "update"
git push

rsync -av -e ssh  //Users/borfyqiu/Desktop/study/github/website/dist/* root@1.13.188.124:/data/borfyqiu.oa.com/