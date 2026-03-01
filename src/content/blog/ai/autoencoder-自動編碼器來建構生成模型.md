---
title: "AutoEncoder 自動編碼器來建構生成模型"
description: "對於像是把一個數字變成一個影像的作法，通常是透過生成模型來達成， AutoEncoder 自動編碼器則是深度學習中常見最簡易的生成模型。"
pubDate: "2022-03-23"
category: "AI"
tags: []
heroImage: "http://34.81.115.112/wp-content/uploads/2022/03/autoencoder-architecture-1024x477.png"
---

對於像是把一個數字變成一個影像的作法，通常是透過生成模型來達成， AutoEncoder 自動編碼器則是深度學習中常見最簡易的生成模型。

## AutoEncoder 的運作原理

AutoEncoder 是透過一個 Encoder 編碼器與一個 Decoder 解碼器的組合來實作生成模型的機制。 

編碼的過程有點像是將資料濃縮、擷取，降維到較小維度的空間，而解碼則是相反的過程，類似於將較小維度空間的資料重建、還原、升維到原始維度的空間。 

在 AI 的領域中，這種濃縮的資訊通常以 z 來表示， z 所存在的空間稱為潛在空間。

![](http://34.81.115.112/wp-content/uploads/2022/03/autoencoder-architecture-1024x477.png)AutoEncoder 的架構圖

AutoEncoder 模型在訓練好之後，只需要將 Encoder 移走，透過給予 Decoder 解碼器隨機潛在空間的值，就可以生成所需要的影像。

換句話說，在 AutoEncoder (AE) 架構中，通常最後在使用的部分都是已經訓練完成的 Decoder 解碼器 。

## 如何訓練 AutoEncoder 模型 ?

Step1. 將影像 x 輸入 AutoEncoder 中。

Step2. 取得 AutoEncoder 輸出重建的影像 x' 。

Step3. 計算重建的影像與原始影像之間的差異值

  * 例如透過均方誤差 sqrt ( (x-x') ^2 ) / 絕對誤差 | x - x' | 比較 x & x' 之間的像素差異 ( C : 損失值 ) 
  * 再透過梯度下降法來優化

## AutoEncoder 的用途

  * 可以當作資料壓縮、萃取的方式，將影像、音檔降維並映射到潛在空間。 雖然資料多少會失真，但這個副作用剛好能符合我們的需求。(例如生成和原始圖片很像但又不完全一樣的新圖片)
  * 潛在空間可以用來作為分類的方式，由於原始資料映射後大幅縮減尺寸，也因此檢索起來快速很多，分類也更簡易。
  * 訓練 AutoEncoder 時不需要標籤，也因此可以適應更廣泛的資料型態與類型，資料的取得也較簡易。
  * 通常使用 AutoEncoder 生成的圖片，輸入的圖片解析度越高、輸出的圖片會越模糊，也因此對於低解析度的影像，使用 AutoEncoder 的機會比較高。

實務上， AutoEncoder 在訓練完之後會將整批的樣本資料映射到潛在空間，變成一群離散的點，因為這些點之間有間隙，所以如果剛好從間隙取樣，就有可能生成出品質很差的圖片。

也由於這些離散的點並沒有規則，所以想要生成特定的圖片 ( ex. MNIST 資料集的特定數字1 / 2 / 3 ) 會不知道如何取樣。 為了克服這些問題有了 AutoEncoder 的變形 Variational Autoencoder ( VAE )， 

VAE 是常見的 AutoEncoder 變形，實務上針對特定問題較常使用。 

### VAE 的訓練目標是將資料映射到潛在空間後，呈現出一種特定的連續分佈。

通常會讓 VAE 的潛在空間呈現常態分佈，找出適合的規則 ( ex. 標準差、平均值) 來界定資料在潛在空間的分佈區域。 

換句話說， VAE 可以讓資料是透過有規則方式去降維在潛在空間，可以更好的保存資料的特性以及屬性。

![](http://34.81.115.112/wp-content/uploads/2022/03/下載.png)MNIST 降維後在 2 維呈現常態分佈的數字 1-9 區間

## Variational Autoencoder ( VAE ) 實作程式範例

這個範例是透過 VAE 去生成手寫的圖片數字，透過 MNIST 資料集來訓練。

### 匯入套件

![](http://34.81.115.112/wp-content/uploads/2022/03/image-34-1024x241.png)
    
    
    from __future__ import print_function
    
    import numpy as np
    import matplotlib.pyplot as plt
    from scipy.stats import norm
    import tensorflow as tf
    
    from keras.layers import Input, Dense, Lambda, Reshape
    from keras.models import Model
    from keras import backend as K
    from keras import metrics
    from keras.datasets import mnist

### 超參數與取樣函式

![](http://34.81.115.112/wp-content/uploads/2022/03/image-41.png) ![](http://34.81.115.112/wp-content/uploads/2022/03/image-40.png)
    
    
    # defining the key parameters
    batch_size = 100
    original_dim = 784
    latent_dim = 2
    intermediate_dim = 256
    epochs = 5
    epsilon_std = 1.0
    
    def sampling(args: tuple):
        # we grab the variables from the tuple
        z_mean, z_log_var = args
        epsilon = K.random_normal(shape=(K.shape(z_mean)[0], latent_dim), mean=0.,
                                  stddev=epsilon_std)
        return z_mean + K.exp(z_log_var / 2) * epsilon

### 建立編碼器 Encoder 

![](http://34.81.115.112/wp-content/uploads/2022/03/image-36-1024x801.png)
    
    
    # input to our encoder
    x = Input(shape=(original_dim,), name="input")
    # intermediate layer
    h = Dense(intermediate_dim, activation='relu', name="encoding")(x)
    # defining the mean of the latent space
    z_mean = Dense(latent_dim, name="mean")(h)
    # defining the log variance of the latent space
    z_log_var = Dense(latent_dim, name="log-variance")(h)
    # note that "output_shape" isn't necessary with the TensorFlow backend
    z = Lambda(sampling, output_shape=(latent_dim,))([z_mean, z_log_var])
    # defining the encoder as a keras model
    encoder = Model(x, [z_mean, z_log_var, z], name="encoder")
    # print out summary of what we just did
    
    encoder.summary()
    

![](http://34.81.115.112/wp-content/uploads/2022/03/model.png)Encoder 模型圖

### 建立解碼器 Decoder 

![](http://34.81.115.112/wp-content/uploads/2022/03/image-37-1024x521.png)
    
    
    # Input to the decoder
    input_decoder = Input(shape=(latent_dim,), name="decoder_input")
    # taking the latent space to intermediate dimension
    decoder_h = Dense(intermediate_dim, activation='relu', name="decoder_h")(input_decoder)
    # getting the mean from the original dimension
    x_decoded = Dense(original_dim, activation='sigmoid', name="flat_decoded")(decoder_h)
    # defining the decoder as a keras model
    decoder = Model(input_decoder, x_decoded, name="decoder")
    decoder.summary()

### 將Encoder 、 Decoder 組合成 VAE 模型

![](http://34.81.115.112/wp-content/uploads/2022/03/image-42-1024x452.png)
    
    
    # grab the output. Recall, that we need to grab the 3rd element our sampling z
    output_combined = decoder(encoder(x)[2])
    # link the input and the overall output
    vae = Model(x, output_combined)
    # print out what the overall model looks like
    vae.summary()

### 設定損失函數與 VAE 模型設定 

![](http://34.81.115.112/wp-content/uploads/2022/03/image-43-1024x525.png)
    
    
    def vae_loss(x: tf.Tensor, x_decoded_mean: tf.Tensor,
                z_log_var=z_log_var, z_mean=z_mean,
                original_dim=original_dim):
        xent_loss = original_dim * metrics.binary_crossentropy(x, x_decoded_mean)
        kl_loss = - 0.5 * K.sum(
            1 + z_log_var - K.square(z_mean) - K.exp(z_log_var), axis=-1)
        vae_loss = K.mean(xent_loss + kl_loss)
        return vae_loss
    
    vae.compile(optimizer='adam', loss=vae_loss)
    vae.summary()

### 準備手寫資料集 MNIST 並將資料集正規化

![](http://34.81.115.112/wp-content/uploads/2022/03/image-44.png)
    
    
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    
    # 正規化
    x_train = x_train.astype('float32') / 255.
    x_test = x_test.astype('float32') / 255.
    
    # 將28*28矩陣轉換成 784 的一維陣列
    x_train = x_train.reshape((len(x_train), np.prod(x_train.shape[1:])))
    x_test = x_test.reshape((len(x_test), np.prod(x_test.shape[1:])))

### 開始訓練 VAE 模型

![](http://34.81.115.112/wp-content/uploads/2022/03/image-45-1024x909.png)可以看得出來 VAE 在經過訓練之後會趨近於一個優化的模型與數值，在第 13 輪訓練後就沒有太大的效果了。 
    
    
    vae.fit(x=x_train,
            y=x_train,
            batch_size=batch_size,
            epochs=epochs ,
            verbose = 1,
            validation_data= (x_test, x_test),
            shuffle=True)

### 透過 Decoder 隨機生成手寫數字的範例 

最後訓練完的 Decoder 是最終我們需要的生成器。

![](http://34.81.115.112/wp-content/uploads/2022/03/image-46-1024x373.png) ![](http://34.81.115.112/wp-content/uploads/2022/03/image-47.png)
    
    
    # display a 2D manifold of the digits
    n = 10  # figure with 15x15 digits
    digit_size = 28
    figure = np.zeros((digit_size * n, digit_size * n))
    # linearly spaced coordinates on the unit square were transformed through the inverse CDF (ppf) of the Gaussian
    # to produce values of the latent variables z, since the prior of the latent space is Gaussian
    grid_x = norm.ppf(np.linspace(0.05, 0.95, n))
    grid_y = norm.ppf(np.linspace(0.05, 0.95, n))
    
    for i, yi in enumerate(grid_x):
        for j, xi in enumerate(grid_y):
            z_sample = np.array([[xi, yi]])
            x_decoded = decoder.predict(z_sample)
            digit = x_decoded[0].reshape(digit_size, digit_size)
            figure[i * digit_size: (i + 1) * digit_size,
                   j * digit_size: (j + 1) * digit_size] = digit
    
    plt.figure(figsize=(10, 10))
    plt.imshow(figure, cmap='Greys_r')
    plt.show()
