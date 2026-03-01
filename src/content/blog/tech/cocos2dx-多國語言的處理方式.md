---
title: "Cocos2dx - 多國語言的處理方式"
description: "多國語言在手機上的支援， 一向是App是否被推薦關鍵指標之一， 一般來說， 最少需要支援最常用的八國語言。 Step1. 使用 Singleton 作為 Helper 架構存取對應所需的字串 Singleton 範例參考 在Singleton開出對應的存取函式 static string getString(string key); Step2. 決定多國語言的實作方案 建議： 使用json 檔案"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

多國語言在手機上的支援， 一向是App是否被推薦關鍵指標之一， 一般來說， 最少需要支援最常用的八國語言。 

## Step1. 使用 Singleton 作為 Helper 架構存取對應所需的字串

  * [Singleton 範例參考](<http://cocos2dx.logdown.com/posts/289200-cocos2dx-singleton-class-example>)
  * 在Singleton開出對應的存取函式 
        
        static string getString(string key);
        

## Step2. 決定多國語言的實作方案

  * 建議： 使用json 檔案作為 多國語言的字串檔
  * 導入json對應的所需的檔案
  * [Cocos2dx json 檔案存取方式範例](<http://cocos2dx.logdown.com/posts/287833-cocos2dx-json-file-reading-and-writing>)
  * 決定json資料欄位的格式 (en.json) 
        
        {
            "Text_Key1" : "Text1",
            "Text_Key2" : "Text2"
        }
        

  * 決定json資料欄位的格式 (chinese.json) 
        
        {
            "Text_Key1" : "字串1",
            "Text_Key2" : "字串2"
        }
        

## Step3. 實作Singleton中的讀取檔案函式
    
    
    LanguageHelper::LanguageHelper()
    {
    string fileName;
    switch (Application::getInstance()->getCurrentLanguage()) {
    case LanguageType::ENGLISH:
        fileName = "en.json";
        break;
    case LanguageType::CHINESE: {
        fileName = "chinese.json";
        break;
    }
    default:
        fileName = "en.json";
        break;
    };
    string clearContent = FileUtils::getInstance()->getStringFromFile(fileName);
    document.Parse<0>(clearContent.c_str());
    if (document.HasParseError()) {
        CCLOG("Language file parsing error!");
        return;
        }
    };
    string LanguageHelper::getString(string key){
       return document[key.c_str()].GetString();
    }
    

## Step4. 在 UI 元件中使用 Helper 去設置文字
    
    
    labelText->setString(LanguageHelper::getString("Text_Key1"));
    

## 完成！

### 筆者： 常見的幾種語言已被定義在Cocos2dx中的 LanguageType

  * [Enum文件參考](<http://www.cocos2d-x.org/reference/native-cpp/V3.0rc1/de/d8b/group__platform.html>)

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
