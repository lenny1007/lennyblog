---
title: "Cocos2dx - 翻牌動畫的實作"
description: "這陣子在做遊戲的時候， 遇到了一個實作的問題， 想要做出翻牌的效果。 之前在另一個 App - 銀河單字卡 中， 也有實做類似的功能。 是採用 cocos2dx之实现扑克牌翻转效果的三种方法 中所使用的 OrbitCamera 的做法， 效果其實還可以。 有興趣的話可以去下載 銀河單字卡 看看效果。 但， 今天在做研究的時候， 發現除了上述的三種方法外， 發現了更為簡單易用的做法。 效果如下 Yo"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

這陣子在做遊戲的時候， 遇到了一個實作的問題， 想要做出翻牌的效果。 之前在另一個 App - 銀河單字卡 中， 也有實做類似的功能。 是採用 [cocos2dx之实现扑克牌翻转效果的三种方法](<http://blog.csdn.net/sharing_li/article/details/44980493>) 中所使用的 OrbitCamera 的做法， 效果其實還可以。 有興趣的話可以去下載 [銀河單字卡](<https://itunes.apple.com/tw/app/yin-he-dan-zi-ka-duo-yi-xing-xi/id910792242?mt=8>) 看看效果。 但， 今天在做研究的時候， 發現除了上述的三種方法外， 發現了更為簡單易用的做法。 效果如下 [Youtube 翻牌效果動畫](<https://youtu.be/5vt_ff7IU34>) 這個效果是以八秒為一個翻牌的循環， 當秒數變少時， 幾乎是完美的。 這邊附上程式碼， 讓大家實際玩看看。 
    
    
    auto cardBack = Sprite::create("card_back.png");
    cardBack->setPosition(Vec2(visibleSize.width/2 + origin.x, visibleSize.height/2 + origin.y));
    this->addChild(cardBack, 0);
    auto card = Sprite::create("card_sword.png");
    card->setPosition(Vec2(visibleSize.width/2 + origin.x, visibleSize.height/2 + origin.y));
    this->addChild(card);
    card->setRotation3D(Vec3(0, -90, 0));
    auto action = RotateBy::create(4, Vec3(0, 90, 0));
    cardBack->runAction( Sequence::create(action,  nullptr));
    card->runAction( Sequence::create(DelayTime::create(4), action->clone(), nullptr));
    

重點在於最下面的四行代碼。 簡單的說就是先將實際要翻出的卡片， 利用Rotate3D 翻成-90度, 這時要翻出的卡片因為垂直於畫面的Ｙ軸， 並不會出現在銀幕中， 然後將卡背翻轉以相同的方式翻轉Ｙ軸 90度後， 再接續卡片翻轉 90度， 即可得到翻牌的效果 。 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
