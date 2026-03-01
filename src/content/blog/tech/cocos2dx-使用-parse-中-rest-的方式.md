---
title: "Cocos2dx - 使用 Parse 中 Rest 的方式"
description: "範例的 Project : Github 連結 ： https://github.com/lenny0929/parseRest_WithCocos2dX/ Step1 建立對應的 Parse App 並設定好對應的資料格式 本範例為 testRest Step2 導入網路所需對應的header檔案 #include \"network/HttpClient.h\" using namespace c"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "http://user-image.logdown.io/user/1500/blog/12948/post/287848/z3dOzCWTDubNKid0Jb6C_%E6%9C%AA%E5%91%BD%E5%90%8D.png"
---

範例的 Project : Github 連結 ： <https://github.com/lenny0929/parseRest_WithCocos2dX/>

## Step1 建立對應的 Parse App 並設定好對應的資料格式

本範例為 testRest 

## Step2 導入網路所需對應的header檔案

`#include "network/HttpClient.h"` using namespace cocos2d::network; 

## Step3 使用 HttpRequest 設定 Parse 存取的權限

![](http://user-image.logdown.io/user/1500/blog/12948/post/287848/z3dOzCWTDubNKid0Jb6C_%E6%9C%AA%E5%91%BD%E5%90%8D.png) 需要使用圖中的 Application ID 以及 Rest API Key 範例： 
    
    
    HttpRequest* request = new HttpRequest();
    request->setRequestType(HttpRequest::Type::POST);
    request->setUrl("https://api.parse.com/1/classes/sampleTable");
    vector<string> header;
    header.push_back("X-Parse-Application-Id: wCq2Ojdxj0aNdccb94sSr6Ke3uryqsO6spkkZKkd");
    header.push_back("X-Parse-REST-API-Key: Vp6OGjqqV1XNAbmRWzL2EylDVFs0TeULO5EQDDSR");
    header.push_back("Content-Type: application/json");
    request->setHeaders(header);
    

## Step4 Parse中表單欄位設定

![](http://user-image.logdown.io/user/1500/blog/12948/post/287848/TAjEB2RNyXGEOodmpqUw_%E6%9C%AA%E5%91%BD%E5%90%8D.png)
    
    
    // Post 建立表單資料
    auto data = "{\"ColNum\":100, \"ColString\":\"ABC\"}";
    const char * buffer = data;
    request->setRequestData(buffer, strlen(buffer));
    request->setResponseCallback(CC_CALLBACK_2(HelloWorld::onHttpRequestPostCompleted, this));
    cocos2d::network::HttpClient::getInstance()->send(request);
    request->release();
    

## Step5 資料回傳函式設定, Post 完成
    
    
    void HelloWorld::onHttpRequestPostCompleted(HttpClient* sender, HttpResponse* response)
    {
        if (response->isSucceed()) {
            CCLOG("Post success");
         }
    }
    

## Get 設定
    
    
     HttpRequest* getRequest = new HttpRequest();
       getRequest->setUrl("https://api.parse.com/1/classes/sampleTable/x9luwPXvGT");
      getRequest->setHeaders(header);
      getRequest->setRequestType(HttpRequest::Type::GET);
      getRequest->setResponseCallback(CC_CALLBACK_2(HelloWorld::onHttpRequestGetCompleted, this));
      HttpClient::getInstance()->send(getRequest);
      getRequest->release();
    

## Get 回傳 Json 格式, 使用rapidjson分析資料

  * 導入標頭檔 `#include "json/rapidjson.h" #include "json/document.h"`
        
        void HelloWorld::onHttpRequestGetCompleted(HttpClient* sender, HttpResponse* response)
        {
        if (response->isSucceed()) {
              CCLOG("Get success");
              std::vector<char>* buffer = response->getResponseData();
              std::string res;
              res.insert(res.begin(), buffer->begin(), buffer->end());
              rapidjson::Document d;
              d.Parse<0>(res.c_str());
              printf("%s\n", d["ColString"].GetString());
         }
        }
        

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
