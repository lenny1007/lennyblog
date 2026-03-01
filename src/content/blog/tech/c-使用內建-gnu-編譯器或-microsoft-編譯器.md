---
title: "C++ 使用內建 GNU 編譯器或 Microsoft 編譯器"
description: "在不同的編譯器和作業系統上， 叫出 C++ 編譯器的指令都不同。 GNU 編譯器的預設指令是 g++ Mac: 在 Terminal環境下 $ g++ prog1.cpp -o prog1 $ 為系統提示號。 這個指令會生成一個 prog1 或 prog1.exe $ ./prog1 這指令可以執行對應生成的檔案 使用方式 g++ [option] filename 選項 -c : 只做編譯(不做"
pubDate: "2018-02-09"
category: "技術"
tags: ["C++"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20C%2B%2B%20GNU%20Microsoft?width=1200&height=630&seed=771&model=flux&nologo=true"
---

在不同的編譯器和作業系統上， 叫出 C++ 編譯器的指令都不同。 GNU 編譯器的預設指令是 g++ Mac: 在 Terminal環境下 $ g++ prog1.cpp -o prog1 $ 為系統提示號。 這個指令會生成一個 prog1 或 prog1.exe $ ./prog1 這指令可以執行對應生成的檔案 

### 使用方式

g++ [option] filename 

### 選項

-c : 只做編譯(不做連結) -S : 輸出組譯碼 -E : 將預處理結果顯示 -o filename : 指定輸出檔名 -ansi : 程式要求依據ansi c標準 -Dmacro : 使定義巨集(marco)為有效 -Dmarco=defn : 使定義巨集(marco)為defn -Wa,option : 將選項(option)傳給組譯器 -wl,option : 將選項(option)傳給連結器 -I : 追加include檔案的搜尋路徑 -L : 追加library檔案的搜尋路徑 -l : 指定連結的函式庫 -Wall : 顯示所有的警告訊息 -g : 編入除錯資訊(要使用GDB除錯一定要加) -O2 : 做最佳化 Example: g++ -o file a.c b.c c.c g++ -Wall -g -o test test.c g++ -Iinclude -Llibrary -lmy_lib -o test1 test1.c g++ -c -o test3 test.c
