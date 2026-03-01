---
title: "Cocos2dx - 在 Xcode中使用 Unit test 設置"
description: "想要在Cocos2dX 專案中使用 Xcode 內建的 Unit test Framework 需要額外做一些設置。 Step1. 準備好在Mac環境中設置好的 Cocos2dx 專案 (C++ 版本) Step2. 將 Unit test target 拉進專案中 - 按下左下角的 + 按鈕， 並選擇 Other -&gt; Cocoa Touch Testing Bundle -&gt; Ne"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/Cocos2dx%20-%20%E5%9C%A8%20Xcode%E4%B8%AD%E4%BD%BF%E7%94%A8%20Unit%20test%20%E8%A8%AD%E7%BD%AE%20technology%20code%20programming%20dark%20minimal%20high%20quality%20blog%20cover%20photo?width=800&height=450&nologo=true"
---

想要在Cocos2dX 專案中使用 Xcode 內建的 Unit test Framework 需要額外做一些設置。 

## Step1. 準備好在Mac環境中設置好的 Cocos2dx 專案 (C++ 版本)

## Step2. 將 Unit test target 拉進專案中

![](http://user-image.logdown.io/user/1500/blog/12948/post/287975/IYOMq12DSWarxq3yarg0_%E6%9C%AA%E5%91%BD%E5%90%8D.png)
    
    
    - 按下左下角的 + 按鈕， 並選擇 Other -> Cocoa Touch Testing Bundle -> Next
    

![](http://user-image.logdown.io/user/1500/blog/12948/post/287975/8GcLeefwSeeK2cF9oncy_%E6%9C%AA%E5%91%BD%E5%90%8D.png)
    
    
    - 請選擇 Obj-C 的專案， C++ 的程式碼可在 Obj-C 的專案中混編， 完成命名後按下 Finish
    

## Step3. 檢查是否建立好測試的環境

![](http://user-image.logdown.io/user/1500/blog/12948/post/287975/q7KzCGTmTe6NdV2EeTFn_%E6%9C%AA%E5%91%BD%E5%90%8D.png)
    
    
    - 在 cocos2dx.xcodeproj 檔案下方應出現 Tests 的 folder
    - 裡面有系統已經建好的第一個 .m 檔案
    

## Step4. 更改 Test Target 的環境設定

![](http://user-image.logdown.io/user/1500/blog/12948/post/287975/UGPGourQYsvZfd9nUGrQ_%E6%9C%AA%E5%91%BD%E5%90%8D.png)
    
    
    - Test Target -> Build Settings -> Preprocessor Macros -> Debug 中加入 CC_TARGET_OS_IPHONE
    - 沒有加入此設定無法使用 Cocos2dx的檔案
    

## Step5. 更改對應的 .m 檔為 .mm檔
    
    
    - .mm檔為 c++ & Obj-C檔案混編的格式
    

![](http://user-image.logdown.io/user/1500/blog/12948/post/287975/hvMeHN8R8CYJoiscvZwW_%E6%9C%AA%E5%91%BD%E5%90%8D.png)

## Step5. 加入任意有 cocos2dx 的檔案做測試
    
    
    - 例如 #include "HelloWorldScene.h", 並 command + U 跑測試， 如果過了就代表設置成功！
    

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
