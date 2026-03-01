---
title: "[C++] Lambda 語法簡介"
description: "Lambda expression 是一種匿名函數的表示方式，它可以讓程式設計師將函數的內容直接以 inline 的方式寫在一般的程式碼之中，省去另外定義函數的麻煩，使用時機跟 functor 與 function pointer 類似，一般的狀況都是使用 lambda expression 定義一個匿名的函數，然後再將此函數當作另外一個函數的傳入參數來使用。 可以說類 Lambda 語法的形式，"
pubDate: "2018-02-09"
category: "技術"
tags: ["C++"]
---

> Lambda expression 是一種匿名函數的表示方式，它可以讓程式設計師將函數的內容直接以 inline 的方式寫在一般的程式碼之中，省去另外定義函數的麻煩，使用時機跟 functor 與 function pointer 類似，一般的狀況都是使用 lambda expression 定義一個匿名的函數，然後再將此函數當作另外一個函數的傳入參數來使用。

可以說類 Lambda 語法的形式， 在各種現代的語言中 (ex. Java, Swift, Obj-C ...) 都有類似的實現， 在需要 Callback函式呼叫時尤其好用。 

## Lambda expression 基本的用法
    
    
    Class A;
    [ A ] (int x) -> int
    {
     int n = x + y;
     return n;
    }
    

  * A 為傳入的變數， 若需要引用lambda函式外的變數， 由此傳入， 預設為使用傳值的方式(Call by value)
  * int x 為傳入函式的變數
  * -> int 為宣告Lambda函式回傳變數型態的語法

## Lambda 簡單範例
    
    
    int main() {
    auto square = [](int x) -> int { return x*x; };
    cout << square(3) << endl;
    }
    

  * cout結果： 9

## Lambda 語法參考

  * [C++11 Lambda Expression 語法教學與範例](<http://blogger.gtwang.org/2015/02/lambda-expression-in-c11.html>)
