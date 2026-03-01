---
title: "Cocos2dx - 幀動畫的使用方法比較"
description: "Cocos2dx 目前在幀動畫的使用方法有兩種。 一種就是手動的將圖片資源打包， 透過 Animation 這個類別將動畫播放。 程式碼如下 SpriteFrameCache::getInstance()-&gt;addSpriteFramesWithFile(\"line_animation_ccz.plist\", \"line_animation_ccz.pvr.ccz\"); Vector&lt;"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

Cocos2dx 目前在幀動畫的使用方法有兩種。 一種就是手動的將圖片資源打包， 透過 Animation 這個類別將動畫播放。 程式碼如下 
    
    
    SpriteFrameCache::getInstance()->addSpriteFramesWithFile("line_animation_ccz.plist", "line_animation_ccz.pvr.ccz");
    Vector<SpriteFrame*> animFrames;
    for (int i = 1; i < 36; i++) {
        char szName[100] = { 0 };
        sprintf(szName, "line_animation_000%02d.png", i);
        animFrames.pushBack(SpriteFrameCache::getInstance()->getSpriteFrameByName(szName));
    }
    Animation* anim = Animation::createWithSpriteFrames(animFrames);
    anim->setDelayPerUnit(0.04);
    anim->setRestoreOriginalFrame(true);
    RepeatForever* lines = RepeatForever::create(Animate::create(anim));
    Sprite* s = Sprite::createWithSpriteFrameName("line_animation_00000.png");
    s->runAction(lines);
    s->setPosition(200, 200);
    addChild(s);
    SpriteFrameCache::getInstance()->removeSpriteFramesFromFile("line_animation_ccz.plist");
    

可以參考[官網的幀動畫教學](<http://www.cocos.com/doc/article/index?type=cocos2d-x&url=/doc/cocos-docs-master/manual/framework/native/v3/frame-animation/zh.md>) 另外一種則是透過 CocosStudio 在背景製作動畫， 將檔案輸出成 .csb 檔後， 使用 cocostudio::timeline::ActionTimeline 這個類別播放。 程式碼如下 
    
    
    auto lineNode = CSLoader::createNode("Line_Animation.csb");
    addChild(lineNode);
    cocostudio::timeline::ActionTimeline* action = CSLoader::createTimeline("Line_Animation.csb");
    lineNode->runAction(action);
    action->gotoFrameAndPlay(0, true);
    

這篇文章並不是想要教如何播放動畫， 而是想要告訴讀者使用不同的方式播放動畫所造成記憶體的差別。 沒有任何動畫的對照組 ![](http://user-image.logdown.io/user/1500/blog/12948/post/313277/aWgWE578TL2S92ExK8BK_%E5%B0%8D%E7%85%A7%E7%B5%84.png) 使用方法1 的實驗組， 使用了 Texture Packer 將資源檔封裝成 pvr.ccz 檔案 ![](http://user-image.logdown.io/user/1500/blog/12948/post/313277/HvFAI1duR7eeBQucTme6_%E5%AF%A6%E9%A9%971.png) 約莫多了 33MB 的記憶體用量。 使用方法2 的實驗組 ![](http://user-image.logdown.io/user/1500/blog/12948/post/313277/wq23r0V5SmyM5opSr6mZ_%E6%96%B9%E6%B3%952.png) 約多出 21MB 的記憶體用量。 以實際的檔案大小來說， 使用方法1 的檔案會略小， TP 的封裝還是挺不錯的， 約17KB, 而以 CocosStudio 的輸出， 全部的動畫檔案約 24KB。 差距是有感的。 但是以記憶體用量來說， 方法2 居然僅佔了方法 1 的 63%。 這真是太扯了。 小結： 如果真的需要使用幀動畫， 就使用方法2吧！ 

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
