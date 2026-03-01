---
title: "Cocos2dx - 物理引擎 物理時間暫停"
description: "將場景中所有物體 Physicbody 暫停時間 Director::getInstance()-&gt;getRunningScene()-&gt;getPhysicsWorld()-&gt;setSpeed(0); 恢復時間 Director::getInstance()-&gt;getRunningScene()-&gt;getPhysicsWorld()-&gt;setSpeed(1);"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
---

將場景中所有物體 Physicbody 暫停時間 
    
    
    Director::getInstance()->getRunningScene()->getPhysicsWorld()->setSpeed(0);
    

恢復時間 
    
    
    Director::getInstance()->getRunningScene()->getPhysicsWorld()->setSpeed(1);
