---
title: "Python - List 的用法與常用操作"
description: "Python 中的 list 是一種常用的資料結構，經過語言優化後功能強大。 List 跟 C++的陣列 array 很類似，是由有順序的 element 所匯集而成。"
pubDate: "2022-02-21"
category: "Python"
tags: ["list", "python"]
---

Python 中的 list 是一種常用的資料結構，經過語言優化後功能強大。 List 跟 C++的陣列 array 很類似，是由有順序的 element 所匯集而成。   
  
可以用 [ ] 括號來建立 list，其中的元素必須以逗號分隔。
    
    
    # 建立三個元素的 list, 並且命名為 alist
    alist = [ 1, 2, 3]

list 與陣列不同的地方在於 list 的每個元素可以是不同型別的元素，例如混雜字串與數字的陣列。
    
    
    combined_list = [1, "One", 2, "Two"] 

list 的取用使用索引 index， 索引可以從 0 -> 元素數量 -1，或者反過來，從 -1 (最後一個) 到 - ( 元素數量)。
    
    
    >>> alist = [ 1, 2, 3]
    >>> alist[0]
    1
    >>> alist[-1]
    3

## List 的切片有頭無尾 

list 的切片是 Python 的特色用法，比起許多語言而言易用且容易理解，而需要記住的莫過於切片有頭無尾。

使用切片的用法是用 : 來分隔頭尾，假設上面的例子 alist 需要前面兩個元素，可以使用下面的做法
    
    
    >>> another_list = alist[0:2]
    >>> another_list
    [ 1, 2 ]

[ m:n ] 可以切出由 m到n，但不包含 n 的片段，這樣有頭無尾的設計可以讓 [ m:n ] 的切片長度直接就是 n-m，可以減少bug的產生。

## List 常用操作

append() 可以將元素附加到 list 的末端。

insert( index, element ) 可以將 element 插入進指定索引處，而原本的索引所在元素都會往後一位。
    
    
    x = [1,2,3]
    x.insert("new element", 2)
    >> x
    >> [1, 2, "new element", 3]

sort() List的排序使用 sort()方法，sort會直接將原本的list做排序，改變其順序。預設sort()的排序由小到大、字母由 a->z。 也可以傳入函式讓 sort() 去做自定義的排序。 p.s 自定義排序較慢。
    
    
    def compare_len(string_element) :
        return len(string_element)
    word_list = ["Which", "string", "is", "longer?"]
    word_list.sort()
    print(word_list)
    >>> ['Which', 'is', 'longer?', 'string']
    
    word_list.sort(key = compare_len)
    print(word_list)
    >>> ['is', 'Which', 'string', 'longer?']

sorted() 會回傳一個排好序的list，而不會更改原本的 list。

in 算符可以測試 list 的某個元素是否存在。

用 index() 可以找出元素在 list 的索引值，通常使用前需要先使用 in 算符確認有存在後再使用，如果該元素沒有 index值會發出錯誤。

list 的淺層拷貝可以使用 x[:] 來複製整個x的list。 但如果 list 中的元素有好幾層，則需要使用深層拷貝 deepcopy ( 需要先import copy )。
    
    
    import copy
    original = [[0], 1, [2,3, [4] ]]
    deep = copy.deepcopy( original )
