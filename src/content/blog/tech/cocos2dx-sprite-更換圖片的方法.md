---
title: "Cocos2dx - Sprite 更換圖片的方法"
description: "Cocos2dx 中 Sprite 的使用是很重要的一環， 其中關於換掉Sprite舊有圖片的做法有許多種。 網路上常見的兩種方法 參考連結 基本上網路上的做法為更換掉 Sprite 中的Texture, 或者將 SpriteFrame 中的DisplayFrame 換掉。 但必須得說， 這些做法都相對麻煩， 而且就效率來說與新建一張Sprite的成本， 差距不大。 於是有些時候我會採用下面的做法"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

Cocos2dx 中 Sprite 的使用是很重要的一環， 其中關於換掉Sprite舊有圖片的做法有許多種。 

### 網路上常見的兩種方法

  * [參考連結](<http://blog.csdn.net/hitwhylz/article/details/9445593>)

基本上網路上的做法為更換掉 Sprite 中的Texture, 或者將 SpriteFrame 中的DisplayFrame 換掉。 但必須得說， 這些做法都相對麻煩， 而且就效率來說與新建一張Sprite的成本， 差距不大。 於是有些時候我會採用下面的做法。 

### 新建一張Sprite, 將裡面的Texture貼回需要替換的Sprite
    
    
    Sprite *newSprite = Sprite::create("newImage.png");
    oldSprite->setTexture(newSprite->getTexture());
    

  * 限制： 更換Sprite 的 Texture時， 需要注意如果是更新有相同名稱的圖檔時， 需要先將舊有的 Cache清除， 不然使用相同名稱時， 會取成舊有Cache中的 Texture檔 
        
        Director::getInstance()->getTextureCache()->removeTextureForKey("photo.png");
        

#### 筆者： 好處是不需要額外處理 Texture中的許多細節， 缺點則是多了一個 create 的呼叫， 在有許多圖檔建立時， App會變得很慢， 所以這種作法請千萬不要在需要一次更換很多圖檔時使用。

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
