---
title: "Cocos2dx - Singleton Class 範例"
description: "當系統中某項資源只有一個，而且絕對獨一無二時，最適合使用這個Pattern，也就是說使用這個Pattern可以確保物件個體只有一個，不會因programmer的疏忽而產生兩個或兩個以上。 Wiki - Singleton Setter &amp; Getter CC_SYNTHESIZE 參考寫法 Singleton.h class Singleton { public: static Singl"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-%20Singleton%20Class?width=1200&height=630&seed=3404&model=flux&nologo=true"
---

當系統中某項資源只有一個，而且絕對獨一無二時，最適合使用這個Pattern，也就是說使用這個Pattern可以確保物件個體只有一個，不會因programmer的疏忽而產生兩個或兩個以上。 

### [Wiki - Singleton](<https://zh.wikipedia.org/wiki/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F>)

  * [Setter & Getter CC_SYNTHESIZE 參考寫法](<http://cocos2dx.logdown.com/posts/289133-cocos2dx-setter-usage>)
  * Singleton.h 
        
        class Singleton {
        public:
        static Singleton* getInstance();
        // 所需要透過Singleton存取的變數
        CC_SYNTHESIZE(string, email, Email);
        private:
        static Singleton* singleton;
        Singleton();
         };
        

  * Singleton.cpp 
        
        Singleton* Singleton::singleton = nullptr;
        Singleton::Singleton() { }
        Singleton* Singleton::getInstance(){
        if (singleton == nullptr) singleton = new Singleton;
          return singleton;
        }
        

  * 用法 
        
        Singleton::getInstance()->getEmail();
        Singleton::getInstance()->setEmail("email@gmail.com");
        

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
