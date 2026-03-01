---
title: "Python - 格式化字串的方式"
description: "Python 有三種格式化字串的方式，其中一種與 C++ 類似，使用 % 算符來格式化字串，是 Python 早期版本的標準。"
pubDate: "2022-02-21"
category: "Python"
tags: ["python", "string"]
heroImage: "https://image.pollinations.ai/prompt/Python%20programming%20snake%20symbol%20code%20blue%20minimalist%20clean%20background%20Python%20-?width=1200&height=630&seed=4120&model=flux&nologo=true"
---

Python 有三種格式化字串的方式，其中一種與 C++ 類似，使用 % 算符來格式化字串，是 Python 早期版本的標準。
    
    
    print("%s 是 %s 而不是 %s" % ("老王", "樂團", "賣西瓜的"))
    >>> 老王 是 樂團 而不是 賣西瓜的

前面先用兩個 " 將字串建立，而後面接一個 % 後接要塞入的文字、變數，會一個對一個的將文字更換。

目前這種寫法已經不流行了，比較 Pythonic 的寫法是使用 format 或者是 f-string 

使用 format() 來格式化字串是比較通用的做法，相對來說也可以支援比較多的版本，語法如下: 

> "格式化字串".format( 參數值 )
    
    
    print("{} 是 {} 而不是 {}".format("老王", "樂團", "賣西瓜的") )
    >>> 老王 是 樂團 而不是 賣西瓜的

f-string 的作法在 Python 3.6 以後支援
    
    
    str1 = "老王"
    str2 = "樂團"
    str3 = "賣西瓜的"
    print( f"{str1} 是 {str2} 而不是 {str3}" )
    >>> 老王 是 樂團 而不是 賣西瓜的

基本上跟 format 一樣簡單好用，還更方便閱讀。
