yarn build
git add . *
git commit -m "update"
git push

rsync -av -e ssh  /Users/borfyqiu/Desktop/study/self/website/dist/* root@1.13.188.124:/data/qborfy.com/borfyqiu.oa.com/