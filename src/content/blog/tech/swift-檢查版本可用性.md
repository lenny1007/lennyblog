---
title: "Swift — 檢查版本可用性"
description: "Swift 內建支援檢查版本的功能。"
pubDate: "2018-02-09"
category: "技術"
tags: []
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Swift%20%E2%80%94?width=1200&height=630&seed=9122&model=flux&nologo=true"
---

Swift 內建支援檢查版本的功能。
    
    
    if #available(iOS 10, macOS 10.12, *) {
         // 在 iOS 使用 iOS 10 的 API, 在 macOS 使用 macOS 10.12 的 API
    } else {
         // 使用先前版本的 iOS 和 macOS 的 API
    }

平台名字可以是 iOS ， macOS ， watchOS 和 tvOS
