---
title: "Cocos2dx - 使用 TextField 的小技巧"
description: "Cocos2dx 中的 TextField 並沒有很好使用， 文件中也有許多缺漏， 下面列出目前版本 (v3.7) 中的TextField 一些限制。 TextField 在用戶輸入時， 沒有在閃的鼠標 (Cursor)， 所以實際使用情況會與 iOS 原生地Textfield 有所落差 TextField 沒有可以客製化的 Return 按鈕 無法選擇出現的 Keyboard 類型 那麼下面介紹"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-%20TextField?width=1200&height=630&seed=5346&model=flux&nologo=true"
---

Cocos2dx 中的 TextField 並沒有很好使用， 文件中也有許多缺漏， 下面列出目前版本 (v3.7) 中的TextField 一些限制。 

  * TextField 在用戶輸入時， 沒有在閃的鼠標 (Cursor)， 所以實際使用情況會與 iOS 原生地Textfield 有所落差
  * TextField 沒有可以客製化的 Return 按鈕
  * 無法選擇出現的 Keyboard 類型

那麼下面介紹使用 TextField 的一些小技巧。 

### 將 TextField 的文字置中
    
    
    textField->setTextHorizontalAlignment(TextHAlignment::CENTER);
    textField->setTextVerticalAlignment(TextVAlignment::CENTER);
    

### 手動開啟或關閉 TextField
    
    
    UICCTextField* ime = dynamic_cast<UICCTextField*>(textField->getVirtualRenderer());
    ime->closeIME(); // 關閉
    ime->openIME(); // 開啟
    

  * textField 由 IME 所控制， 而 IME 主要控制不同平台間的硬體元件， 所以如果要手動開啟或關閉Textfield 需要先將 IME 叫出來， 在做開啟或者關閉的動作

### 改變 Place holder 中的文字顏色

  * Place holder 中的文字為 TextField 的預設文字， 其中的文字顏色在 CocosStudio 無法更改， 需要手動變更。 
        
        textField->setPlaceHolderColor(Color4B::GREEN);
        

### TextField 事件寫法
    
    
    textField->addEventListener([textField](Ref* pSender, ui::TextField::EventType type) {
        if (type == ui::TextField::EventType::DETACH_WITH_IME) {
            // 關掉 TextField 時， 做 ...
        }
    });
    

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
