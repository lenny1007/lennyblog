---
title: "Swift - for用法"
description: "for用法: for迴圈是控制項的重要功能, 主要是用來控制重複性的運算以及功能。 機器設定 : Swift4 + iOS11 + Xcode9 瞭解for用法前, 先讓我們了解一下 Range ( ... ) Range let closedRange = 0...5 let halfOpenRange = 0..&lt;5 closedRange 代表著 0 -5 (包含) halfOpenR"
pubDate: "2018-02-09"
category: "技術"
tags: ["Swift"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Swift%20-%20for?width=1200&height=630&seed=4163&model=flux&nologo=true"
---

for用法: for迴圈是控制項的重要功能, 主要是用來控制重複性的運算以及功能。 機器設定 : Swift4 + iOS11 + Xcode9 瞭解for用法前, 先讓我們了解一下 Range ( ... ) 

### Range
    
    
    let closedRange = 0...5      
    let halfOpenRange = 0..<5

closedRange 代表著 0 -5 (包含) halfOpenRange 則代表著 0 - 4  

### For
    
    
    var sum = 0
    let count = 10
    for i in 1...count {
      sum += i
    }
    // sum = 55 從1加到10

如果不需要參數, eg. i, 可以使用 _ 
    
    
    for _ in 0..<count {
      print("Hi!")
    }

會列印 Hi! 十次在console上 

### Before
    
    
    for i in 1..<count {
      if i % 2 == 1 {
         print("\(i) is an odd number.")
      }
    }

如果需要加入條件在for裡面, 可以使用 where 

### After
    
    
    for i in 1...count where i % 2 == 1 {
      print("\(i) is an odd number.")
    }
