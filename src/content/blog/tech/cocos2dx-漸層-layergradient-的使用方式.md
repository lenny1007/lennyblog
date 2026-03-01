---
title: "Cocos2dx - 漸層 LayerGradient 的使用方式"
description: "功能簡介 LayerGradient 漸層， 可以設置兩種顏色的漸變效果 LayerColor 一個純色的容器 下方為兩種不同的效果圖： LayerGradient LayerColor LayerGradient 為例， 創建函式有下面兩種， 通常會使用第二種， 前兩個為漸層的兩個顏色， 第三個參數是方向 /** Creates a full-screen Layer with a gradie"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/Cocos2dx%20-%20%E6%BC%B8%E5%B1%A4%20LayerGradient%20%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F%20technology%20code%20programming%20dark%20minimal%20high%20quality%20blog%20cover%20photo?width=800&height=450&nologo=true"
---

## 功能簡介

  * LayerGradient 漸層， 可以設置兩種顏色的漸變效果
  * LayerColor 一個純色的容器

下方為兩種不同的效果圖： 

### LayerGradient

![](http://user-image.logdown.io/user/1500/blog/12948/post/292842/nW6Gwq8iRIuvMHaYZ46K_%E6%9C%AA%E5%91%BD%E5%90%8D%202.png)

### LayerColor

![](http://user-image.logdown.io/user/1500/blog/12948/post/292842/ykJSAVs0R9GZD769rBcT_%E6%9C%AA%E5%91%BD%E5%90%8D.png) LayerGradient 為例， 創建函式有下面兩種， 通常會使用第二種， 前兩個為漸層的兩個顏色， 第三個參數是方向 
    
    
    /** Creates a full-screen Layer with a gradient between start and end. */
        static LayerGradient* create(const Color4B& start, const Color4B& end);
    /** Creates a full-screen Layer with a gradient between start and end in the direction of v. */
        static LayerGradient* create(const Color4B& start, const Color4B& end, const Point& v);
    

#### 範例 ： 想要設定一個藍色到紅色的漸層， 由上而下
    
    
        auto gLayer = LayerGradient::create(Color4B::BLUE, Color4B::RED, Vec2(0, -1));
    

![](http://user-image.logdown.io/user/1500/blog/12948/post/292842/FHtuBsnkSAaM2zjIHLR8_%E6%9C%AA%E5%91%BD%E5%90%8D.png) 當然與一般的Node 相同， 可以透過 setContentSize 來設定該節點的大小， 以及 Position 來設定位置 
    
    
        gLayer->setContentSize(Size(200, 200));
        gLayer->setPosition(10, 50);
    

![](http://user-image.logdown.io/user/1500/blog/12948/post/292842/xjqPHahZQMGEo6waljwQ_%E6%9C%AA%E5%91%BD%E5%90%8D.png) 小結： 基本上漸層的使用方式與一般節點雷同， 比較特別的應用也許是搭配 ClippingNode 做出可以移動的漸層當作 畫面呈現的一部分， 像是卡牌的雷射塗層。 但 2DX 的圖層 Blending 是使用疊加的方式， 所以看起來會比較黯淡， 需要做特別的調整。 BTW, 漸層可以設定透明度 。 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
