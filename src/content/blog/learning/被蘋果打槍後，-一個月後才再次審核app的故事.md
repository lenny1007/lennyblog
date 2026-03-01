---
title: "被蘋果打槍後， 一個月後才再次審核App的故事"
description: "1. 1 Safety: Objectionable Content 5. 2.1 Legal: Intellectual Property - General Guideline 1.1.6 - Safety - Objectionable Content Your app’s metadata contains misleading content or content that is int"
pubDate: "2018-03-01"
category: "學習"
tags: []
---

相信Mobile開發者在送出版本到App Store， 都像是在等一個不知道會因為什麼被打槍的奇幻旅程。 上次送審[呆呆神射手](<https://itunes.apple.com/tw/app/%E5%91%86%E5%91%86%E7%A5%9E%E5%B0%84%E6%89%8B/id1326722985?mt=8>)時， 居然經過了一個月後才重新被審核， 有趣的是， 當我分享這段過程到開發者論壇後， Apple 的人居然回應了我的問題， 並解開了許多審核的秘辛。 讓我分享給大家知道。 ![](http://34.81.115.112/wp-content/uploads/2018/03/被蘋果打槍截圖.png) 當時前一次打槍的理由是這樣的 : 

> 1\. 1 Safety: Objectionable Content 5\. 2.1 Legal: Intellectual Property - General Guideline 1.1.6 - Safety - Objectionable Content Your app’s metadata contains misleading content or content that is intended to deceive users. Please note that adding a disclaimer to the app description is not sufficient if the rest of the metadata and the app are misleading. The next submission of this app may require a longer review time, and this app will not be eligible for an expedited review until this issue is resolved. Next Steps \- Review the Objectionable Content section of the App Store Review Guidelines. \- Ensure your app is compliant with all sections of the App Store Review Guidelines and the Terms & Conditions of the Apple Developer Program. \- Once your app is fully compliant, resubmit your app for review. Submitting apps designed to mislead or harm customers or evade the review process may result in the termination of your Apple Developer Program account. Review the Terms & Conditions of the Apple Developer Program to learn more about our policies regarding termination. If you believe your app is compliant with the App Store Review Guidelines, you may submit an appeal. Alternatively, you may provide additional details about your app by replying directly to this message. Since your iTunes Connect status is Rejected, a new binary will be required. Make the desired metadata changes when you upload the new binary. NOTE: Please be sure to make any metadata changes to all app localizations by selecting each specific localization and making appropriate changes. Guideline 5.2.1 - Legal - Intellectual Property We found that the seller or company name associated with your app does not reflect the name of the lottery service owner or government entity referenced in your app or its metadata. The next submission of this app may require a longer review time, and this app will not be eligible for an expedited review until this issue is resolved. Next Steps \- Review the Intellectual Property section of the App Store Review Guidelines. \- Ensure your app is compliant with all sections of the App Store Review Guidelines and the Terms & Conditions of the Apple Developer Program. \- Once your app is fully compliant, resubmit your app for review. If you believe your app is compliant with the App Store Review Guidelines, you may submit an appeal. Alternatively, you may provide additional details about your app by replying directly to this message.

  內文中提到的 The next submission of this app may require a longer review time, and this app will not be eligible for an expedited review until this issue is resolved. 

## 最後的實際時間就是一個月

 

* * *

# 那到底是什麼會影響AppStore審查的速度？

後來得知的訊息是每個開發者帳號都會有對應的credit， 而這個credit會影響審查的速度。 帳號初始化後，平均能在一週內獲得首次審查，隨著審查人員對開發者的認識度增加，以及 Application的完整度提高；審查時間，會逐漸縮短至三天內獲得審查結果回應； 若 credit 維持良好，在提交審查的當日凌晨便可進入審查階段。 若 App 提交前已支援並提交適合最新裝置的版本，這也意味著開發者配合 Apple 的策略，審查速度也能獲得提升。 

### credit is most important thing in review.

* * *

# 審查人員大概有多久的時間審查App?

請以審查人員對每個 App 最多平均只有20分鐘，實際上7分鐘左右來計算，每次一個人類可以接受幫忙除錯的關注度。那麼我們也許可以比較容易理解審查人員工作的loading。 根據開發指南，以及您所指定的類別為教育，4+以上，由於包含法律上受到限制使用電子產品的幼童，這會加大審查人員的深度。 對於兒童使用的 Applcation 需要對應的措施，例如您的 App 開發網站指向 Facebook 頁面，該頁面是否需要登入，才能觀看，對於4歲兒童而言，Facebook是否允許該年齡者註冊帳號。  

* * *

# 如果被打槍很多次， 會解開什麼特殊的功能？

分開申請審查！ App若超過有超過3次互動以上才會到達的功能，可將 版面設計、顏色設計、功能測試、App icon等分開申請審查；不用完全做好了在申請審查； 分開審查的方式為，每次完成一部份，例如完成App Icon及螢幕截圖，就儲存，申請審查。並在備註裡request指定審查的部分即可。  

* * *

# 對於 Reject 條文不清楚， 還有什麼辦法尋求幫助？

若確實照著 reject 的條文不明白，請 Request a assist call for more detailed information about rejection in Chinese. 對於 review 回覆的標準不明白，您也可以直接致電 Apple 開發小組，並邀請中文人員協助您理解對審查的不確認處。 [電話連結](<https://developer.apple.com/contact/phone/cn/>) 講中文的喔！！  

* * *

  後來針對上面提到的條文， 後來得到的回覆如下 : 您的app在app store裡支援幾個語系，就需要幾個相對應的語系、包含App Store介紹、App UI，例如在App store上面表示支援丹麥語，您是否另外於後台增加丹麥語的app store介紹、丹麥語的螢幕截圖。這是主要的原因。 1\. 請考慮直接選擇僅支援簡體中文、繁體中文、英文三種語言。 2\. 由於您的app開發者在app store上顯示為公司名稱，但您的開發者帳號仍為個人名稱，尚未申請更改為Organization，並提供鄧白氏碼。 

## **所以審查將會延長至規定的 1 個月。**

請更改您的開發者名稱為後台顯示的名稱，或申請更改開發者為Organization身份，並提交鄧白氏碼。 

* * *

# 結論

所以 5. 2.1 Legal: Intellectual Property - General 這條被打槍的後果蠻嚴重的， 但當時我們團隊覺得 WTF!? 東西都是我們自己做的， 哪裡會有智慧財產權的問題， 沒想到是開發者名稱跟Organiztion身份不同所導致， 真是吃一塹長一智啊！  

## 感謝蘋果回覆問題的人員， 就甘心！

 

* * *

## [呆呆神射手](<https://l.facebook.com/l.php?u=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.lirise.shooter&h=ATNOYoL-H1Mtqs71239dzc8lrnu_ttWpV-6GFeyUVQpdrPR0SV-iX8A79EILwxep6r1LouOcgw6L-jhaFKsqW72PM9a3BQ0S6GmPjJpvUXiiz-07TSCoBi1y>)

透過以遊戲為主體，教育為輔助的形式， 讓用戶點好、點滿、點到上癮、點到英文滿分、點到 Taiwan No.1 。

Appstore : [下載連結](<https://l.facebook.com/l.php?u=https%3A%2F%2Fitunes.apple.com%2Fus%2Fapp%2Fshot-wordbie%2Fid1326722985%3Fl%3Dzh%26ls%3D1%26mt%3D8&h=ATMbuXt3n_SaxaCYmSyVZxYcfQnNqniKCBY6jF8UFsIpoWaiblqAX9JnnLjfJ-ZQadKTCXVoeZITdPcZEC1Wj4MAPXHZK8XD2yBIenQRWo_Zvesw7KtfV-4K>)

Google Play: [下載連結](<https://l.facebook.com/l.php?u=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.lirise.shooter&h=ATO1gLT0woqEU2j4bKB-IQajTif9uCOeNaak93FS3fyhu8AhvKRtk818JxlVx9afLzSQ5YPIJfKxzROlliu1LrQ-dI4brk0Ww_hKa4sWxHTh0r_fsWLhj9Md>)
