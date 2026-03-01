---
title: "Cocos2dx 取得 Parse 中 Rest 的 Pointer 資料寫法"
description: "如果要取得 Parse 中物件的時候， 一般Cocos2dx 使用 Parse 中 Rest 的方式 就可以取得物件中的資料， 除了 Parse 中得 Pointer資料。 Pointer 通常使用在物件 1 對 1 的關係， 像是建立資料時， 有一部車的基本資料Table {車子型號， 車牌 Pointer， 顏色 ...}, 以及車牌 {縣市， 車牌號碼}， 就可以使用Pointer 將兩個資"
pubDate: "2018-02-09"
category: "技術"
tags: []
---

如果要取得 Parse 中物件的時候， 一般[Cocos2dx 使用 Parse 中 Rest 的方式](<http://cocos2dx.logdown.com/posts/287848-cocos2dx-use-parse-in-the-rest-of-the-way>) 就可以取得物件中的資料， 除了 Parse 中得 Pointer資料。 Pointer 通常使用在物件 1 對 1 的關係， 像是建立資料時， 有一部車的基本資料Table {車子型號， 車牌 Pointer， 顏色 ...}, 以及車牌 {縣市， 車牌號碼}， 就可以使用Pointer 將兩個資料欄位 用Pointer 做連結。 上述的連結所使用的方式在取得 Pointer 欄位什僅會回傳最基本的資料 {__type: Pointer, objectId: id }， 若要回傳完整的資料需要新增 include 對應的 Pointer。 

### URL 範例
    
    
    string includeData = StringUtils::format("include = cardCard");
    string restURL = baseURL + "https://api.parse.com/1/classes/Cars/" + Car->getObjectId() + "?" + urlEncode(includeData);
    getRequest->setUrl(restURL.c_str());
    

  * 其餘設定與 [Cocos2dx 使用 Parse 中 Rest 的方式](<http://cocos2dx.logdown.com/posts/287848-cocos2dx-use-parse-in-the-rest-of-the-way>) Get 的方式相同
  * urlEncode 可參考此篇作法 [(C++)UrlEncode的標準實現](<http://blog.csdn.net/gemo/article/details/8468311>)

### URL 設定進階範例

基本上， 如果使用了 Pointer 去做資料的連接， 就有可能有超過一層的情況， 舉個例子來說就是車牌號碼中的縣市， 如果也是一個 Pointer 連到表單， 那麼上面的做法， 也僅僅到第一層而已， 而縣市的資料只會回傳最基本的資料。 如果要將回傳值變成最完整的json資料， 那麼就需要在每一個 Pointer 的資料地方加入 include 中。 

#### 第二層 Pointer 範例
    
    
        string includeData = StringUtils::format("include = carCard, carCard.city");
    

  * 使用 "." 來加入下一層的資料欄位， 如果是第三層， “carCard.city.mayor” 以此類推

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
