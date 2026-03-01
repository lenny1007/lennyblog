---
title: "Swift - tuple用法"
description: "機器設定 : Swift4 + iOS11 + Xcode9 tuple用法: Tuple 是輕量化的 struct，常用於傳遞個數大於一的值組。 tuple的用法如下 如果有用過 C++/Python的 tuple， 對於Swift的tuple 應該不陌生， tuple 賦值 let coordinates = (2, 3) let coordinatesDouble = (2.3, 3.5) "
pubDate: "2018-02-09"
category: "技術"
tags: ["Swift"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Swift%20-%20tuple?width=1200&height=630&seed=6502&model=flux&nologo=true"
---

機器設定 : Swift4 + iOS11 + Xcode9 tuple用法: Tuple 是輕量化的 struct，常用於傳遞個數大於一的值組。 

# tuple的用法如下

如果有用過 C++/Python的 tuple， 對於Swift的tuple 應該不陌生， tuple 賦值 
    
    
    let coordinates = (2, 3)
    
    let coordinatesDouble = (2.3, 3.5)
    let coordinatesMixed = (2.5, 2)
    

### tuple 取值
    
    
    let x1 = coordinates.0      // x1 = 2
    let y1 = coordinates.1      // y1 = 3 

### 可以將 tuple 的項給予命名, 之後可以針對命名取值
    
    
    let coordinatesNamed = (x: 2, y: 3)
    let x2 = coordinatesNamed.x
    let y2 = coordinatesNamed.y
    

### 也可以直接將已有的tuple, 透過命名來取值
    
    
    let coordinates3D = (x: 2, y: 3, z: 1)
    let (x3, y3, z3) = coordinates3D
    x3  // x3 = 2
    y3  // y3 = 3
    z3  // z3 = 1
