---
title: "Swift — 檢查版本可用性"
description: "Swift 內建支援檢查版本的功能。"
pubDate: "2018-02-09"
category: "技術"
tags: []
---

Swift 內建支援檢查版本的功能。
    
    
    if #available(iOS 10, macOS 10.12, *) {
         // 在 iOS 使用 iOS 10 的 API, 在 macOS 使用 macOS 10.12 的 API
    } else {
         // 使用先前版本的 iOS 和 macOS 的 API
    }

平台名字可以是 iOS ， macOS ， watchOS 和 tvOS
