---
title: "Cocos2dx - 事件 Event Dispatcher 的用法"
description: "事件分發器 (Event Dispatcher) 的機制是什麼？ Event Dispatcher 是一種在Cocos2dx 偵測、回應使用者事件的機制。 透過 Event Listeners 去監聽使用者的事件， 基本上是透過 觀察者模式 實作此功能， Event Listeners也可以封裝對應事件處理的程式碼。 觀察者模式定義了物件之間的一對多關係，如此一來，當一個物件改變狀態，其他相依者都"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

## 事件分發器 (Event Dispatcher) 的機制是什麼？

Event Dispatcher 是一種在Cocos2dx 偵測、回應使用者事件的機制。 

  * 透過 Event Listeners 去監聽使用者的事件， 基本上是透過 觀察者模式 實作此功能， Event Listeners也可以封裝對應事件處理的程式碼。

> 觀察者模式定義了物件之間的一對多關係，如此一來，當一個物件改變狀態，其他相依者都會收到通知並自動被更新 - Head First Design Patterns

  * Event Dispatcher 用來通知所有有註冊事件的 Event Listeners， 並將對應的事件物件傳給 Listener。
  * Cocos2dx 有五種不同類型的 Event Listener。 
    * EventListenerTouch 回應觸控事件
    * EventListenerKeyboard 回應鍵盤的事件
    * EventListenerCustom 回應客製化事件
    * EventListenerAcceleration 回應加速規的事件
    * EventListenMouse 回應滑鼠事件

Event Dispatcher 使用優先度來決定哪個 listener 先收到事件， 而每個 listener 可以決定是否吞噬該事件不讓事件繼續往下傳遞。 有兩種優先度的使用方式， 一種是固定使用 int 值當作事件的優先度 （FixedPriority）， 越小的優先值會越快收到事件， 有點類似在節點中設定的zOrder值。 而另外一種是 SceneGraphPriority， 這種優先度跟畫面呈現的方式有關， 也就是 zOrder 值越大， 在畫面中越上層的Node越早收到事件通知， 這種方式可以確保事件的傳遞是由前而後的， 跟所看見的一樣。 

* * *

## Touch Events 觸控事件

基本上在手機的遊戲開發中， Touch Events 可以說是最重要的一個可監聽事件之一， 當用戶用手指觸控螢幕時， 便會偵測該事件， 並將事件傳給註冊的監聽者， 並由監聽者針對事件做回應。 Touch Events 分為下列幾種： 

  * onTouchBegan 手指剛按下去的瞬間
  * onTouchEnded 手指按下後並離開， 完整的一次事件， 需要在同一個監聽節點按下， 並在該節點範圍離開， 才會觸發該事件
  * onTouchCancel 取消事件的意思， 與TouchEnded不同點在於， 手指離開時，並不在該節點範圍內
  * onTouchMoved 手指按下後移動的事件

範例程式碼： 
    
    
    auto listener = EventListenerTouchOneByOne::create();
    listener->onTouchBegan = [](Touch* touch, Event* event){
        // code ...
        return true; // 如果想吞噬事件的話， 回傳 true
    };
    listener->onTouchMoved = [](Touch* touch, Event* event){
        // code ...
    };
    _eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this);
    

  * EventListenerTouchOneByOne 為一次處理一個Touch 事件的listener
  * 可以在同一個 listener 增加不同情況時的處理情況， 會在該情況被觸發時， 各自呼叫裡面的 code
  * 吞噬事件後， 便不會將該事件繼續往上面的節點傳， 或者是往低優先度的節點傳送事件

#### 另外值得注意的一點是 touch event 一個節點只可以註冊一次。 而如果需要在不同的節點使用相同的 listener， 那可以使用 clone() 的函式。
    
    
    _eventDispatcher->addEventListenerWithSceneGraphPriority(listener->clone(),sprite2);
    

#### 去除監聽事件可以使用
    
    
    _eventDispatcher->removeEventListener(listener);
    

## Button 元件有內建的監聽事件函式

基本上， Event Dispatcher 是一個可以通用使用在各個 Node 上的方法， 只要是有繼承 Node 的類別， 即可使用該方式。 但對於常用的 Button 類別， 有設定好的方法可以使用。 
    
    
    btn->addTouchEventListener([](Ref* pSender, Widget::TouchEventType type) {
            if (type == Widget::TouchEventType::ENDED) {
                    // code ...
            }
     });
    

或者Button如果只需要監聽點下的事件可以使用 
    
    
    btn->addClickEventListener([](Ref* pSender) {
       // code ...
    });
    

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)

* * *

參考： [Cocos2dx 官方文件](<http://www.cocos.com/doc/article/index?type=cocos2d-x&url=/doc/cocos-docs-master/manual/framework/native/v3/event-dispatcher/zh.md>)
