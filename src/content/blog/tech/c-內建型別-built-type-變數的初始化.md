---
title: "C++ 內建型別 (Built-in Type) 變數的初始化"
description: "C++ 內建型別會不會被自動初始化， 與它在哪裡被定義有關。 定義於函式主體外的任何變數都會獲得初值0。 定義於函式主體內的內建型別則無初值。 #include &lt;iostream&gt; using namespace std; int k; void printVal (){ // &lt;- 所謂的函式主體 int i; cout&lt;&lt; i &lt;&lt; endl; co"
pubDate: "2018-02-09"
category: "技術"
tags: ["C++"]
---

C++ 內建型別會不會被自動初始化， 與它在哪裡被定義有關。 定義於函式主體外的任何變數都會獲得初值0。 定義於函式主體內的內建型別則無初值。 
    
    
    #include <iostream>
    using namespace std;
    int k;
    void printVal (){ // <- 所謂的函式主體
        int i;
        cout<< i << endl;
        cout<< k << endl;
    }
    int main(){ // <- main 為例外的函式主體， 有賦值
        printVal();
        int m;
        cout << m << endl;
        return 0;
    }
    

### 輸出結果：

i: 32767 k: 0 m: 0 未初始化的變數其實帶有一個值。 編譯器首先把變數 “放在” 記憶體某處， 然後把那塊記憶體的 bit 樣式當作那個變數的初值。 由於初始化會影響程式的結果是否正確， 未明確定義的變數往往會造成很難除錯的 bug 產生， 所以還是養成一律初始化每個變數的習慣會省自己很多麻煩。
