---
title: "C++ string 操作注意事項"
description: "string 的 size 操作和 empty 操作 常使用的 c++ 函式庫會附帶 size() 以及 empty() 操作， 前者是給予對應的長度， 後者是簡單的回傳是否為空。 需特別注意的是 size() 回傳的是一個 string::size_type, 而非常見的基礎型別。 string 和很多程式庫型別 - 定義有數個相關型別。 這些型別讓我們得以使用與機器無關的方式來運用程式庫型別。"
pubDate: "2018-02-09"
category: "技術"
tags: ["C++"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20C%2B%2B%20string?width=1200&height=630&seed=3214&model=flux&nologo=true"
---

## string 的 size 操作和 empty 操作

常使用的 c++ 函式庫會附帶 size() 以及 empty() 操作， 前者是給予對應的長度， 後者是簡單的回傳是否為空。 需特別注意的是 size() 回傳的是一個 string::size_type, 而非常見的基礎型別。 string 和很多程式庫型別 - 定義有數個相關型別。 這些型別讓我們得以使用與機器無關的方式來運用程式庫型別。 size_type 被定義為某個 unsigned 型別 - unsigned int 或 unsigned long 的同義字， 足以保證代表任何 string 的大小。 

> 任何用來存放 string size() 返回值得變數都應該是 string::size_type。 千萬別把 size() 返回值賦予一個 int 變數。

使用 int 除了 int 可以存放負值外， 某些機器上的 int 太小， 連合理的大型 strings 都無法處理。 

## 將 strings 與 character string literals 相加

string 常使用的串接方式會有下面這種做法: 
    
    
    string s1 = "hello";
    string s2 = "world";
    string s3 = s1 + " " + s2;
    

### 這種做法有個需要特別注意的事項， 每個 + 運算子至少要有一個運算元的型別是 string

也就是說下面的語法是不合法的： 
    
    
    string s = "hello " + "world!";
