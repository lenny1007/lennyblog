---
title: "Win 11 安裝  AutoKeras 與本機端支援 GPU 運行"
description: "目前使用 AutoKeras 最方便快速的方式除了雲端的 Google Colaboratory 外，就是在本機端安裝 Jupyter Notebook 來跑簡單的機器學習的範例。"
pubDate: "2022-02-23"
category: "AI"
tags: ["AI"]
---

目前使用 AutoKeras 最方便快速的方式除了雲端的 Google Colaboratory 外，就是在本機端安裝 Jupyter Notebook 來跑簡單的機器學習的範例。

如果需要更快速的運算跟訓練模型，就需要充分利用本機端原本就有的 GPU ，當然有額外的錢外接一張eGPU也是不錯的選擇。

這篇文章主要是介紹安裝 AutoKeras 與本機端支援 GPU 運行的流程。

## Step1. 安裝 Anaconda 來建置環境跑 AutoKeras

使用 Anaconda 的好處是他擁有豐富的套件包與良好的套件管理，在資源（硬碟）足夠的情況下，安裝它可以為我們省去很多套件相關的麻煩。

Anaconda 是一種 Python 語言的免費增值開源發行版，用於進行大規模數據處理, 預測分析, 和科學計算, 致力於簡化包的管理和部署。Anaconda 使用 軟體包管理系統 Conda 進行包管理。

[Anaconda 個人版安裝連結 ](<https://www.anaconda.com/products/individual> "Anaconda 個人版安裝連結　")

## Step2. 安裝 Nvidia CUDA Toolkit 

要能在本機端支援 GPU 的運算，前提是你的顯卡有支援 CUDA 架構 3 .5 以上的版本。

下載並[安裝 CUDA Toolkit ](<https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_network> "安裝 CUDA Toolkit ")

![](http://34.81.115.112/wp-content/uploads/2022/02/image-1024x663.png)下載並安裝 CUDA Toolkit  ![](http://34.81.115.112/wp-content/uploads/2022/02/image-1.png) ![](http://34.81.115.112/wp-content/uploads/2022/02/image-2.png)選擇快速 (建議選項) 直接按下一步即可

## Step3. 安裝 cuDNN 函式庫

`cuDNN` 全名為：`NVIDIACUDA®深度神經網絡庫` 是用於 [`深度神經網絡` ](<https://developer.nvidia.com/deep-learning>)的GPU加速庫。 cuDNN為標準例程提供高度調整的實現，例如卷積，池化，規範化和激活層。而 cuDNN 同時也是 NVIDIA [`深度學習SDK`](<https://developer.nvidia.com/deep-learning-sdk>) 的一部分。

全球深度學習研究人員和框架開發人員依靠 `cuDNN` 實現高性能 GPU 加速。它允許他們專注於訓練神經網絡和開發軟件應用程序，而不是花時間在低級 GPU 性能調適上。 `cuDNN` 加速了廣泛使用的深度學習框架，包括 `Caffe2`，`MATLAB`，`Microsoft Cognitive Toolkit` ， `TensorFlow` ， `Theano` 和 `PyTorch` 。

首先，前往 NVIDIA DEVELOPER 官網，[點擊下載 cuDNN](<https://developer.nvidia.com/rdp/cudnn-download> "點擊下載 cuDNN")。

![](http://34.81.115.112/wp-content/uploads/2022/02/image-3-1024x455.png)需要先註冊開發者會員帳號。 

> 解壓縮檔案後會得到一個 CUDA 資料夾，分別含有 `bin` 、 `include` 、 `lib` 三個資料夾  
> 

![](http://34.81.115.112/wp-content/uploads/2022/02/image-6.png)

將其內部的檔案，分別移至 `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.6` 路徑下的對應資料夾中  

![](http://34.81.115.112/wp-content/uploads/2022/02/image-4.png)

例如： `bin` 裡面，需包含 `cudnn64_8.dll`  

![](http://34.81.115.112/wp-content/uploads/2022/02/image-7.png)

再分別將三個資料夾的檔案拖移至對應的位置後，將下列路徑加入環境變數中，以利將來調用

  * C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.6\bin
  * C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.6\extras\CUPTI\lib64
  * C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.6\include
  * C:\cuda\bin

打開控制台→系統及安全性→進階系統設定→進階→環境變數（或是直接在控制台中搜尋 PATH）  
尋找「系統變數」中「Path」的部份並用左鍵雙擊，新增上面的變數

## Step4. 測試 tensorflow GPU 是否有正常運行
    
    
    from tensorflow.python.client import device_lib
    print(device_lib.list_local_devices())

![](http://34.81.115.112/wp-content/uploads/2022/02/image-8-1024x485.png)

如果你的輸出訊息有出現你的顯卡型號就表示可以正常運行了 !

## Debug1. 如果會當機或者 kernal 會死掉，可以檢視下面的步驟 

在最新版本 (cuDNN v8.3.1 (November 22nd, 2021), for CUDA 11.5) 會有此問題，

[去官網下載 zlib 的package](<https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html#install-zlib-windows> "去官網下載 zlib 的package")，然後將 zlibwpi.dll 這個檔案的資料夾設定進系統的環境變數。 

就可以正常運行 GPU 了。 

![](http://34.81.115.112/wp-content/uploads/2022/03/PXtpG-1024x417.png) ![](http://34.81.115.112/wp-content/uploads/2022/03/image-1024x384.png)我個人將該檔案解壓縮到 CUDA 資料夾，你可以選擇任意資料夾

環境變數記得設定

![](http://34.81.115.112/wp-content/uploads/2022/03/image-1-1024x646.png)

## Debug2. 如果你有安裝 tensorflow + tensorflow-gpu 可能會出問題

從 TensorFlow 2.1 開始，透過 pip 安裝 `tensorflow` 即同時包含 GPU 支援，無需通過特定的 pip `tensorflow-gpu` 安裝 GPU 版本。

![](http://34.81.115.112/wp-content/uploads/2022/03/image-19-1024x435.png)Anaconda 有安裝的套件 ![](http://34.81.115.112/wp-content/uploads/2022/03/image-20-1024x405.png) `tensorflow-gpu` 並沒有安裝也能支援 GPU 在本機端 Jupyter 中運行
