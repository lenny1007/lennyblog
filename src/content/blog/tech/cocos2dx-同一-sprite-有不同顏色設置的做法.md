---
title: "Cocos2dx - 同一 Sprite 有不同顏色設置的做法"
description: "前一陣子在做將同一個圖片精靈， 透過不同的渲染顏色， 得到類似但不同顏色的圖的效果時， 發現以 Cocos2dx 原生內建的 SetColor 函式並無法很好地實現該功能。 簡單說， 左圖是原圖， Cocos2dx 的 setColor 函式會得到中間的結果， 但理想的結果是右邊的圖時， 我們可以怎麼做。 後來在網路上搜尋找到有可以使用的類別， 主要的功能是針對 cocos2d::Sprite 色"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "http://user-image.logdown.io/user/1500/blog/12948/post/310750/BscCFB3US2iD3gc4yLQl_68747470733a2f2f7261772e6769746875622e636f6d2f616c65783331342f626c6f625f66696c65732f6d61737465722f696d616765732f4343537072697465576974684875654578616d706c652e706e67.png"
---

前一陣子在做將同一個圖片精靈， 透過不同的渲染顏色， 得到類似但不同顏色的圖的效果時， 發現以 Cocos2dx 原生內建的 SetColor 函式並無法很好地實現該功能。 ![](http://user-image.logdown.io/user/1500/blog/12948/post/310750/BscCFB3US2iD3gc4yLQl_68747470733a2f2f7261772e6769746875622e636f6d2f616c65783331342f626c6f625f66696c65732f6d61737465722f696d616765732f4343537072697465576974684875654578616d706c652e706e67.png) 簡單說， 左圖是原圖， Cocos2dx 的 setColor 函式會得到中間的結果， 但理想的結果是右邊的圖時， 我們可以怎麼做。 後來在網路上搜尋找到有可以使用的類別， 主要的功能是針對 cocos2d::Sprite 色調的修改，達到一套纹理可以重複利用的目的，對於一些只需在颜色上換裝的遊戲而言，很方便。 這邊就簡單介紹使用的方式， 已經實作類別確認可以使用。 效果如下 ![](http://user-image.logdown.io/user/1500/blog/12948/post/310750/VBkwTy0DQGu7RaqHQFBg_Simulator%20Screen%20Shot%202015%E5%B9%B411%E6%9C%889%E6%97%A5%20%E4%B8%8B%E5%8D%884.24.55.png)

### [Github 連結](<https://github.com/fusijie/SpriteWithHue>)

小結： 很好用 XD， 很適合作為 Sprite 的補充類別。 感谢作者 fusijie 以及 Alex314 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
