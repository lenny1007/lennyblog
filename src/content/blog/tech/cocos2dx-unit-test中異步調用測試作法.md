---
title: "Cocos2dx - Unit Test中異步調用測試作法"
description: "需求： 在 Xcode 原生 Unit Test的架構中， 測試 C++程式碼中的網路調用API是否正確運行 無法使用 Obj-C 中 Block 作為異步調用的測試 （目前大部分 ios 開發的做法） 基本架構， 在 Unit test 函式中， 使用 while 迴圈以及控制Flag來強制函式停留在某個區塊 等到異步Callback 回傳時， 函式中更改 flag讓迴圈往下跑 test本體範例"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-%20Unit%20Test?width=1200&height=630&seed=6401&model=flux&nologo=true"
---

## 需求： 在 Xcode 原生 Unit Test的架構中， 測試 C++程式碼中的網路調用API是否正確運行

  * 無法使用 Obj-C 中 Block 作為異步調用的測試 （目前大部分 ios 開發的做法）
  * 基本架構， 在 Unit test 函式中， 使用 while 迴圈以及控制Flag來強制函式停留在某個區塊
  * 等到異步Callback 回傳時， 函式中更改 flag讓迴圈往下跑

## test本體範例：
    
    
    - (void)testGetUserAPI
    {
    waitingForBlock = YES;
    shared_ptr<testGetUser> t = make_shared<testGetUser>();
    t->startTest();
        while (waitingForBlock) {
         [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode beforeDate:[NSDate dateWithTimeIntervalSinceNow:0.1]];
     }
     XCTAssertEqual(t->username, "test SignUp");
    }
    

## 需要在全域環境中宣告想測試對應的類別

  * 在標頭檔下方， @interface 宣告的上方區塊

## 測試類別範例：
    
    
    BOOL waitingForBlock; // 全域變數
    class testGetUser : public userAPI {
    public:
     string username;
     void startTest()
     {
         apiHelper::getInstance()->getUser(this);
        };
     void getUserCallBack(shared_ptr<User> user)
        {
         waitingForBlock = false;
         username = user->nickname;
     };
    };
    

  * starTest 呼叫對應 WebAPI 的函式， 該函式結束後會呼叫 getUserCallBack
  * 在CallBack 函式中更改 block flag, 以及透過變數紀錄Callback中取得的值

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
