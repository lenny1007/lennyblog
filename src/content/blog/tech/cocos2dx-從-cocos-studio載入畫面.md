---
title: "Cocos2dx - 從 Cocos Studio載入畫面"
description: "Cocos Studio 在目前的 Cocos2dx 的開發環境中， 扮演著相當重要的工具角色， 主要是在處理畫面上的細節， 像是擺放的位置、 簡單的動畫等。 一般會輸出做好的檔案為 .csb檔 或者 .json檔。 json檔案可讀性較佳適用於 Cocos2d-JS ， csb檔案體積較小， 安全性較高適用於 Cocos2d-C++ 和 LuaBinding 載入 .csb 檔案 Step1. "
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-%20Cocos%20Studio?width=1200&height=630&seed=6844&model=flux&nologo=true"
---

Cocos Studio 在目前的 Cocos2dx 的開發環境中， 扮演著相當重要的工具角色， 主要是在處理畫面上的細節， 像是擺放的位置、 簡單的動畫等。 一般會輸出做好的檔案為 .csb檔 或者 .json檔。 

  * json檔案可讀性較佳適用於 Cocos2d-JS ， csb檔案體積較小， 安全性較高適用於 Cocos2d-C++ 和 LuaBinding

### 載入 .csb 檔案

  * Step1. 宣告需要的標頭檔 
    * include "cocostudio/CocoStudio.h"
    * include "extensions/cocos-ext.h"
    * include "ui/CocosGUI.h"
  * Step2. 在Scene 裡面的 init 函式中載入 .csb 檔案 
        
        bool MyScene::init()
        {
            // ... Super init ...
            auto rootNode = CSLoader::createNode("MyScene.csb");
            addChild(rootNode);
            // ... Init UI 、 Action 、 Animation ...
            return true;
        }
        

  * Step3. 將Cocos Studio中的元件與Scene綁定 
    * Cocos Studio 內所使用的元件可以在Scene中手動作綁定以及設定
    * 通常會綁定動作或者回傳函式， Cocos Studio 有一定動作函式的支援， 但目前仍不容易使用 
          
          auto textTitle = static_cast<Text*>(rootNode->getChildByName("text_Title"));
          

    * rootNode 為 Load 進程式的 csb檔案， 如 Step2
    * getChildByName 中的 Name Key 是用戶在 Cocos Studio 自訂的 Node Name
    * 所有取得元件的架構， 與Cocos Studio檔案中相同， eg. 如果是在 rootNode 包了一層 Panel_Node 後在包了一個Text， 取得此Text就需 getChildByName("Panel_Node")->getChildByName("Text")才有辦法取得該元件
  * Step4. 綁定動作 
    * 取得元件後可在該元件上綁定動作 
          
          backButton->addClickEventListener([this](Ref* pSender) {
              Director::getInstance()->popScene();
          });
          

  * Step5. 如果csb檔案有簡單的動畫實作， 則另外需加上動畫幀的程式碼， 才會有動畫 
        
        cocostudio::timeline::ActionTimeline* action = CSLoader::createTimeline("MyScene.csb");
        rootNode->runAction(action);
        action->gotoFrameAndPlay(0, false);
        

    * 可加在載入rootNode的函式中下方
    * gotoFrameAndPlay 函式第一個參數為從0到第幾個frame, 第二個為是否迴圈動畫
    * [ActionTimeline 官方文件](<http://www.cocos2d-x.org/reference/native-cpp/V3.2/d7/d2f/class_action_timeline.html#ad52cd866fafa1442aeb4dce43b39073f>)

#### 筆者： Cocos Studio 目前的文件較為散亂以及混亂， 版本的變更迭代也相當快速， 仍處於未穩定的階段， 但許多功能如果能夠熟悉， 可以很大的加快開發的速度

  * [Cocos Studio 官方文件 - 製作場景與UI](<http://www.cocos.com/doc/article/index?type=Cocos%20Studio&url=/doc/cocos-docs-master//manual/studio/v4/chapter2/SceneAndLayer/zh.md>)

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
