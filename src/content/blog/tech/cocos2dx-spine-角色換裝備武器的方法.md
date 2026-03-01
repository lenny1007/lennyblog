---
title: "Cocos2dx - Spine 角色換裝備武器的方法"
description: "前幾天遊戲想要開發一個紙娃娃換裝備衣服的系統， 開始研究Spine的具體作法。 將心得整理如下： 技巧1. 關閉 or 隱藏關鍵的 Attachment spSlot *slot = animationNode-&gt;findSlot(\"SLOTNAME\"); Slot_setAttachment(slot,0); 將Slot 的Attachment 設為零可以隱藏該Attachment。 技巧"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-%20Spine?width=1200&height=630&seed=5840&model=flux&nologo=true"
---

前幾天遊戲想要開發一個紙娃娃換裝備衣服的系統， 開始研究Spine的具體作法。 將心得整理如下： 技巧1. 關閉 or 隱藏關鍵的 Attachment 
    
    
    spSlot *slot = animationNode->findSlot("SLOTNAME");
    Slot_setAttachment(slot,0);
    

將Slot 的Attachment 設為零可以隱藏該Attachment。 技巧2. 設定對應的Slot 中的 Attachment 來更換裝備武器 
    
    
    animationNode->setAttachment("left_hand_slot", "sword01");
    

這種作法需要配合 Spine Editor中的命名， 而且所有需要使用到的武器裝備， 需要在Spine中做新增。 換句話說， 如果你一個角色有十種武器， 在角色對應的 Spine slot 中就需要新增十種武器的圖片。 有二十種不同骨骼動畫的角色， 搭配上十種可以新增的武器圖片， 應該就會是一個操死設計師的節奏。 技巧3. 複雜的Runtime 新增Attachment到 Spine的 Slot 僅附如下的參考連結： [Spine 官方 Runtime 文件](<http://zh.esotericsoftware.com/spine-using-runtimes>) 大概做法會是在程式碼中， 透過 Texture 的方式新增想要的客製化 Attachment， 之後再將這個 Attachment 新增到對應的 Slot 中。 結論如下: 

  1. Spine 中 切換 Skin 膚色的方法簡單， 但如果要切換具體的裝備， 則需要工程端與Spine設計端的合作。 主要是命名規則。
  2. Spine 升級成專業版之後可以使用的功能， 對於開發角色以及設計的環節有很大的加分作用。 主要是在 Meshes的使用上， 可以極大的減少圖片跟資源的使用。

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
