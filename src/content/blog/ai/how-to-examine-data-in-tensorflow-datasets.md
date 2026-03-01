---
title: "如何檢視 TensorFlow 資料集中的資料 ?"
description: "如果是 Tensorflow Datasets 的資料集可以利用內建的 info 功能去顯示資料集的範例。"
pubDate: "2022-03-11"
category: "AI"
tags: []
heroImage: "http://34.81.115.112/wp-content/uploads/2022/03/image-27-1024x636.png"
---

如果是 Tensorflow Datasets 的資料集可以利用內建的 info 功能去顯示資料集的範例。 
    
    
    import tensorflow_datasets as tfds
    import autokeras as ak
    
    (mnist_train, mnist_test), info = tfds.load('mnist', split=["train","test"], with_info = True, as_supervised=True)
    
    fig = tfds.show_examples(mnist_test, info)
    

![](http://34.81.115.112/wp-content/uploads/2022/03/image-27-1024x636.png)

更換成 cifar10 資料集，用相同的 tfds.show_examples() 顯示。 是相當方便的一個內建函式。

![](http://34.81.115.112/wp-content/uploads/2022/03/image-28-1024x855.png)

如果資料集不支援視覺化，上面的 show_examples() 可能會報錯，例如使用文字資料集 ag_news_subset。

![](http://34.81.115.112/wp-content/uploads/2022/03/image-29-1024x621.png)

文字資料集可以使用 with_info 先將敘述列印出來看資料的欄位有哪些，然後再使用 take() 取出部分資料看裡面詳細的資料是什麼。
    
    
    import tensorflow_datasets as tfds
    import autokeras as ak
    
    (news_train, news_test), info = tfds.load('ag_news_subset', split=["train","test"], with_info = True, as_supervised=True)
    
    print(info)
    

![](http://34.81.115.112/wp-content/uploads/2022/03/image-30-1024x774.png) 資料集的 DatasetInfo，裡面有詳細的敘述關於資料集的內容。 

以上面的資料集敘述中， supervised_keys 基本上就是要看的內容，這個資料集就是透過敘述去分類新聞是哪一類的，換句話說就是看標題分類。
    
    
    df = tfds.as_dataframe(news_train.take(10), info)
    print(df)

![](http://34.81.115.112/wp-content/uploads/2022/03/image-31.png)

取出十筆資料看詳細的內容。
