---
title: "[ Cocos2dx - C++]  編譯時間過長的解決方案"
description: "好吧， 萬一真的很懶散， 隨便寫程式， 要用什麼方式來解決這個問題！？"
pubDate: "2018-02-09"
category: "技術"
tags: ["C++"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20%5B%20Cocos2dx%20-%20C%2B%2B%5D?width=1200&height=630&seed=4303&model=flux&nologo=true"
---

在遊戲專案進行一段時間後， 隨著檔案數量的增加， 往往會發現專案的編譯時間會越來越長。 而 C++ 的特性也使得原始碼檔案會隨著時間而暴漲。

### 那麼編譯時間的增長原因究竟有哪些？

  * 1\. 標頭檔 include 不必要的檔案過多， 往往是因為沒有嚴格使用 Forward [Declaration](<https://en.wikipedia.org/wiki/Forward_declaration>) 的方式， 導致專案中的源碼相依關係過高， 造成編譯時間暴增。

> 在**《Effective C++》** 中的第 31 項條款，對於編譯依存關係的問題，刻下每位程式設計者都應該謹記於心的三條戒文：

> **1\. 如果 object references 或 object pointers 可以完成任務，就不要使用 objects。**

> **2\. 如果能夠，盡量以 class 的宣告取代 class 的定義。**

> **3\. 不要在表頭檔中 #include 其他表頭檔，除非你的表頭檔不這樣就無法編譯。**

好吧， 萬一真的很懶散， 隨便寫程式， 要用什麼方式來解決這個問題！？

可以使用 cppclean 這個小工具來幫助你找到 header 檔中不必要的引入。

#### [cppclean Github](<https://github.com/myint/cppclean>)

  * 2\. 將開源的 Cocos2dx 的 c++ 專案中的原始碼都引入專案中。

Cocos2dx 本身的 c++ 專案就蠻肥的， 有八百多個原始檔案， 光本身第一次編譯的時間就挺讓人不耐煩， 如果沒有要更改的話， 建議可以使用 Prebuild 的版本丟入專案中。

  * 3\. 程式碼的架構不夠扁平 。 簡單說， 改到越底層的檔案， 所有與該檔案相關的原始碼都需要重新編譯。 所謂的相關也就是程式碼有相依性。

減少元件之間的相依性， 往往是個不錯的習慣， 而架構越扁平， 帶來的是相依性的降低， 卻也讓元件的重複使用可能性降低， 這個拿捏就需要些經驗了。

One more thing.

[Large Scale C++ Software Design](<http://www.amazon.com/exec/obidos/ASIN/0201633620/ref=nosim/gamesfromwith-20>) 所介紹的 Redundant Guards 的技巧是幫助不大的。
    
    
    // Somefile.h
    #ifndef SOMEFILE_H_
    #include “SomeFile.h”
    #endif
    #ifndef SOMEOTHERFILE_H_
    #include “SomeOtherFile.h”
    #endif

# pragma once 也是一樣的情況。

有興趣看原文的可以[參考](<http://gamesfromwithin.com/physical-structure-and-c-part-2-build-times>)。

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。

[Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
