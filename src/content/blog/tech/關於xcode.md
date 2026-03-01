---
title: "關於Xcode"
description: "在上一次分享的文章中， 主要是分享關於建立學生團隊跟團隊精神的經驗。 #1#2"
pubDate: "2018-02-09"
category: "技術"
tags: ["Xcode"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Xcode?width=1200&height=630&seed=2905&model=flux&nologo=true"
---

在上一次分享的文章中， 主要是分享關於建立學生團隊跟團隊精神的經驗。 [#1](<https://l.facebook.com/l.php?u=http%3A%2F%2Fiostech.logdown.com%2Fposts%2F241067-a-lesson-for-college-students&h=ATMQMMi2rTj804D8MQ9UDGZ_q3a_42Q8hnjU5tszu03ZiM8oJ3XRpo3li875sPpen4BGOTVrXz86J-3g4-q5_ENORe-jxvjx_q1igdOv5UazQ0khVCXH7-xBeHc4my7urclbFFhCdgU2TXW0IGE>)[#2](<https://l.facebook.com/l.php?u=http%3A%2F%2Fiostech.logdown.com%2Fposts%2F241093-chinese-workers-at-a-lesson-of-college-students-ii&h=ATPnmyNYUIzd_mfVITjFc3X-P-bmZ7e6gcA-mpVgVlJfi_QP0zqq8kCT2xmAJ4M66RjvfsaYJv8BzNTFYxHcOBuIsVsaMMyh7-NoTiXp5hEs9xtIJC_7K2VcKjm8Ojc28shGoKxsIxedgBqOID4>)

這次我針對iOS工程師一路學習上來所見到的一些經驗進行分享。 說起來軟體工程師針對不同的領域有各自的深化的內容， 但有些部分還是相通的。

工欲善其事， 必先利其器。 而在利其器之前， 我想更重要的是了解你所用的開發工具。

已開發iOS來說， Xcode是你最好的夥伴。 或者說， 在開發的過程中， 它是你每天都會使用的強大工具。 我們必須要了解它！ 僅針對較不常用但需要實際了解的部分做分享。

## Git & Source control

以開發的環境來說， Git是目前最常使用的分散式軟體版本控制工具。 基本上， Xcode有內建的功能來完成Git的功能。 諸如版本控制， Commit, Pull, Push等。 熟悉Git的各式功能， 是開發人員必備的基本功， 而這也是每個軟體團隊能夠共同開發貢獻程式碼的起始點。

## iOS Simulator

模擬器很多時候無法取代實體的機器， 諸如在測試iap、 location、 或者是陀螺儀的時候， 但是對於許多邏輯或者界面上的微調， Simulator 可以帶給開發者的幫助實在是太大了。 了解Simulator的限制以及與實體機器的不同， 跟Simulator能做到的事情， 對於開發時的幫助， 是無可取代的。

## Unit test && Refactor

單元測試與重構是學生比較不會接觸的領域， 但這塊對於成為一個專業的工程師， 已經是一個必備的技能。 Xcode提供了內建的許多功能， 可以相當輕易的去做Unit test以及Refactor, 比較困難的是落實去做這兩件初看起來很費工夫但其實在開發產品幫助相當大的事。

單元測試可以自動地完成許多需要手動操作的測試功能， 基本上最大的好處就是， 當有足夠多的單元測試時， 開發者就可以很輕鬆地針對程式部分進行優化以及修正。

## Break point && LLDB 的指令

老實說開發花最多時間的往往不是實際寫功能， 而是在解決各式各樣的bug， 了解break point跟lldb的指令， 可以極大地提升找到bug的效率， 當然最好的解決方式還是乖乖寫好unit test跟做好refactor的工作。

Symbolic break point & Exception break point 好好利用的話， 可以在開發時輕易地解決許多小手誤。

### Profile && Analyze

這兩個功能巨集其實相當值得花時間進行深入的學習以及研究， 大多數很難找的bug都藏在記憶體或者是效能瓶頸中， 最常見的是記憶體leak導致app整個閃退， 還有就是針對CPU、記憶體使用的優化， 這兩項功能都能提供不少資訊跟深度的功能讓開發者使用。

### Xcode 的各式熱鍵

各式的熱鍵其實也都可以用滑鼠來達到相同的事情， 但熟悉並去使用Navigation中的各式熱鍵會極大地提升開發的流暢性。 ex. 像是control+ command+ 上or下鍵可以讓你在寫程式時快速的切換.h以及.m檔。

### Xcode 的版面配置

每個人都有各自喜歡的開發版面配置， 但Xcode提供了可以讓開發者任意制定版面的自由， 找到自己開發的模式， 並在版面上優化， 雖然是一件很小的事情， 但對於開發的流暢度影響不可謂不大。 請熟悉Assistant Editor的用法， 並找到最合適自己的版面配置方式。

### FileMerge

這是Mac的內建軟體， 主要是可以讓你輕易的比較兩個file的不同之處， 基本上在開發的學習初期， Copy/ Paste是每個人最常做的一件事， 雖然不鼓勵， 但在想找到細微差異時， FileMerge可以輕鬆做到。

以上是一些常用的Xcode功能， 如果想深入學習iOS的開發， 這些功能的熟悉跟學習都是必要的。
