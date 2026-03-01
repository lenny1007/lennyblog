---
title: "Cocos2dx - 背景更換圖片的方式"
description: "如果使用 CocosStudio 作為場景的編輯器， 會發現可以當作背景容器的元件有舊有的 Sprite 以及3.X 加入的 ImageView 元件。 使用 Sprite 更換圖片的方式 以使用所佔用的記憶體與CPU來說， 效能是接近的， 但因為在 CocosStudio 中， 若想要設定元件的大小， Sprite 需要透過預設的圖片資源， 而 ImageView 可設可不設定， 所以我會選擇使"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

如果使用 CocosStudio 作為場景的編輯器， 會發現可以當作背景容器的元件有舊有的 Sprite 以及3.X 加入的 ImageView 元件。 [使用 Sprite 更換圖片的方式](<http://cocos2dx.logdown.com/posts/290248-cocos2dx-sprite-replace-the-picture-method>) 以使用所佔用的記憶體與CPU來說， 效能是接近的， 但因為在 CocosStudio 中， 若想要設定元件的大小， Sprite 需要透過預設的圖片資源， 而 ImageView 可設可不設定， 所以我會選擇使用 ImageView 作為圖片的容器。 

## Step1.設定一張空的 ImageView 以及正確背景的大小。

## Step2.將背景需要被替換的資源檔加入CocosStudio

大概如圖 ![](http://user-image.logdown.io/user/1500/blog/12948/post/313312/pN0Kx2AHTh6oKrE5ARjj_%E6%9C%AA%E5%91%BD%E5%90%8D.png) 這裏說明一下， 為何需要設定空的 ImageView 而非直接將某張資源檔當作預設的背景。 由於需求是替換， 所以不清楚是否預設的圖是正確的， 在將檔案讀入時， 預設的背景資源檔即會讀入記憶體， 已滿版的背景來說約莫是 5MB， 在替換圖檔後， 該記憶體空間不會立刻被清掉， 所以採用空的 ImageView 在綁定時設定圖片， 可以省下這個記憶體空間。 

## Step3. 根據需要將圖檔設定進去 ImageView

程式碼如下 
    
    
    switch (gtype) {
      case arena:
          image_background->loadTexture("Queue images/background_arena.png");
            break;
       ...
    }
    

小結： ImageView 在替換圖片這件事情上， 比起 Sprite 還要方便許多， 另外就是關於空白的背景圖搭配程式碼設定， 看來是無法避免的了。 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
