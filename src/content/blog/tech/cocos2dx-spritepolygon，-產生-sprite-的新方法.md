---
title: "Cocos2dx - SpritePolygon， 產生 Sprite 的新方法"
description: "前一陣子看到的這個新玩意， 說新其實也不新了， 是v3.6 釋出的一個新類別， 目前經由實測後是相對穩定。 主要是透過 AutoPolygon 這個幫助類別， 來產生關於 Polygon 的資訊， 再丟入原先的Sprite類別繪製圖形。 // 自動產生多邊形的資訊 auto pinfo = AutoPolygon::generatePolygon(\"filename.png\"); // 透過多邊形"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/Cocos2dx%20-%20SpritePolygon%EF%BC%8C%20%E7%94%A2%E7%94%9F%20Sprite%20%E7%9A%84%E6%96%B0%E6%96%B9%E6%B3%95%20technology%20code%20programming%20dark%20minimal%20high%20quality%20blog%20cover%20photo?width=800&height=450&nologo=true"
---

前一陣子看到的這個新玩意， 說新其實也不新了， 是v3.6 釋出的一個新類別， 目前經由實測後是相對穩定。 主要是透過 AutoPolygon 這個幫助類別， 來產生關於 Polygon 的資訊， 再丟入原先的Sprite類別繪製圖形。 
    
    
    // 自動產生多邊形的資訊
    auto pinfo = AutoPolygon::generatePolygon("filename.png");
    // 透過多邊形資訊產生 Sprite
    auto spp = Sprite::create(pinfo);
    

## 什麼是 SpritePolygon ?

SpritePolygon 基本上可以視作原先 Sprite 的替代品， 不同於原先的 Sprite 由兩個三角形所組成， SpritePolygon 由許多個三角形將圖形繪製而成。 ![](http://user-image.logdown.io/user/1500/blog/12948/post/297093/DTfSKF29SyWxIPaFBm7Q_polygonsprite.png) 根據 “官方” 的說法， 使用 SpritePolygon 主要是為了效率的提升。 也就是 SpritePolygon 可以降低圖片的 fill rate， 這個值主要會影響 fps 以及記憶體的使用， 在手機的開發來說， 是很重要的一個指標。 基本上 GPU 是為了 3D 圖形所設計的， 可以處理大量的多邊形頂點 (vertices)， 但對於 2D 像素的填充率的處理就較為疲軟， 之前的 Sprite 是將所有讀入的圖片都當作長方形來處理， 也就是說， 如果圖片有透明的部分如上面的圖， GPU 就會浪費資源在繪製透明的部分 。 拿上面的圖當作例子， 左邊的部分是一個正常的 Sprite， 右邊的部分是一個相同的圖， 但由15個三角形與17的頂點所組成。 而左邊的原始 Sprite 為 10285 個像素， 右邊的僅有 3401 個像素， 約莫是 67% 的像素被省下來了。 

## PolygonSprite 比起原先的 Sprite 快， 但差多少呢？

下圖為官方提供的數據 ![](http://user-image.logdown.io/user/1500/blog/12948/post/297093/YWiaZlTQQOnKehAaNhIm_1423528cff_690x149.png) 實驗的方式是透過新增 Sprite 在螢幕上直到 fps 降到 40， 上面的數據是多少個 SpritePolygon 或 Sprite 可以穩定地跑在 40 fps 。 數據上看來， PolygonSprite 是省了相當多的資源， 是可以在實作上嘗試使用的差距。 畢竟， 需要改的程式碼也不多， 不是嗎？ 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)

* * *
