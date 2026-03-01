---
title: "Cocos2dx - 基礎概念與主要元件 Node"
description: "在Cocos2d-x-3.x引擎中， 採用的是樹狀結構來管理所有的節點 Node 類。 Node 類為 Cocos2dx 最基礎的元件， 所有的 Scene、 Layer 、 Sprite等元件類別都是衍生於 Node, 所以要介紹的第一個類別為 Node。 樹狀結構在 Cocos2dx 引擎中的應用隨處可見， 也影響了許多機制， 像是 Event Dispatch、 畫面Sprite前後的呈現等"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

在Cocos2d-x-3.x引擎中， 採用的是樹狀結構來管理所有的節點 Node 類。 Node 類為 Cocos2dx 最基礎的元件， 所有的 Scene、 Layer 、 Sprite等元件類別都是衍生於 Node, 所以要介紹的第一個類別為 Node。 ![](http://user-image.logdown.io/user/1500/blog/12948/post/297457/oLD1Jm0XQGnUCFPgj5Ug_tree.jpg) 樹狀結構在 Cocos2dx 引擎中的應用隨處可見， 也影響了許多機制， 像是 Event Dispatch、 畫面Sprite前後的呈現等。 

## Node 類

* * *

Node類隨處可見， 卻很少有相關的文章好好地將這個類別掰開講， 仔細透徹的分析裡頭的內容， 這篇文章的主要目的是希望能讓讀者可以深入的認識這個基礎類別。 Node 回應管理了四個Event， 繼承Node的任何類別， 可以 override 相對應的事件函式來取得對應的時間點。 

  * virtual void onEnter();
  * virtual void onEnterTransitionDidFinish();
  * virtual void onExit();
  * virtual void onExitTransitionDidStart();

onEnter() 事件呼叫的時間點在 Node 被創建加入的時間點， 如果創建的 Node 有加入 Action 時， onEnter 的時間點會在Action開始前， onEnterTransitionDidFinish() 基本上就是在 Action 動作後才呼叫的。 Action 常見的有場景的轉換動畫、 節點的動作如 MoveTo、 ScaleBy、 ...etc。 

#### 這裏有一件事一定要注意的， 如果你要複寫這四個事件， 一定要記得呼叫父節點的相關事件， 不然會許多物件的狀態會出錯。

ex. 繼承 Layer 的客製化 CustomLayer 
    
    
    void CustomLayer::onEnter {
        Layer::onEnter();
        ... Code ...
    }
    

另外， 在onEnter時， 無法取得 sibling 節點， 但可以取得父節點。 

## Position 、錨點與座標系

* * *

Cocos2dx 的座標系需要仔細的去了解， 因為這些座標與錨點直接影響顯示圖層的位置與呈現 官方的文件， 有大部份關於這塊的說明， 連結如下 [Cocos2d-x 3.0坐标系详解](<http://www.cocos.com/doc/article/index?type=cocos2d-x&url=/doc/cocos-docs-master/manual/framework/native/v3/coordinate-system/zh.md>) 其中以錨點的系統， 最需要加以瞭解。 ![](http://user-image.logdown.io/user/1500/blog/12948/post/297457/oCnybZqTdaRtew1gSwG0_%E9%8C%A8%E9%BB%9E.png)

## zOrder - 呈現節點內容的先後順序

* * *

每個節點可以透過 addChild() 函式來加入各種 Cocos2dx 元件， 如 Sprite等。 而 Node 管理這些元件的方式就如同一開始所說的是樹狀結構。 預設的 zOrder 為 0。 越後面加入的元件在越上層。 而這個 zOrder 的預設類別為 Int， 換句話說， zOrder 可以為負值的。 LocalZOrder 為該節點與它的 Sibling 節點相關的值， 是最常用的 zOrder 部分。 相對應的有 GlobalZOrder, 但使用該值的 Node點為有渲染圖層的節點， ex. ClippingNode, DrawNode 等有使用到 draw 函式的節點。 這些節點因為需要使用 OpenGL來繪製圖型， 所以需要讓該 Context 知道前後順序， 使用GlobalZOrder， 一般是不會使用到這個值就是。 

## 節點的基本操作

* * *

#### addChild

新增節點應該是最重要的操作函式， 可以新增任何 Node 類以及衍生類。 
    
    
     virtual void addChild(Node* child, int localZOrder, int tag);
    

第三個函式參數， 可以傳入tag， 也可以傳入 string， 當作物件識別的名稱。 Node 有取得子節點的函式。 取決於使用什麼當做子節點的識別方式。 
    
    
    virtual Node * getChildByTag(int tag) const;
    virtual Node*  getChildByName(const std::string& name) const;
    

但這種取得的方式有缺陷， 如果 Tag 或者是 Name 並不是獨一無二的， 只會回傳最早找到的 Node。 也因此後來有個新的函式 enumerateChildren 來將需要的子節點回傳。 範例程式： 
    
    
    std::vector<Node*> findChildren(const Node &node, const std::string &name)
    {
      std::vector<Node*> vec;
        node.enumerateChildren(name, [&vec](Node* nodeFound) -> bool {
          vec.push_back(nodeFound);
            return false;
        });
      return vec;
    }
    

#### removeChild

提供了許多函式去移除已加入的子節點， 可以一樣使用Tag、 Name來刪除， 當然一樣會有加入的問題， 如果有重複的Tag或者是Name， 會僅刪掉一個， 造成 Memory leak的問題， 所以如果要使用Name或者Tag來加入Node做識別， 請確保它們是獨一無二的。 
    
    
    virtual void removeChildByTag(int tag, bool cleanup = true);
    virtual void removeChildByName(const std::string &name, bool cleanup = true);
    

也提供了一次刪除全部子節點的函式 
    
    
    virtual void removeAllChildren();
    

另外也提供了將Node從母節點移除的函式 
    
    
    virtual void removeFromParent();
    virtual void removeFromParentAndCleanup(bool cleanup);
    

這邊值得注意的是， 如果該節點沒有母節點， 則什麼事也不會發生 

#### runAction

每個節點都可以跑任何的動作， 關於動作的操作， 請參考官方文件。 [動作 Action](<http://www.cocos.com/doc/article/index?type=cocos2d-x&url=/doc/cocos-docs-master/manual/framework/native/v3/action/zh.md>) 基本上， 會是以 Sprite 來 runAction 居多， 但如果是想要讓效果同時讓許多節點開始跑， 可以在母節點下 runAction的指令， 所有的子節點都會跑同一個動作。 各個 Node 都可以跑動作， 讓所有的效果幾乎都可以再任意節點上實作。 

#### sheduler 調度器

這功能官方文件也有提供說明， 故不再復述 [調度器 scheduler](<http://www.cocos.com/doc/article/index?type=cocos2d-x&url=/doc/cocos-docs-master/manual/framework/native/v3/scheduler/zh.md>) 通常會使用 update (float dt) 來跑每個 frame 會跑的一些程式碼， dt 如果在時間不太一致時， 需要額外做處理， 也就是說 60fps 或者 30fps, 這個傳進來的時間會是不同的, 約 0.016sec 與 0.032sec 的不同， 那麼根據這個時間， 可以做出不同的處理， 讓fps的影響降到最低。 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
