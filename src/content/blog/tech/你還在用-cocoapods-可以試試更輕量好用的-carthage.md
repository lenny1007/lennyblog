---
title: "CocoaPods ?  可以試試更輕量的 Carthage"
description: "之前在設置新專案的環境的時候， 發現在 Swift 環境下的 CocoaPods， 實在是需要設定蠻多東西的。諸如如果是Objective-C的Library需要設置 Bridge 檔案， 是否為 Swift 環境需要額外增加Flag 參數等等。已經不再是幾行指令加上Podfile就可以搞定環境的美好舊時光。(Xcode 6.3.1 以前的版本， 現在 CocoaPods 還是一樣好用啊！)於是在"
pubDate: "2018-05-07"
category: "技術"
tags: ["IOS", "Swift"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20CocoaPods%20%3F%20Carthage?width=1200&height=630&seed=4841&model=flux&nologo=true"
---

之前在設置新專案的環境的時候， 發現在 Swift 環境下的 CocoaPods， 實在是需要設定蠻多東西的。  
諸如如果是Objective-C的Library需要設置 Bridge 檔案， 是否為 Swift 環境需要額外增加Flag 參數等等。  
已經不再是幾行指令加上Podfile就可以搞定環境的美好舊時光。  
(Xcode 6.3.1 以前的版本， 現在 CocoaPods 還是一樣好用啊！)  
於是在Google後找到了這個替代方案 [Carthage](<https://github.com/Carthage/Carthage>)， 實際使用過後發現這個方案在現行的環境， 比起臃腫的 CocoaPods來說更為好用！  

  
當然除了 Carthage 還有另外一種替代方案是 Swift Package Manager 管理套件， 官方支援的管理方式， 相對起來使用上設定稍微複雜了些， 但也不算複雜， 上面的連結有教學就不另外做說明。  
但 Carthage 與 Swift Package Manager 兩者的差異， 最主要還是體現在 Objective-C 為底的 Library， Carthage 在這件事情上做得比較好使用一些。

# 安裝 Carthage

  * **[透過 Installer 安裝](<https://github.com/Carthage/Carthage/releases>):**  下載並執行 `Carthage.pkg` 就可以完成對應的安裝。
  * **Homebrew:**  `brew install carthage`

# 建立 Cartfile

如果有用過 Cocoapods 的開發者， Cartfile 就如同 Podfile 一般， 是設定需要的 Library 的純文字檔案。  
輸入下面指令來建立對應的 Cartfile ， 在包含 _.xcodeproj_   檔案的資料夾內建立
    
    
    cd ~/Path/To/Your/Project
    
    
    touch Cartfile
    
    
    open -a Xcode Cartfile

在檔案內輸入需要的 Library 範例
    
    
    github "Alamofire/Alamofire" ~> 4.4
    github "ReactiveX/RxSwift" ~> 3.0

# 在終端環境輸入 `carthage update`

Carthage 將自動下載所有相依模組至 `Carthage/Checkouts` 資料夾中，並編譯成 frameworks（或直接下載 pre-compiled framework）。  
將 `Carthage/Build` 資料夾內編譯好的 frameworks 拖拉進你的 **app target** => **General** => **Linked Frameworks and Libraries**  
  
之後在 **app target** => **Build Phases** 下新增一個 **New Run Script Phase**
    
    
    # 自動將 framework 複製到 target app 的 bundle中
    /usr/local/bin/carthage copy-frameworks

並在 **Input Files**  加入相依的 frameworks 路徑，例如：
    
    
    $(SRCROOT)/Carthage/Build/iOS/Alamofire.framework
    $(SRCROOT)/Carthage/Build/iOS/RxSwift.framework

這樣你就可以import 對應的 Library 在 Xcode Project 中使用了 !!
    
    
    import Alamofire

  
實際在使用跟設定後， 真的蠻好用的！
