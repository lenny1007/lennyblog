---
title: "Cocos2dx - 導入Spine 資源檔做動畫"
description: "Spine 是近年來成熟的動畫工具產品， 主要是做骨骼動畫使用。 骨骼動畫的好處很多， 最主要的優點是資源檔小， 對於手機開發環境來說， 幾乎秒殺一切缺點。 CocoStudio 最近的版本也提供了製作骨骼動畫的工具， 但實際在製作時， 仍缺少了些好用的功能， ex. 換Skin。 導致部分工作需要重複做好幾次， 編輯界面也較難使用。 Step1. 導入對應的標頭檔 #include &lt;sp"
pubDate: "2018-02-09"
category: "技術"
tags: []
---

Spine 是近年來成熟的動畫工具產品， 主要是做骨骼動畫使用。 骨骼動畫的好處很多， 最主要的優點是資源檔小， 對於手機開發環境來說， 幾乎秒殺一切缺點。 CocoStudio 最近的版本也提供了製作骨骼動畫的工具， 但實際在製作時， 仍缺少了些好用的功能， ex. 換Skin。 導致部分工作需要重複做好幾次， 編輯界面也較難使用。 

### Step1. 導入對應的標頭檔
    
    
    #include <spine/spine-cocos2dx.h>
    #include "spine/spine.h"
    

### Step2. 將 Spine 輸出的檔案拉進專案中

  * 通常輸出的檔案有三個， .atlas .json .png

### Step3. 建立對應的 SkeletonAnimation 來使用動畫
    
    
    auto skeletonNode = SkeletonAnimation::createWithFile("skeleton.json", "skeleton.atlas");
    

### Step4. 設置 SkeletonAnimation 實體的相關係數

  * 設置 Skin 作法 
        
        skeletonNode->setSkin("dog_skin");
        

  * 將動畫左右互換 (FlipX) 
        
        skeletonNode->setScaleX(-1);
        

  * 設定 Spine 內動畫的動作， 最後一個變數為是否迴圈， 第一個變數為從第幾個Frame開始播 
        
        skeletonNode->setAnimation(0, "walk", true);
        

  * 設定 動畫的結合 
        
        skeletonNode->setMix("walk", "attack", 0.2f);
        skeletonNode->setMix("attack", "walk", 0.4f);
        

  * 設定動畫播放的速度 
        
        skeletonNode->timeScale = 0.6f;
        

  * 設置是否看到骨骼 
        
        skeletonNode->setDebugBonesEnabled(true);
        

### Step5. 設置 Cocos2dx 的相關設定

  * 基本上可以把 SkeletonAnimation 當一般Cocos2dx的 Node看待
  * 可以設置額外的動畫, ex. FadeIn, MoveBy, ...etc.
  * 可以設置 Node 位置
  * 最後需要使用 addChild 加入

### 筆者： Spine 輸入的動畫真的精細度很高， 如果是對畫面要求較高的遊戲， 建議使用。

  * 參考： 
    * 官方文件
    * 關於 Spine Data Cache 的做法

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
