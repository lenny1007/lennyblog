---
title: "Swift - UINavigationController 如何放大標題"
description: "機器設定 : Swift4 + iOS11 + Xcode9 &nbsp; UINavigationController 有內建參數可以將標題放大 [caption id=\"attachment_315\" align=\"alignnone\" width=\"368\"] 標題 - Before[/caption] &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &n"
pubDate: "2018-02-09"
category: "技術"
tags: ["Swift"]
heroImage: "http://34.81.115.112/wp-content/uploads/2018/02/before.png"
---

機器設定 : Swift4 + iOS11 + Xcode9   UINavigationController 有內建參數可以將標題放大 [caption id="attachment_315" align="alignnone" width="368"]![](http://34.81.115.112/wp-content/uploads/2018/02/before.png) 標題 - Before[/caption] ![](http://34.81.115.112/wp-content/uploads/2018/02/after.png)                               程式碼如下: 
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.navigationBar.prefersLargeTitles = true
     }
