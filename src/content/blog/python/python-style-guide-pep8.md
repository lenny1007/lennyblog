---
title: "Python - 命名慣例與風格"
description: "Python 的程式撰寫風格慣例詳細被記載在 PEP8 (Python Enhancement Proposal) 這份文件中，PEPs 還有許多不同的提議，包含之前的Bug fix release、Python語言演進的 Guidelines、但最需要被詳細閱讀跟使用的就是這個 　PEP8 -  Style Guide for Python Code  。"
pubDate: "2022-02-09"
category: "Python"
tags: ["python"]
---

Python 的程式撰寫風格慣例詳細被記載在 PEP8 (Python Enhancement Proposal) 這份文件中，PEPs 還有許多不同的提議，包含之前的Bug fix release、Python語言演進的 Guidelines、但最需要被詳細閱讀跟使用的就是這個 [PEP8 - Style Guide for Python Code ](<https://www.python.org/dev/peps/pep-0008/>) 。

每個語言有自己的命名慣例，有份經過官方、社群所經過時間考驗跟整理的命名慣例是相當難能可貴的，也會讓所有 Python的程式工程師能更理解你的程式碼。

下面僅列出部分我個人覺得與之前慣用的Ｃ++較為不同的Python專屬的命名慣例

情況| 建議| 範例  
---|---|---  
模組、套件名稱| 全部小寫、短名詞，必要時才使用底線 ( _ )| imp, sys  
縮排| **每個級別為 4 個空格，不使用Tab**|   
變數名稱| 全部小寫，使用底線 _ 分隔長變數| my_var  
函式名稱| 全部小寫，可使用底線 _ 增加可讀性| my_func()  
類別名稱| 每個單字的第一個字母大寫| MyClass  
比較| 不用寫 == 寫出比較的結果是 True / False| if my_var :   
if not my_var:  
常數名稱| 全部大寫，單字間加底線| PI, TAX_RATE  
  
## 底線開頭或結尾的名稱

底線開頭或結尾的名稱在 Python 中有特殊的用途。 

前單底線 _var| 模組的private變數或函式，import 使用 * 匯入時無法匯入以 _ 底線開頭的名稱。  
---|---  
前雙底線 __var| 類別或物件的private變數或函式，會被Python改名，所以類別或者物件外部無法直接用原本名稱存取。  
前後雙底線 __var__| 保留給Python內部使用的，避免使用這種形式。  
_| 免洗變數，用完就丟。
