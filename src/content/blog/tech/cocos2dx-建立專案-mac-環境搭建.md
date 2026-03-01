---
title: "Cocos2dx 建立專案 - Mac 環境搭建"
description: "Step1. 官網下載cocos2dx 的 SDK 下載連結： http://www.cocos.com/download/ 文章使用的版本為 v3.7 Step2. 打開Terminal Step3. 在Terminal進入SDK所在的目錄下的 tools/cocos2d-console/bin/ 輸入 cd Downloads/cocos2d-x-3.7/tools/cocos2d-conso"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "http://user-image.logdown.io/user/1500/blog/12948/post/287805/OwlH843CROyjp6ph8ZCA_terminal.png"
---

* Step1. 官網下載cocos2dx 的 SDK

下載連結： <http://www.cocos.com/download/> 文章使用的版本為 v3.7 

  * Step2. 打開Terminal

![](http://user-image.logdown.io/user/1500/blog/12948/post/287805/OwlH843CROyjp6ph8ZCA_terminal.png)

  * Step3. 在Terminal進入SDK所在的目錄下的 tools/cocos2d-console/bin/

![](http://user-image.logdown.io/user/1500/blog/12948/post/287805/wOHP1hSqKAJMdaPq9QzX_%E6%9C%AA%E5%91%BD%E5%90%8D.png) 輸入 cd Downloads/cocos2d-x-3.7/tools/cocos2d-console/bin/ 

  * Step4. 取得 cocos.py 的權限

輸入 chmod u+x ./cocos.py 
  * Step5 建立專案

![](http://user-image.logdown.io/user/1500/blog/12948/post/287805/TTzi1iaStaucHvMAMeXd_%E6%9C%AA%E5%91%BD%E5%90%8D.png) 輸入 ./cocos.py new testProjectName -p com.lirise -l cpp -d ~/Desktop 

> testProjectName 為專案名稱, com.lirise 為Bundle ID, 最後一項是建立專案的地點

  * Step6 環境搭建完成

![](http://user-image.logdown.io/user/1500/blog/12948/post/287805/Ek9jiyzQgOUzHx9ASriQ_%E6%9C%AA%E5%91%BD%E5%90%8D.png)

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
