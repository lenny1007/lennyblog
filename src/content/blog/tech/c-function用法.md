---
title: "[C++] function用法"
description: "function 是一個舊用法新用， 主要可以用來取代舊有的 Function pointer 以及 Function object的寫法。 簡單的理解是可以把函式拿來像變數使用， 傳入其他的函式中。 function 的基本用法 標頭檔 ： #include &lt; functional &gt; 範例： 宣告一個 function, 可以傳入一個 bool, 一個float當變數， 以及傳回"
pubDate: "2018-02-09"
category: "技術"
tags: ["C++"]
---

function 是一個舊用法新用， 主要可以用來取代舊有的 Function pointer 以及 Function object的寫法。 簡單的理解是可以把函式拿來像變數使用， 傳入其他的函式中。 

## function 的基本用法

  * 標頭檔 ： #include < functional >
  * 範例： 宣告一個 function, 可以傳入一個 bool, 一個float當變數， 以及傳回一個int值 
        
        function < int (bool, float) > nameOfFunction;
        

## function 的範例
    
    
    class fClass {
    public:
      static int square (int x) {
         return x*x;
     };
    };
    

* * *
    
    
    int main(int argc, const char * argv[]) {
        function< int (int) > squareFunction;
        squareFunction = fClass::square;
        cout<< squareFunction(3);
        return 0;
    }
    

  * cout 結果： 9

## function 參考

  * [在 C++ 裡傳遞、儲存函式 Part 1：Function Pointer](<https://kheresy.wordpress.com/2010/11/03/function_pointer/>)

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
