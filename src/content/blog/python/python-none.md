---
title: "Python - None 值"
description: "Python 除了字串、數字等標準型別外，有一個特殊的基本資料型別 : None。  None值主要是用來表示空值，與 C++ 的NULL、nullptr類似，而最常出現的地方其實就是在函式的回傳值，如果函式沒有回傳值，預設情況下Python還是會傳回一個 None。"
pubDate: "2022-02-09"
category: "Python"
tags: ["none", "python"]
heroImage: "https://image.pollinations.ai/prompt/Python%20programming%20snake%20symbol%20code%20blue%20minimalist%20clean%20background%20Python%20-%20None?width=1200&height=630&seed=6076&model=flux&nologo=true"
---

Python 除了字串、數字等標準型別外，有一個特殊的基本資料型別 : None。 

None值主要是用來表示空值，與 C++ 的NULL、nullptr類似，而最常出現的地方其實就是在函式的回傳值，如果函式沒有回傳值，預設情況下Python還是會傳回一個 None。

None最需要注意的是，整個Python系統中只有一個 None 物件，換句話說所有對於 None 的參照都指向同一個物件，如果使用 == 比較的時候，None也只會等於自身。 
    
    
    >>> None == False
    False
    >>> None == 0
    False
    >>> None == None
    True
    >>> False == 0
    True
