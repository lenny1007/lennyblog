---
title: "Cocos2dx - 客製化 元件與 CocosStudio 元件導入合作"
description: "一般在處理遊戲畫面的時候， 會使用 CocosStudio 將畫面與遊戲邏輯拆開， 純粹處理各種元件的擺放、 位置、 錨點等， 之後再由 CocosStudio 輸出 .csb 檔案讓專案使用。 但 CocosStudio 僅提供標準元件， ex. Button、 Text等， 一般來說， 在遊戲中會繼承標準元件， 然後客製化該元件， 使這個客製化的元件有通用的一些行為， 例如： 按鈕的動畫、 行"
pubDate: "2018-02-09"
category: "技術"
tags: ["cocos2d-x"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Cocos2dx%20-%20CocosStudio?width=1200&height=630&seed=2391&model=flux&nologo=true"
---

一般在處理遊戲畫面的時候， 會使用 CocosStudio 將畫面與遊戲邏輯拆開， 純粹處理各種元件的擺放、 位置、 錨點等， 之後再由 CocosStudio 輸出 .csb 檔案讓專案使用。 但 CocosStudio 僅提供標準元件， ex. Button、 Text等， 一般來說， 在遊戲中會繼承標準元件， 然後客製化該元件， 使這個客製化的元件有通用的一些行為， 例如： 按鈕的動畫、 行為。 目前 CocosStudio 對於客製化元件的支援並不十分友善。 參考文件： UI控件自定義擴展功能说明 可以看到文件中要在 CocosStudio 中導入一個客製化的元件需要做許多步驟才有辦法達到， 更別提對應的文件之稀少， 讓這件事的難度更顯提高。 

### 所以， 完全不建議如此使用客製化元件。

Q: 那麼建議的方式是？ 個人會傾向於仍然使用標準元件在 CocosStudio 的導入， 然後在對應的標準元件綁定時， 套上一層客製化類別的 Wrapper， 之後使用該Wrapper 做元件的操作。 這樣的方式尤其適合使用在有複雜操作跟綁定的 Layer 層。 程式範例 (客製化 Wrapper )： 
    
    
    class CustomLayer {
    public:
        void setupLayer(){
            bindUI();
            loadUI();
            setupActions();
        };
        CustomLayer(Layer* layer): rawLayer(layer){};
        ~CustomLayer();
        static shared_ptr<CustomLayer> createWithLayer(Layer* layer);
    private:
        void bindUI();
        void loadUI();
        void setupActions();
        Layer* rawLayer;
    };
    

使用方式範例 (導入元件的畫面中): 
    
    
    CustomLayer* customLayer = CustomLayer::createWithLayer(static_cast<Layer*>(rootNode->getChildByName("CocosStudio_Node")));
    

關於如何載入 CocosStudio 畫面檔案作法可參考： 

  * Cocos2dx - 從 Cocos Studio載入畫面
  * 和代码编辑器交互

* * *

最後， 我們有個關於 Cocos2d-x 的Facebook社團， 如果有任何疑難問題， 歡迎到社團發問。 

#### [Cocos2dx Taiwan 開發者社團](<https://www.facebook.com/groups/1653756191503266/?fref=ts>)
