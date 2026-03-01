---
title: "Swift - Animating View Properties 動畫教學"
description: "func fade( toImage: UIImage, showEffects: Bool ) { //Create &amp; set up temp view let tempView = UIImageView(frame: bgImageView.frame) tempView.image = toImage tempView.alpha = 0.0 tempView.center.y "
pubDate: "2018-03-06"
category: "技術"
tags: ["Swift"]
---

Swift 中可用來做動畫的屬性主要分成三大類別 : 

  1. Position & Size 
     * bounds 自已 (View) 相對於自己的位置和大小，也就是說**如果沒有去重設 Bounds 的話，座標永遠都是(0, 0)** 。
     * frame 自已 (View) 相對於父 View 的位置和大小。
     * center 中心點
  2. Transformation 
     * rotation 旋轉
     * scale 放大/縮小
     * translation 位移
  3. Appearance 
     * backgroundColor 背景顏色
     * alpha 透明度

![](http://34.81.115.112/wp-content/uploads/2018/03/未命名.png)   注意： 使用這些屬性來做動畫時， 會與 auto layout的 constraint 交互作用， 所以如果View 本身有constraint 在做完動畫後， 會再重新計算constraint， 動畫會在彈回去。 所以使用這些屬性時必須要注意使用的情境。 像是 FadeOut、 移動出場景並且移除、 或者動畫最後會回到初始的狀態都算是比較適合的情境。 

* * *

## Fade 函式

使用 tempView 來做背景的變換 ， 先將要轉成的背景圖案用tempView來做 FadeIn動畫， 原本的背景最後再換成 想轉成的背景 
    
    
    func fade(
        toImage: UIImage,
        showEffects: Bool
      ) {
        //Create & set up temp view
        let tempView = UIImageView(frame: bgImageView.frame)
        tempView.image = toImage
        tempView.alpha = 0.0
        tempView.center.y += 20
        tempView.bounds.size.width = bgImageView.bounds.width * 1.3
        bgImageView.superview?.insertSubview(tempView, aboveSubview: bgImageView)
        UIView.animate(
          withDuration: 0.5,
          animations: {
            //Fade temp view in
            tempView.alpha = 1.0
            tempView.center.y -= 20
            tempView.bounds.size = self.bgImageView.bounds.size
          },
          completion: { _ in
            //Update background view & remove temp view
            self.bgImageView.image = toImage
            tempView.removeFromSuperview()
          }
        )
    }

![](http://35.236.187.174/wp-content/uploads/2018/03/Simulator-Screen-Shot-iPhone-8-Plus-2018-03-05-at-23.53.39-169x300.png) ![](http://35.236.187.174/wp-content/uploads/2018/03/Simulator-Screen-Shot-iPhone-8-Plus-2018-03-05-at-23.53.36-169x300.png)

兩個圖背景切換函式 

* * *

## 移動函式範例
    
    
    func moveLabel(
      label: UILabel,
      text: String,
      offset: CGPoint
    ) {
       //Create & set up temp label
       let tempLabel = duplicateLabel(label: label)
       tempLabel.text = text
       tempLabel.transform = CGAffineTransform(translationX: offset.x, y: offset.y)
       tempLabel.alpha = 0.0
       view.addSubview(tempLabel)
       //Fade out & translate real label
       UIView.animate(
         withDuration: 0.5,
         delay: 0.0,
         options: .curveEaseIn,
         animations: {
           label.transform = CGAffineTransform(translationX: offset.x, y: offset.y)
           label.alpha = 0.0
         },
         completion: nil
       )
       //Fade in & translate temp label
       UIView.animate(
         withDuration: 0.25,
         delay: 0.2,
         options: .curveEaseIn,
         animations: {
           tempLabel.transform = .identity
           tempLabel.alpha = 1.0
         },
         completion: { _ in
            //Update real label & remove temp label
            label.text = text
            label.alpha = 1.0
            label.transform = .identity
            tempLabel.removeFromSuperview()
         }
        )
     }

[embed]https://youtu.be/muMaJKr6L28[/embed] 

# 

[hf_form slug="%e4%b8%8b%e8%bc%89%e7%af%84%e4%be%8b%e7%a8%8b%e5%bc%8f%e7%a2%bc"]
