---
title: "Swift  —  ?? 空合運算符"
description: "let defaultColorName = “red”"
pubDate: "2018-02-09"
category: "技術"
tags: ["Swift"]
---

### 空合運算符 （Nil Coalescing Operator） ??

let defaultColorName = “red”

var userDefinedColorName: String? // default 值为 nil

var colorNameToUse = userDefinedColorName ?? defaultColorName

// userDefinedColorName 的值为空，所以 colorNameToUse 的值为 “red”

* * *

userDefinedColorName = “green”

colorNameToUse = userDefinedColorName ?? defaultColorName

// userDefinedColorName 非空，因此 colorNameToUse 的值为 “green”

心得:

用法是針對 nil 的判斷所做的優化運算元, 可以直接解封 nil 的可選值並給予對應的預設值。
