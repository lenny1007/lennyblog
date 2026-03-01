---
title: "Swift - Core Data 新增、查詢、刪除、更新"
description: "private var appDelegate = UIApplication.shared.delegate as! AppDelegate private let context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext 透過 appDelegate.saveContext"
pubDate: "2018-02-24"
category: "技術"
tags: ["Swift"]
---

## 什麼是 Core Data ?

在 iOS(OSX) 應用程式中，要儲存資料可以使用資料庫或檔案，以及現在要介紹的 Core Data，所以 Core Data 的用途就是儲存資料。Core Data 是在 OSX 10.4 及 iOS 3.0 之後開始使用，它可以將物件序列化後儲存在 XML、binary(二位元檔)或 SQLite 資料庫。 Core Data 是一個儲存資料的框架，它的底層本質上還是使用 SQLite 資料庫，它提供簡單易用的方式讓你儲存資料，而不用撰寫複雜的 SQL 語法。如果你的專案有使用 Core Data，可以在該 App 的 Document 目錄中找到 sqlite 檔案。 

### Managed Object Model

* * *

Managed object model 會對應到資料儲存(persistent store)的一組紀錄，這裡的 persistent store 相當於資料庫； 而 Managed object model 即一組紀錄，相當於資料表(table)。 

  * NSManagedObjectModel 相當於所有 table 的集合
  * NSPersistentStoreCoordinator 相當於 database(SQLite)

## 專案設置 : Swift4 + Xcode9

* * *

  Github 範例檔案 : <https://github.com/lenny0929/CoreData101>   ![](http://34.81.115.112/wp-content/uploads/2018/02/entity.png) Step1. 先新增一個Entity, 叫做Items, 有兩個Attributes, 分別是 name, price 如上圖 ![](http://34.81.115.112/wp-content/uploads/2018/02/螢幕快照-2018-02-24-下午7.55.18.png) Step2. 點選你的Coredata檔案 .xcdatamodeld 後, 從Editor/Create NSManagedObject Subclass ... 之後應該會自動生成兩個檔案如下圖 ![](http://34.81.115.112/wp-content/uploads/2018/02/未命名.png) 這樣就完成初始專案的建置了 

## 新增一筆CoreData資料

* * *

ViewController底下， 新增兩個變數 
    
    
    private var appDelegate = UIApplication.shared.delegate as! AppDelegate
    private let context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext

透過 appDelegate.saveContext() 即可將資料存到資料庫中
    
    
    func addItems(name:String, price:Int32) {
    
        let item = NSEntityDescription.insertNewObject(forEntityName: "Items", into: context ) as! Items
        item.name = name
        item.price = price
        appDelegate.saveContext()
    }

其中由Xcode自動生成的儲存函式 AppDelegate.swift中 
    
    
    func saveContext () {
            let context = persistentContainer.viewContext
            if context.hasChanges {
                do {
                    try context.save()
                } catch {
                    let nserror = error as NSError
                    fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
                }
            }
        }

 

## 查詢一筆CoreData資料

* * *

來看看剛才新增的 Item 是否有新增成功。加入顯示全部資料的方法： 
    
    
    func showItems() {
            let request = NSFetchRequest<Items>(entityName: "Items" )
            do {
                let results = try context.fetch(request)
                for result in results {
                 print("Items Name: \(result.name!), Price: \(result.price)")
                }
            }catch{
                fatalError("Failed to fetch data: \(error)")
            }
        }
    

然後在原本新增產品的後面加入此方法： 
    
    
    self.addItems(name: "iPhoneX 64GB", price: 32900)
    showItems()

console應該會打印出 

**Items Name: iPhoneX 64GB, Price: 32900**

## 刪除一筆CoreData資料

* * *
    
    
    func cleanItems() {
           let request = Items.fetchRequest() as NSFetchRequest<Items>
            // 透過 predicate 將iPhoneX 找出來
            let item_name = "iPhoneX 64GB"
            request.predicate = NSPredicate(format: "name CONTAINS[cd] %@", item_name)
            do {
                let iphoneXs = try context.fetch(request)
                for iphoneX in iphoneXs {
                    // 刪除一個 NSManagedObject
                    context.delete(iphoneX)
                }
                // 刪除後記得儲存Context
                appDelegate.saveContext()
                
            } catch let error as NSError {
                print("Could not fetch. \(error), \(error.userInfo)")
            }
        }

## 更新一筆CoreData資料

* * *

更新資料一樣需要先將該資料取出， 更改後， 在儲存資料即可 
    
    
    func updateItems() {
            let request = Items.fetchRequest() as NSFetchRequest<Items>
            // 將iPhoneX 找出來
            let item_name = "iPhoneX 64GB"
            request.predicate = NSPredicate(format: "name CONTAINS[cd] %@", item_name)
            do {
                let iphoneXs = try context.fetch(request)
                if (iphoneXs.count > 0){
                    let product = iphoneXs[0]
                    product.price = 20000
                    appDelegate.saveContext()
                }
            } catch let error as NSError {
                print("Could not fetch. \(error), \(error.userInfo)")
            }
        }

以上就是CoreData 最基本的操作   ````
