---
title: "Swift  —  @escaping"
description: "在 Swift 3 中, closures 預設為 ＠noescape 的形式, 並將 Swift 2中的 noescape 關鍵字 deprecated。"
pubDate: "2018-02-09"
category: "技術"
tags: ["Swift"]
---

在 Swift 3 中, closures 預設為 ＠noescape 的形式, 並將 Swift 2中的 noescape 關鍵字 deprecated。
    
    
    // Swift 3
    class HealthKitManager: NSObject {
     private let healthStore = HKHealthStore()
     func requestAuthorization(completion:  @escaping (Bool, Error?) -> Void) {
            var shareTypes = Set<HKSampleType>()
            var readTypes = Set<HKSampleType>()
            // Add Workout Type
            shareTypes.insert(HKSampleType.workoutType())
            readTypes.insert(HKSampleType.workoutType())
            // Request Authorization
            healthStore.requestAuthorization(toShare: shareTypes, read:  readTypes, completion: completion)
     }
    }

> Escaping Closures

> A closure is said to  _escape_ a function when the closure is passed as an argument to the function, but is called after the function returns. When you declare a function that takes a closure as one of its parameters, you can write `@escaping`before the parameter’s type to indicate that the closure is allowed to escape.
