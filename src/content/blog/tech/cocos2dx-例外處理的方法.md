---
title: "Cocos2dx - 例外處理的方法"
description: "C++ 為主的例外處理 - throw exception double divide(double a, double b) { if (b == 0) { string error = \"除法分母不得為0\"; throw invalid_argument(error); } return a / b; } int main(void) { try { std::cout &lt;&lt; di"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-?width=1200&height=630&seed=1822&model=flux&nologo=true"
---

## C++ 為主的例外處理 - throw exception
    
    
    double divide(double a, double b) {
      if (b == 0) {
          string error = "除法分母不得為0";
          throw invalid_argument(error);
        }
        return a / b;
    }
    int main(void) {
      try {
          std::cout << divide(20, 5) << std::endl;
          std::cout << divide(20, 0) << std::endl;
        }
        catch (...) {
            // 在此處寫例外發生要如何處理
        }
        return 0;
    }
    

### Pros:

  * C++ 原生的例外處理可以輕易的與 Xcode 以及測試套件整合， 所有例外情形皆可輕易地捕捉到

### Cons:

  * 不支援類似 Java 中函式宣告後， 可在編譯器階段檢查是否實做對應的 catch 函式
  * 範例： 宣告不會拋出例外， 但實際有拋出例外時， 編譯會過 
        
        void AFunctionDefineNOThrow() throw()   {
            throw "隨便你想傳什麼， Compiler不會管";
        }
        

  * 不建議但可使用自己自訂的exception 類別， 並在throw 階段拋出自訂的 exception 類別

### 例外參考

  * [例外編寫方式](<http://www.gotw.ca/publications/mill22.htm>)

* * *

## CCAssert 為主的例外處理方式
    
    
    CCASSERT(<#cond#>, <#msg#>);
    

基本上CCASSERT與斷言的功能一致， 在滿足第一個條件式時， 會跳出例外以及訊息。 
    
    
    CCASSERT( i < 9,"i 應該大於9, 小於９時會跳出這段訊息");
    

### Pros:

  * 可以替代中斷點以及CCLOG的功能， 實作簡易方便

### Cons:

  * 功能陽春， 需要使用的人自己定義滿足條件， 如果沒有定義滿足條件， 就無法捕捉
  * 會使程式碼較為零碎
  * 例外發生時， 無法針對情況做特殊處理

* * *

#### 筆者： 例外好好寫， 輕鬆DeBug ...

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
