---
title: "IOS - Appstore 評分連結在 IOS11裝置失效， 該怎麼辦？"
description: "原先 iOS實現跳轉到&nbsp; AppStore 評分功能的方式如下： const std::string RatingIOS = \"itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=YOURAPPID&amp;onlyLatestVersion=true&amp;pageNumb"
pubDate: "2018-03-07"
category: "技術"
tags: ["IOS"]
heroImage: "https://image.pollinations.ai/prompt/IOS%20-%20Appstore%20%E8%A9%95%E5%88%86%E9%80%A3%E7%B5%90%E5%9C%A8%20IOS11%E8%A3%9D%E7%BD%AE%E5%A4%B1%E6%95%88%EF%BC%8C%20%E8%A9%B2%E6%80%8E%E9%BA%BC%E8%BE%A6%EF%BC%9F%20technology%20code%20programming%20dark%20minimal%20high%20quality%20blog%20cover%20photo?width=800&height=450&nologo=true"
---

原先 iOS實現跳轉到  AppStore 評分功能的方式如下： 
    
    
    const std::string RatingIOS = "itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=YOURAPPID&onlyLatestVersion=true&pageNumber=0&sortOrdering=1&type=Purple+Software";

但最近在 iOS11以上的裝置， 會出現空白的Appstore頁面， 原因是新的App頁面中已經沒有Review Tab， 而是將Review功能做在敘述以及截圖頁面中，導致舊有的連結失效。 

>  iOS 11 the app pages do not have a Review Tab anymore, but the reviews are located under the app description and screenshots.

[原文連結](<https://stackoverflow.com/questions/45695291/how-to-link-to-app-reviews-in-app-store-in-ios-11?rq=1>)

# 新的評分連結
    
    
    const std::string RatingIOS = "itms-apps://itunes.apple.com/us/app/idYOURAPPID?action=write-review";
    

只要把新的連結中的YOURAPPID改成自己的APPID就可以使用了。 在IOS 10 & 11中都測試沒有問題， 截圖如下。 [caption id="attachment_433" align="alignleft" width="169"]![](http://35.236.187.174/wp-content/uploads/2018/03/IMG_5143-169x300.png) 呆呆神射手的評分頁面[/caption] [caption id="attachment_434" align="alignright" width="169"]![](http://35.236.187.174/wp-content/uploads/2018/03/IMG_5145-169x300.png) AppStore的評分頁面[/caption]
