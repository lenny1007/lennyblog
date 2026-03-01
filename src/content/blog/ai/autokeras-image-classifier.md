---
title: "AutoKeras 的 Hello World - 建立圖像分類器"
description: "在 AI 訓練最常見到的第一個例子，是利用 MNIST 資料集的手寫數字圖像，透過 Deap Learning 的方式讓分類器能正確辨識圖像為 0 - 9。"
pubDate: "2022-03-02"
category: "AI"
tags: ["AutoKeras", "ImageClassifier"]
heroImage: "http://34.81.115.112/wp-content/uploads/2022/03/image-2.png"
---

在 AI 訓練最常見到的第一個例子，是利用 MNIST 資料集的手寫數字圖像，透過 Deap Learning 的方式讓分類器能正確辨識圖像為 0 - 9。

MNIST 是機器學習領域知名也被廣泛使用的資料集之一，包含 70,000張圖像 ( 60,000 張訓練圖像和 10,000張測試圖像 )，每張圖像都是 28 x 28 像素的灰階圖片。

![](http://34.81.115.112/wp-content/uploads/2022/03/image-2.png)MNIST 手寫數字圖像例子

## 取得MNIST資料集

可以透過 tensorflow 內建常用的資料集來導入取得 MNIST 資料集。 
    
    
    from tensorflow.keras.datasets import mnist

![](http://34.81.115.112/wp-content/uploads/2022/03/image-3-1024x699.png)

也由於常見的資料集如上面modules所示，所以一般常用於資料學習的資料集莫過於上面那些，實際應用上如果要建立自己的資料集跟訓練資料，需要另外透過其他的方式來取得。

導入內建資料集的方式非常簡單。

`(x_train, y_train) , (x_test, y_test) = mnist.load_data()`

![](http://34.81.115.112/wp-content/uploads/2022/03/image-4-1024x410.png)由圖可以知道 x_train 的資料集的形狀是 60000 * 28 * 28。

## 建立圖形分類器以及開始訓練

![](http://34.81.115.112/wp-content/uploads/2022/03/image-5.png)

透過 AutoKeras 來建立並訓練圖形分類器，只需要三行程式碼就可以開始訓練。 

![](http://34.81.115.112/wp-content/uploads/2022/03/image-6.png)

## 評估圖形分類器 - evaluate()

![](http://34.81.115.112/wp-content/uploads/2022/03/image-7.png)

evaluate() 會傳回兩個數值，一個是損失值，一個是準確率。 

![](http://34.81.115.112/wp-content/uploads/2022/03/image-9.png)

上面預測的準確率與訓練集的準確率很接近，表示沒有過度配適 overfitting 的問題。

## 輸出&載入訓練好的模型

![](http://34.81.115.112/wp-content/uploads/2022/03/image-10.png)

可以先將圖形分類器輸出成之後需要使用的模型，就不用每次都從頭訓練過。

上面的程式碼可以印出 model 的架構

![](http://34.81.115.112/wp-content/uploads/2022/03/image-11.png)

透過 model.summary() 可以了解目前模型的樣子，而 model.save 會在 Jupyter 檔案底下將模型存成您指定的檔名。

![](http://34.81.115.112/wp-content/uploads/2022/03/image-12.png)

預設的模型會存成一個資料夾，可以透過下面的方式 

load_model( '檔名' , custom_objects = ak.CUSTOM_OBJECTS ) 去讀取對應的模型。

![](http://34.81.115.112/wp-content/uploads/2022/03/image-13.png)

使用前記得 import 相關的 load_model 函式

![](http://34.81.115.112/wp-content/uploads/2022/03/image-15.png)

## 使用載入的 model 預測圖片並產生結果 

model.predict () 可以將需要預測的圖片陣列傳入，會回傳並產出對應的結果。

![](http://34.81.115.112/wp-content/uploads/2022/03/image-16.png) ![](http://34.81.115.112/wp-content/uploads/2022/03/image-17.png)
