---
title: "Cocos2dx -  Setter 以及 Getter 的用法"
description: "Setter 以及 Getter 是在將類別封裝時常使用的方式， 但針對每個變數實作Setter &amp; Getter既繁瑣又麻煩， 所幸Cocos2dX 有實做出一組 Macro 可供開發者使用。 CC_SYNTHESIZE - 同時宣告Setter &amp; Getter CC_SYNTHESIZE(&lt;#varType#&gt;, &lt;#varName#&gt;, &lt;#f"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-%20Setter%20Getter?width=1200&height=630&seed=5056&model=flux&nologo=true"
---

Setter 以及 Getter 是在將類別封裝時常使用的方式， 但針對每個變數實作Setter & Getter既繁瑣又麻煩， 所幸Cocos2dX 有實做出一組 Macro 可供開發者使用。 

## CC_SYNTHESIZE - 同時宣告Setter & Getter
    
    
    CC_SYNTHESIZE(<#varType#>, <#varName#>, <#funName#>);
    

  * 第一個參數為變數類型, ex. int, double, class ...
  * 第二個參數為變數的local名稱， 不會直接使用到。
  * 第三個參數為getter & setter的函式名稱 
        
        class User {
            CC_SYNTHESIZE(string, email, Email);
        }
        

    * 會在User 類別中， 宣告一個private 的 string email, public 的 getEmail(), setEmail(string)函式 
          
          void searchUserWithEmail (shared_ptr<User> user)
              {
           string email = user->getEmail();
           // ....
              }
          

## 其他Macro用法

  * CC_PROPERTY_PASS_BY_REF(int, m_energy, Energy);
  * CC_PROPERTY_READONLY(int, m_energy, Energy);
  * CC_PROPERTY_READONLY_PASS_BY_REF(int, m_energy, Energy);
  * CC_SYNTHESIZE(cocos2d::CCObject*, m_weapon, Weapon);
  * CC_SYNTHESIZE_PASS_BY_REF(cocos2d::CCObject*, m_weapon, Weapon);
  * CC_SYNTHESIZE_READONLY(cocos2d::CCObject*, m_weapon, Weapon);
  * CC_SYNTHESIZE_READONLY_PASS_BY_REF(cocos2d::CCObject*, m_weapon, Weapon);
  * CC_SYNTHESIZE_RETAIN(cocos2d::CCObject*, m_weapon, Weapon);

### 筆者: 這相當好用啊， 如果有早知道就好了...

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
