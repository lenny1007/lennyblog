---
title: "Cocos2dx - Popup 實作小技巧"
description: "Popup 基本上就是在Scene 的最上層， 跳出一層對話框， 或者是轉圈圈的Loading小圖示等， Cocos2dx 有支援手機原生的對話框 - MessageBox。 MessageBox 相關文章 但如果要做一個較為精緻的遊戲 ex. Candy Crush， 客製化的 Popup是不可少的。 Trick1. 透過傳入 Scene node 建立 Popup 通常會先建立一個 單例 He"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/Cocos2dx%20mobile%20game%20development%20popup%20dialog%20UI%20design%20colorful?width=1200&height=630&seed=2891&model=flux&nologo=true"
---

Popup 基本上就是在Scene 的最上層， 跳出一層對話框， 或者是轉圈圈的Loading小圖示等， Cocos2dx 有支援手機原生的對話框 - MessageBox。 

  * [MessageBox 相關文章](<http://discuss.cocos2d-x.org/t/show-native-message-box/20896>)

但如果要做一個較為精緻的遊戲 ex. Candy Crush， 客製化的 Popup是不可少的。 ![](http://user-image.logdown.io/user/1500/blog/12948/post/289788/I31Vf4ZuQOKCZEmUR1AU_%E4%B8%8B%E8%BC%89%20\(1\).jpeg)

* * *

### Trick1. 透過傳入 Scene node 建立 Popup

  * 通常會先建立一個 單例 Helper來處理 Popup 相關的事件。 
    * [Singleton寫法範例](<http://cocos2dx.logdown.com/posts/289200-cocos2dx-singleton-class-example>)
    * 透過 注入 Scene Node 當參數來達到泛用 Popup 的效果， eg. 在各個不同的 Scene中可以複用 Popup 
          
          void showPopup(Node* sceneNode);
          

### Trick2. 透過傳入 Lambda 當作函數參數做為 Popup 按鈕的動作函式

  * [傳入 Lambda 當作函式參數文章](<http://cocos2dx.logdown.com/posts/289212-cocos2dx-lambda-function-parameters-passed>)
  * 宣告範例如下 
        
        void showConfirmPopup(Node* sceneNode, function<void()> onSubmit, function<void()> onCancel);
        

  * 記得在回傳 Callback 時判斷 Lambda 語法是否為空， 若為空呼叫回傳會 Crash
  * 在宣告主體中， 綁定按鈕的動作到對應的函式指標， ex. 
        
        buttonConfirm->addClickEventListener([this, onSubmit](Ref* pSender) {
            if (onSubmit) {
             onSubmit();
            }
        });
        

### Trick3. 將背景的 touch event 吃掉

  * 背景的觸控 Touch Event 還是會持續作用 ex. Menu按鈕， 需要將傳入Scene的觸控事件接管。
  * 作法如下： 
        
        auto listener = EventListenerTouchOneByOne::create();
        listener->setSwallowTouches(true);
        listener->onTouchBegan = [ & ](cocos2d::Touch* touch, cocos2d::Event* event) {
            return true;
        };
        sceneNode->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, popupLayer);
        

  * sceneNode 為傳入的 Scene
  * popupLayer 為 Popup 所在的 Layer 層
  * 這樣會將 sceneNode 所有觸控的事件接管， 但 popupLayer 上的觸控事件依舊可以運作
  * 將 Popup 清除時， 記得將 listener 的觸控事件清除 
        
        Director::getInstance()->getRunningScene()->getEventDispatcher()->removeEventListenersForTarget(popupLayer);
        

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
