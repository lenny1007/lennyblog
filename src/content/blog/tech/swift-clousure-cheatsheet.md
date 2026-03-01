---
title: "[Swift] - Clousure cheatsheet"
description: "Note: if the passed-in closure is going to outlive the scope of the method, e.g. if you are saving it to a property, it needs to be annotated with @escaping."
pubDate: "2018-02-09"
category: "技術"
tags: ["Swift"]
heroImage: "https://image.pollinations.ai/prompt/software%20programming%20code%20dark%20terminal%20clean%20minimalist%20technology%20%5BSwift%5D%20-%20Clousure%20cheatsheet?width=1200&height=630&seed=5985&model=flux&nologo=true"
---

## As a **variable** :

`var closureName: (ParameterTypes) -> ReturnType`

## As an **optional variable** :

`var closureName: ((ParameterTypes) -> ReturnType)?`

## As a **type alias** :

`typealias ClosureType = (ParameterTypes) -> ReturnType`

## As a **constant** :

`let closureName: ClosureType = { ... }`

* * *

## As a **parameter to another function** :

`funcName(parameter: (ParameterTypes) -> ReturnType)`

Note: if the passed-in closure is going to outlive the scope of the method, e.g. if you are saving it to a property, it needs to be annotated with @escaping.

## As an **argument to a function call** :

`funcName({ (ParameterTypes) -> ReturnType in statements })`

## As a **function parameter** :

`array.sorted(by: { (item1: Int, item2: Int) -> Bool in return item1 < item2 })`

## As a **function parameter with implied types** :

`array.sorted(by: { (item1, item2) -> Bool in return item1 < item2 })`

## As a **function parameter with implied return type** :

`array.sorted(by: { (item1, item2) in return item1 < item2 })`

## As the **last function parameter** :

`array.sorted { (item1, item2) in return item1 < item2 }`

## As the last parameter, **using shorthand argument names** :

`array.sorted { return $0 < $1 }`

## As the last parameter, **with an implied return value** :

`array.sorted { $0 < $1 }`

## As the last parameter, **as a reference to an existing function** :

`array.sorted(by: <)`

## As a function parameter **with explicit capture semantics** :

`array.sorted(by: { [unowned self] (item1: Int, item2: Int) -> Bool in return item1 < item2 })`

## As a function parameter **with explicit capture semantics and inferred parameters / return type** :

`array.sorted(by: { [unowned self] in return $0 < $1 })`
