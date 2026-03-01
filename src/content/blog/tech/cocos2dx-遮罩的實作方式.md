---
title: "Cocos2dx - 遮罩的實作方式"
description: "遮罩的實作方式有很多種， 最常見的是下面兩種: 1. 透過 OPENGLES 底層將圖讀入， 畫出遮罩範圍的圖 Texture 後， 再將該 Texture 設定回 Sprite 參見官網 ： 如何使用COCOS2D-X3.0来给SPRITE添加遮罩 對於這樣的方式畫出遮罩， 主要的缺點在於會佔據不少的記憶體資源， 因為每次每次應用遮罩時， 多會額外創建一張 Texture進記憶體， 除此外， R"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "http://user-image.logdown.io/user/1500/blog/12948/post/292844/eMDXmNHStm6MAAR5Qfwy_Calendar2.png"
---

遮罩的實作方式有很多種， 最常見的是下面兩種: 

#### 1\. 透過 OPENGLES 底層將圖讀入， 畫出遮罩範圍的圖 Texture 後， 再將該 Texture 設定回 Sprite

參見官網 ： 如何使用COCOS2D-X3.0来给SPRITE添加遮罩 對於這樣的方式畫出遮罩， 主要的缺點在於會佔據不少的記憶體資源， 因為每次每次應用遮罩時， 多會額外創建一張 Texture進記憶體， 除此外， Render的代價也不小， 如果是大量的使用的話， 會影響性能， 用起來會卡。 程式碼如下： 
    
    
    Sprite* HelloWorld::maskedSpriteWithSprite(Sprite* textureSprite, Sprite* maskSprite)
    {
        RenderTexture * rt = RenderTexture::create( maskSprite->getContentSize().width, maskSprite->getContentSize().height );
        maskSprite->setPosition(maskSprite->getContentSize().width/2, maskSprite->getContentSize().height/2);
        textureSprite->setPosition(textureSprite->getContentSize().width/2,
                               textureSprite->getContentSize().height/2);
        maskSprite->setBlendFunc( BlendFunc{GL_ONE, GL_ZERO} );
        textureSprite->setBlendFunc( BlendFunc{GL_DST_ALPHA, GL_ZERO} );
        rt->begin();
        maskSprite->visit();
        textureSprite->visit();
        rt->end();
        Sprite *retval = Sprite::createWithTexture(rt->getSprite()->getTexture());
        retval->setFlippedY(true);
        return retval;
    }
    

#### 2\. 透過 ClippingNode 畫出所需要的圖

參見官網 ： CLIPPINGNODE的使用 基本內容就不多復述了， ClippingNode 可以選擇要畫出 Stencil （模板） 內的圖， 或者是模板以外的圖， 所以可以弄出很多很特別的效果， 甚至是可以設定繪製底圖的 alpha 值， 讓畫面根據透明度繪圖。 以例子1的圖來說 (底圖) ![](http://user-image.logdown.io/user/1500/blog/12948/post/292844/eMDXmNHStm6MAAR5Qfwy_Calendar2.png) (stencil圖) 可以視為Mask遮罩 ![](http://user-image.logdown.io/user/1500/blog/12948/post/292844/FmKtWYCCTWY5XoRyU4R3_CalendarMask.png) （效果圖） ![](http://user-image.logdown.io/user/1500/blog/12948/post/292844/yNvEPREXRUGypvuoVjg0_course_screenshot3%20\(1\).png) 小結： 如果對於 OPENGLES 底層的指令不熟， 就選擇使用 ClippingNode來做到相同的效果吧， 當然， 如果熟的話， 就可以自製許多特效而不需要受限於 ClippingNode 跟遮罩的功能了。 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
