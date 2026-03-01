---
title: "Swift - 如何在本地端儲存 &amp; 讀取資料"
description: "本地端儲存以及讀取資料， Swift 是透過FileManager來做存取以及讀取的動作，本機端資料因為iOS 採用 Sandbox架構的緣故， 可使用來作為讀/存檔案的資料夾為Document。 所以第一步 找到 Document資料夾的 URL 機器設定 : Swift4 + iOS11 + Xcode9 import Foundation public extension FileManag"
pubDate: "2018-02-10"
category: "技術"
tags: ["Swift"]
heroImage: "https://image.pollinations.ai/prompt/Swift%20-%20%E5%A6%82%E4%BD%95%E5%9C%A8%E6%9C%AC%E5%9C%B0%E7%AB%AF%E5%84%B2%E5%AD%98%20%26amp%3B%20%E8%AE%80%E5%8F%96%E8%B3%87%E6%96%99%20technology%20code%20programming%20dark%20minimal%20high%20quality%20blog%20cover%20photo?width=800&height=450&nologo=true"
---

本地端儲存以及讀取資料， Swift 是透過FileManager來做存取以及讀取的動作，本機端資料因為iOS 採用 Sandbox架構的緣故， 可使用來作為讀/存檔案的資料夾為Document。 所以第一步 

## 找到 Document資料夾的 URL

機器設定 : Swift4 + iOS11 + Xcode9 
    
    
    import Foundation
    public extension FileManager {
      static var documentDirectoryURL: URL {
        return try! FileManager.default.url(
          for: .documentDirectory,
          in: .userDomainMask,
          appropriateFor: nil,
          create: false
        )
      }
    }

將 documentDirectoryURL用extension包住, 之後便可以使用 FileManager.documentDirectoryURL 來取得該URL路徑

## 針對Byte格式的本地端儲存&讀取
    
    
    let mBytes: [UInt8] = [
        240,          159,          152,          184,
        240,          159,          152,          185,
        0b1111_0000,  0b1001_1111,  0b1001_1000,  186,
        0xF0,         0x9F,         0x98,         187
    ]
    //mBytes = 😸😹😺😻
    let mDataURL = URL(
        fileURLWithPath: "mByte",
        relativeTo: FileManager.documentDirectoryURL
    )
    let mData = Data(bytes: mBytes)
    // 將資料mData 寫入對應的檔案mDataURL
    try mData.write(to: mDataURL)
    // 將資料mData 寫入對應的檔案mDataURL, 並給予副檔名
    try mData.write(to: mDataURL.appendingPathExtension("txt"))
    // 從檔案中取得對應所儲存的資料
    let savedMData = try Data(contentsOf: mDataURL)
    let savedMBytes = Array(savedMData)
    

## String的本地端儲存&讀取
    
    
    let string = String(data: savedMData, encoding: .utf8)!
    let stringURL =
      FileManager.documentDirectoryURL
      .appendingPathComponent("string")
      .appendingPathExtension("txt")
    // 將字串中的資料寫入string.txt儲存
    try string.write(to: stringURL, atomically: true, encoding: .utf8)
    // 直接透過URL將儲存的檔案讀取出來
    try String(contentsOf: stringURL)

 

## 圖片 Image 的本地端儲存＆讀取

有些時候需要將圖片從網路上讀取下來後儲存， 或者資料庫型態的檔案， 無法直接在Bundle.main 底下使用， 這時需要將檔案轉存在 Document中後使用。 如果需要將如下圖 Resources 中的 png 圖檔轉存進Document的話， 可以使用下面的函式。 ![](http://34.81.115.112/wp-content/uploads/2018/02/Resources.png)  
    
    
    // 在FileManager extension 底下新增函式
    
    static func copyPNGSubdirectoriesToDocumentDirectory(subdirectoryNames: String...) throws {
        for subdirectoryName in subdirectoryNames {
          let documentSubdirectoryURL = URL(
            fileURLWithPath: subdirectoryName,
            relativeTo: FileManager.documentDirectoryURL
          )
          
          //在本地端 Document 底下建立與Resource 相同的資料夾
          try? FileManager.default.createDirectory(
            at: documentSubdirectoryURL,
            withIntermediateDirectories: false
          )
          // 將 Resources 底下的 PNG 取得對應的 URL
          guard let pngURLs = Bundle.main.urls(
            forResourcesWithExtension: "png",
            subdirectory: subdirectoryName
          )
          else {continue}
          
          for pngURL in pngURLs {
            let data = try Data(contentsOf: pngURL)
            try data.write(
              to: documentSubdirectoryURL.appendingPathComponent(pngURL.lastPathComponent),
              options: .atomic
            )
          }
    
        }
    }

  如果需要取得 Document 中底下的 PNG 圖檔可以使用下面的函式 
    
    
    // 在FileManager extension 底下新增函式
     
    static func getPNGFromDocumentDirectory(subdirectoryName: String, imageName: String) -> UIImage? {
        return UIImage(contentsOfFile: FileManager.documentDirectoryURL.appendingPathComponent(subdirectoryName).appendingPathComponent(imageName).appendingPathExtension("png").path)
    }

之後便可以用下面的方式直接取得 UIImage 來使用 
    
    
    FileManager.getPNGFromDocumentDirectory(subdirectoryName: "Scenes", imageName: "Forest")

  Swift 在本地端儲存以及讀取資料， 大多使用 URL的形式後透過 FileManager來使用， 每次做取得動作時， 會有回傳 nil 的情形或者找不到檔案的例外情況， 用 try 以及 ? 來作為檔案格式, 需要特別注意 。
