---
title: "Cocos2dx - Json檔案的讀寫"
description: "Json 檔案格式在 Cocos2dx 中有兩種方式可以操作 方法1: 透過 rapidjson Docs : https://code.google.com/p/rapidjson/wiki/UserGuide Headers : #include \"json/rapidjson.h\" #include \"json/document.h\" 範例讀檔 ： std::string str = \"{\\"
pubDate: "2018-02-09"
category: "技術"
tags: []
---

Json 檔案格式在 Cocos2dx 中有兩種方式可以操作 

## 方法1: 透過 rapidjson

  * Docs : <https://code.google.com/p/rapidjson/wiki/UserGuide>
  * Headers :

`#include "json/rapidjson.h" #include "json/document.h"`

  * 範例讀檔 ： 
        
        std::string str = "{\"hello\" : \"world\"}";
        rapidjson::Document d;
        d.Parse < 0 > (str.c_str());
        if (d.IsObject() && d.HasMember("hello")) {
        CCLOG("%s\n", d["hello"].GetString());
        }
        

  * 範例取得Json字串 ： 
        
        StringBuffer buffer;
        rapidjson::Writer<StringBuffer> writer(buffer);
        document.Accept(writer);
        

## 方法2 : 透過 Json 類別

  * Headers :

`#include "spine/Json.h"`

  * 範例 ： 
        
        const char str[] = "{\"hello\" : \"world\"}";
        Json* json = Json_create(str);
        string dataString = Json_getString(json, "hello", "");
        CCLOG("data : %s", dataString.c_str()); // print: world
        

## 小結 ：

官方文件: http://cocos2d-x.org/docs/manual/framework/native/v3/json-parse/zh 目前官方 v3.x 版本有為 jsonrapid 寫範例， 所以較推薦使用 Jsonrapid 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
