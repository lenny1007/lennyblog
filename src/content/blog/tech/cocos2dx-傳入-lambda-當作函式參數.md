---
title: "Cocos2dx - 傳入 Lambda 當作函式參數"
description: "自從 C++ 11 全面在 Cocos2dx 中使用後， 使得原本的Cocos2dx 更為強大， 其中筆者覺得造成改變最大的因素， 就有 Lambda 語法。 適用範圍： 任何想用 Lambda 當作 Callback 函式的時候 Step1: 搞清楚Lambda語法 是如何使用 C++ Lambda 語法簡介 Step2: 弄清楚C++ Function用法 C++ function 用法 St"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

自從 C++ 11 全面在 Cocos2dx 中使用後， 使得原本的Cocos2dx 更為強大， 其中筆者覺得造成改變最大的因素， 就有 Lambda 語法。 

## 適用範圍： 任何想用 Lambda 當作 Callback 函式的時候

### Step1: 搞清楚Lambda語法 是如何使用

  * [C++ Lambda 語法簡介](<http://cocos2dx.logdown.com/posts/289619-cocos2dx-c-introduction-to-lambda-syntax>)

### Step2: 弄清楚C++ Function用法

  * [C++ function 用法](<http://cocos2dx.logdown.com/posts/289624-c-11-function-usage>)

### Step3: 在標頭檔將函式結構寫出來
    
    
    void login(string email, function< void(shared_ptr< CustomClass > )> onSuccess);
    

  * 使用 Email 來登入， 等函式完成登入後將對應的變數傳入 onSuccess Callback
  * function< void(shared_ptr< CustomClass > )> onSuccess 為一個 Callback 呼叫， 可使用Lambda語法填入

### Step4 在對應的程式碼中完成動作後呼叫 Callback
    
    
    void login(string email, function< void(shared_ptr< CustomClass > )> onSuccess){
    .. 網路操作 ..
    .. 背景操作 ..
    ...
    onSuccess( 丟回參數 );
    }
    

### Step5: 在其他地方使用Lambda語法當作Callback傳入函式
    
    
    Class->login("lenny@email.com", [](shared_ptr< CustomClass > ){
        CCLOG("Login Success");
    });
    

### 這在手機開發環境中的網路函式中， 好用到掉渣啊！

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
