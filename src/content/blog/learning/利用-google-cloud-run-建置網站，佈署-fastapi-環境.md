---
title: "利用 Google Cloud Run 建置網站，佈署 FastAPI 環境"
description: "透過 Severless 技術來佈署網站以及 WEB API 環境可以更快速地進行開發工作。"
pubDate: "2023-08-24"
category: "學習"
tags: []
heroImage: "http://34.81.115.112/wp-content/uploads/2023/08/image-1024x505.png"
---

透過 Severless 技術來佈署網站以及 WEB API 環境可以更快速地進行開發工作。

優點是透過每次的 CI 佈署，第一時間可以獲得產品環境的 Feedback，對比起傳統的佈署方式 ( 需要維護應用程式的基礎架構，包含伺服器、資料庫等 )， 不必考慮基礎架構的維護和擴展，只需要專注在撰寫應用程式。

缺點 : 服務是需要付費的。 但透過彈性的計費方式，閒置時不會產生額外成本，對於多產品、少流量的模式來說也許是更有效的資源運用模式。

## [](<https://nijialin.com/2023/03/19/gcp-why-need-cloudrun-as-serverless/#%E5%A6%82%E4%BD%95%E4%BD%88%E7%BD%B2%E5%88%B0-Cloud-Run-%E4%B8%8A>)如何佈署到 Cloud Run 上

### [](<https://nijialin.com/2023/03/19/gcp-why-need-cloudrun-as-serverless/#0-%E5%BB%BA%E7%AB%8B-main-py>)0\. 建立 main.py
    
    
    from fastapi import FastAPI
    
    app = FastAPI()
    
    @app.get("/")
    def read_root():
    return {"Hello": "World"}
    
    if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

### [](<https://nijialin.com/2023/03/19/gcp-why-need-cloudrun-as-serverless/#1-%E5%BB%BA%E7%AB%8B-requirements-txt-%E4%B8%A6%E6%94%BE%E5%85%A5%E4%BB%A5%E4%B8%8B%E5%85%A7%E5%AE%B9>)1\. 建立 requirements.txt 並放入以下內容
    
    
    fastapi==0.96.0
    uvicorn==0.22.0

### [](<https://nijialin.com/2023/03/19/gcp-why-need-cloudrun-as-serverless/#2-%E5%BB%BA%E7%AB%8B-Dockerfile>)2\. 建立 Dockerfile

GCR 背後的技術有一部分其實就是 Docker，如果熟悉 Docker 的話，可以很快速地利用GCR。
    
    
    FROM python:3.11-slim
    ENV PYTHONUNBUFFERED True
    ENV APP_HOME /app
    WORKDIR $APP_HOME
    COPY . ./
    
    RUN pip install --upgrade pip
    COPY requirements.txt .
    RUN pip install -r requirements.txt
    
    EXPOSE 8080
    
    CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
    

Google Cloud Run 預設使用 Port : 8080。 

第一次環境佈署所需要的檔案就這三個，main.py、Dockerfile、requirements.txt。

## 佈署到 Google Cloud Run

#### [](<https://nijialin.com/2023/03/19/gcp-why-need-cloudrun-as-serverless/#%E5%AE%89%E8%A3%9D-gcloud-command-line>)安裝 gcloud command line

gcloud 是 Google Cloud Platform 的命令行工具，它提供了一個簡單的方法來管理您在 GCP 上的資源。以下是安裝和使用 gcloud 的基本步驟：

前往 [Google Cloud SDK 官方網站](<https://cloud.google.com/sdk/docs/install>) 下載對應作業系統的安裝檔案。

安裝 Cloud SDK，按照安裝提示進行操作，並選擇您需要安裝的元件。您可以在安裝過程中選擇安裝 gcloud CLI。

安裝完成後，在終端或命令提示字元中輸入 `gcloud --version` 檢查安裝是否成功。

#### [](<https://nijialin.com/2023/03/19/gcp-why-need-cloudrun-as-serverless/#gcloud-%E5%9F%BA%E7%A4%8E%E8%A8%AD%E5%AE%9A>)gcloud 基礎設定

  * `gcloud init`：初始化 gcloud CLI，該指令會提示登錄 Google 帳戶，並選擇您要使用的 GCP 項目。
  * `gcloud config set project PROJECT_ID`：設定 GCP Project ID，以便 gcloud CLI 與該項目交互使用。
  * `gcloud auth login`：登錄 Google 帳戶。

#### [](<https://nijialin.com/2023/03/19/gcp-why-need-cloudrun-as-serverless/#%E9%80%8F%E9%81%8E-gcloud-%E4%BD%88%E7%BD%B2>)透過 gcloud 佈署
    
    
    gcloud run deploy fastapi-app --source .

選擇佈署區域與允許部署：

![](http://34.81.115.112/wp-content/uploads/2023/08/image-1024x505.png)我個人都是選擇 [1] ，將網站建置在台灣區。

這樣就可以將 FastAPI 應用程式成功佈署到 Google Cloud Run 上了。

現在無須手動將 Docker 映像檔上傳到 Google Artifact Registry，在執行 gclou deploy 時就會幫忙上傳 cloud storage & Registry 中了，但需要注意`記得定期清理 cloud storage`(佈署一次一個檔案)，否則會收儲存費用。

#### [](<https://nijialin.com/2023/03/19/gcp-why-need-cloudrun-as-serverless/#%E6%B8%AC%E8%A9%A6%E6%98%AF%E5%90%A6%E6%AD%A3%E5%B8%B8%E9%81%8B%E8%A1%8C>)測試是否正常運行

若佈署成功的話，會在 Terminal Console 中看到網址，點下去就可以成功訪問網站囉！

![](http://34.81.115.112/wp-content/uploads/2023/08/image-1-1024x154.png)

# 感想

Google Cloud Run 是一個功能強大的 Severless 平台，可以幫助開發人員快速地佈署和運行容器化應用程式，同時提供高可用性、可靠性和安全性。

關於對應的建置，其實 Google Cloud Run 省去了很多麻煩，相對應的也少掉了很多後端所需要的知識，比如說像 Docker 的建置、 CORS 設定等，如果不熟的開發者，可能在設定上，會遇到不少問題，但對應的討論以及除錯的討論串是比較少的。
