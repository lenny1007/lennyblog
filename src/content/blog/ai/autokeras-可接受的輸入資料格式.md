---
title: "AutoKeras 可接受的輸入資料格式"
description: "AutoKeras 模型一般可以接受輸入下面四種類型的資料"
pubDate: "2022-03-10"
category: "AI"
tags: []
heroImage: "https://image.pollinations.ai/prompt/AutoKeras%20%E5%8F%AF%E6%8E%A5%E5%8F%97%E7%9A%84%E8%BC%B8%E5%85%A5%E8%B3%87%E6%96%99%E6%A0%BC%E5%BC%8F%20artificial%20intelligence%20neural%20network%20futuristic%20high%20quality%20blog%20cover%20photo?width=800&height=450&nologo=true"
---

AutoKeras 模型一般可以接受輸入下面四種類型的資料 

## Numpy 陣列 (ndarray)

Numpy、scikit-Learn、Tensorflow 等 Python 套件都採用的陣列，只要電腦的記憶體可以容納得下你的資料，儲存成 ndarray 是最便利的選擇。

## Pandas 的 Series/ DataFrame 物件

Pandas 也是常用的資料套件，可以用來載入 CSV、Excel 資料表，其中內建的 DataFrame 可以直接輸入給 AutoKeras 模型不需要額外轉換成 Numpy 物件。

## TensorFlow Core 資料集

可以直接透過TensorFlow Core 中的預設 Module資料集下載資料並直接傳給 AutoKeras 圖形分類器訓練，這種形式的資料集相對比較少，但所有的資料集都已經預處理好了，很適合學習使用。 

![](http://34.81.115.112/wp-content/uploads/2022/03/image-22-1024x657.png)[預設資料集列表](<https://www.tensorflow.org/api_docs/python/tf/keras/datasets> "預設資料集列表")
    
    
    import numpy as np
    import tensorflow as tf
    import matplotlib.pyplot as plt
    import autokeras as ak
    
    from tensorflow.keras.datasets import mnist
    from tensorflow.keras.models import load_model
    
    (x_train, y_train) , (x_test, y_test) = mnist.load_data()
    
    print(x_train.shape)
    # 建立圖形分類器
    clf = ak.ImageClassifier(max_trials = 1)
    
    # 開始訓練圖形分類器
    clf.fit(x_train, y_train, epochs = 10)
    
    # 使用測試集評估模型的預測效果, 會回傳預測的準確率
    clf.evaluate( x_test, y_test )

![](http://34.81.115.112/wp-content/uploads/2022/03/image-21-1024x423.png)可以利用機器的 GPU 加速訓練的速度 ![](http://34.81.115.112/wp-content/uploads/2022/03/image-23-1024x759.png)

## TensorFlow 資料集 

有許多公開的資料集可以用來學習以及練習，這個有點類似 Python 生成器，能以串流形式從硬碟檔案或分散式檔案系統傳入資料，因此很適合用在深度學習與大型的資料集。

[TensorFlow DataSets 官方內建資料集列表](<https://www.tensorflow.org/datasets/catalog/overview#all_datasets> "TensorFlow DataSets 官方內建資料集列表")

基本上大型的資料集，比較建議先將資料轉換成 TensorFlow Dataset，也就是將自己的資料寫成 TensorFlow 資料集的格式，[官方的文件有詳細的作法，可以參考](<https://www.tensorflow.org/datasets/add_dataset> "官方的文件有詳細的作法，可以參考")。

將資料轉換成 TensorFlow 資料集有幾個好處 : 

  * 可以非同步預處理與建立資料佇列。
  * 提供 GPU 記憶體資料預載，所以在GPU處理完前一批資料後，可以直接使用下一批。
  * 可以從多種不同的資料源載入資料 ex. CSV 、Numpy、文字檔、資料夾等

使用前請先記得安裝 package

![](http://34.81.115.112/wp-content/uploads/2022/03/image-26.png)

使用 TensorFlow Datasets 的下載方式與上面的稍微有些不同，下面是參考的範例程式碼
    
    
    import numpy as np
    import tensorflow as tf
    import matplotlib.pyplot as plt
    
    import tensorflow_datasets as tfds
    import autokeras as ak
    
    mnist_train, mnist_test = tfds.load('mnist', split=["train","test"], as_supervised=True)
    
    ak0 = ak.ImageClassifier(num_classes=10, max_trials=1)
    ak0.fit(mnist_train, epochs=10)
    
    # 使用測試集評估模型的預測效果, 會回傳預測的準確率
    ak0.evaluate( mnist_test )

![](http://34.81.115.112/wp-content/uploads/2022/03/image-24-1024x814.png)
