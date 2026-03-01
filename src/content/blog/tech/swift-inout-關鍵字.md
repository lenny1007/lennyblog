---
title: "Swift —  inout 關鍵字"
description: "如果你想要一個函數可以修改參數的值，並且想要在這些修改在函數調用結束後仍然存在，那 麽就應該把這個參數定義為輸入輸出參數（In-Out Parameters）。"
pubDate: "2018-02-09"
category: "技術"
tags: ["Swift"]
---

如果你想要一個函數可以修改參數的值，並且想要在這些修改在函數調用結束後仍然存在，那 麽就應該把這個參數定義為輸入輸出參數（In-Out Parameters）。

下例中， swapTwoInts(_:_:) 函數有兩個分別叫做 a 和 b 的輸入輸出參數：
    
    
    func swapTwoInts(_ a: inout Int, _ b: inout Int) {
       let temporaryA = a
       a = b
       b = temporaryA
    }

* * *
    
    
    var someInt = 3
    var anotherInt = 107
    swapTwoInts(&someInt, &anotherInt)
    print(“someInt is now \(someInt), and anotherInt is now \(anotherInt)”)
    // 打印 “someInt is now 107, and anotherInt is now 3
