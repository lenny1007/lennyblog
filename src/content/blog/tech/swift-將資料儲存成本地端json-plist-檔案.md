---
title: "Swift - 將資料儲存成本地端Json / Plist 檔案"
description: "Swift 4簡化了Swift 3中使用的整個JSON壓縮和序列化過程。現在你只需要使自定義類型實現Codable協定 – 它會將Encodable和Decodable兩者結合 – 這樣會讓你的工作更便利 。 機器設定 : Swift4 + iOS11 + Xcode9 public struct Sticker: Codable { public init( name: String, birt"
pubDate: "2018-02-11"
category: "技術"
tags: ["Swift"]
---

Swift 4簡化了Swift 3中使用的整個`JSON`壓縮和序列化過程。現在你只需要使自定義類型實現`Codable`協定 – 它會將`Encodable`和`Decodable`兩者結合 – 這樣會讓你的工作更便利 。 機器設定 : Swift4 + iOS11 + Xcode9 
    
    
    public struct Sticker: Codable {
      public init(
        name: String,
        birthday: Date?,
        normalizedPosition: CGPoint,
        imageName: String
      ) {
        self.name = name
        self.birthday = birthday
        self.normalizedPosition = normalizedPosition
        self.imageName = imageName
      }
      
      public let name: String
      public let birthday: Date?
      public let normalizedPosition: CGPoint
      public let imageName: String
      
    }

需要先將類別實現 Codable 協定, 之後便可以透過 JSONEncoder / JSONDecoder 來儲存/讀取檔案。 大幅的簡化了過往使用JSON檔案格式時的不便。
    
    
    // 初始化 sticker 類別
    let sticker = Sticker(
            name: "Cat",
            birthday: DateComponents(
              calendar: .current,
              year: 1014,
              month: 10,
              day: 7
            ).date,
            normalizedPosition: CGPoint(x: 0.27, y: 0.25),
            imageName: "castle"
          )
    
    
    let stickerURL = URL(
        fileURLWithPath: "sticker",
        relativeTo: FileManager.documentDirectoryURL.appendingPathComponent("Stickers")
     )
      
      // 檔案儲存的 URL 地址
      let jsonURL =stickerURL.appendingPathExtension("json")
      
      let jsonEncoder = JSONEncoder()
      // 設定為人類可讀的格式
      jsonEncoder.outputFormatting = .prettyPrinted
      let jsonData = try jsonEncoder.encode(sticker)
      // 將 JsonData 寫入 JsonURL = Stickers/sticker.json
      try jsonData.write(to: jsonURL)
      

使用`JSONEncoder`類別的創建一個 JSONEncoder物件。然後，使用`try`語句和encoder的`encode(_:)`方法將sticker壓縮到`jsonData`物件中。 然後將 jsonData 寫入jsonURL的檔案中 。 

## 本地端Json檔案讀取出來的做法
    
    
      // 將Json 檔案讀取出來的做法
      let jsonDecoder = JSONDecoder()
      let savedJSONData = try Data(contentsOf: jsonURL)
      let jsonSticker = try jsonDecoder.decode(Sticker.self, from: savedJSONData)
      // jsonSticker 會是 Sticker類別, 裡面的資料也會跟著被讀入
     

  將資料存成 Plist 檔的方式與Json 相同， 不同的僅僅是使用 PropertyListEncoder/ PropertyListDecoder 來做檔案的儲存讀取 。 

## 本地端Plist檔案儲存/讀取的做法
    
    
    let plistURL = stickerURL.appendingPathExtension("plist")
    let propertyListEncoder = PropertyListEncoder()
    let propertyListData = try propertyListEncoder.encode(sticker)
    try propertyListData.write(to: plistURL)
    
    let propertyListDecoder = PropertyListDecoder()
    let savedPropertyListData = try Data(contentsOf: plistURL)
    let plistScenes = try propertyListDecoder.decode(Sticker.self, from: savedPropertyListData)

## Json v.s Plist 檔案的使用時機

Json檔案由於可攜帶性高, 可以適用於許多情境, 像是網路檔案傳輸資料 API等, 如果考慮到跨平台等情境, 就應該使用Json檔案格式。 Plist檔案由於是以binary形式來儲存, 所以檔案較小, 如果考慮到檔案的大小, 需要最優化檔案大小時， 就用Plist。
