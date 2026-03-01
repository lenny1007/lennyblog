---
title: "Cocos2dx - 物理引擎 物理時間暫停"
description: "將場景中所有物體 Physicbody 暫停時間 Director::getInstance()-&gt;getRunningScene()-&gt;getPhysicsWorld()-&gt;setSpeed(0); 恢復時間 Director::getInstance()-&gt;getRunningScene()-&gt;getPhysicsWorld()-&gt;setSpeed(1);"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-?width=1200&height=630&seed=2378&model=flux&nologo=true"
---

將場景中所有物體 Physicbody 暫停時間 
    
    
    Director::getInstance()->getRunningScene()->getPhysicsWorld()->setSpeed(0);
    

恢復時間 
    
    
    Director::getInstance()->getRunningScene()->getPhysicsWorld()->setSpeed(1);
