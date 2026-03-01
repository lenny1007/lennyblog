---
title: "Swift  —  Regex"
description: "func Matches(for regex: String, in text: String) -&gt; [String] { do { let regex = try NSRegularExpression(pattern: regex) let nsString = text as NSString let results = regex.matches(in: text, range: "
pubDate: "2018-02-09"
category: "技術"
tags: ["Swift"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20Swift%20%E2%80%94%20Regex?width=1200&height=630&seed=5850&model=flux&nologo=true"
---

func Matches(for regex: String, in text: String) -> [String] {
        do {
            let regex = try NSRegularExpression(pattern: regex)
            let nsString = text as NSString
            let results = regex.matches(in: text, range: NSRange(location: 0, length: nsString.length))
            return results.map { nsString.substring(with: $0.range)}
        } catch let error {
            print("invalid regex: \(error.localizedDescription)")
            return []
        }
    }
    let pattern = "\\b([a-z])\\.([a-z]{2,})@([a-z]+)\\.ac\\.uk\\b"
    let testStr = "x.wu@strath.ac.uk, ak123@hotmail.com, e1s59@oxford.ac.uk, ee123@cooleng.co.uk, a.khan@surrey.ac.uk"
    print(Matches(for: pattern, in: testStr))
    

**\d** → 任何數字字元 **\D** → 任何不是數字字元 **\w** → 任何字串+底線，其實等於[a-z\dA-Z_] **\W** → 跟\w相反 **\s** → 空白鍵 **\S** → 任何不是空白鍵字元 **.** → 任何字串 **\\.** → .這個符號

**^** → 字串開頭位置

**$** → 字串結尾位置

(…)**** → 抓()裡面的字串

**a|b** → a 或 b, 它可以是一串字串 **\b** → 在邊界的字元, ex hello.pdf, h跟p都是邊界字元 **a?** → 抓**0個或1個的a , ex 我想抓a跟(a), /(?a/)? a* → 抓0以上的a, ex 抓hello全部, (\w*) a+ → 抓1以上的a**

**a{3}** → 抓3個a **a{3,}** → 抓3個以上a **a{3,6}** → 抓3–6個之間的a
