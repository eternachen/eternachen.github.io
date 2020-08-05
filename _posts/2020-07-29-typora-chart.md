---
layout: post
title: "Typora中用markdown绘制序列图和流程图"
keywords: typora markdown
description: "Typoro提供了强大的markdown编辑功能，在此之外它还提供了便捷的序列图和流程图绘制功能"
category: markdown
tags: typora markdown sequencechart flowchart
---

`Typora`是一个功能强大，使用简单的`Markdown`编辑器。笔者在之前使用过`Mou`，还有各种编辑器的Markdown Plugin。直到有一天看见同事使用`Typora`，顿时有相见恨晚的感觉。

`Typora`不仅是个简洁优秀的`Markdown`编辑器，它还提供足够好的绘图功能。对于IT从业人员来说，绘制序列图和流程图是基本技能。`Typora`提供了对这两种图形的良好支持，可以让使用者以思考的速度来生成相关的图形。让我们一起来看看怎样使用这个功能。

## 序列图

### 语法

[js-sequence-diagrams guide](https://bramp.github.io/js-sequence-diagrams/)

![Syntax for js sequence diagram](https://bramp.github.io/js-sequence-diagrams/images/grammar.png)

### 示例

```sequence
Title: "Jiulidaji's Daily Life"
Dad -> Mum : "Good morning"
Mum -> Mum : "I am so lucky"
Mum -->> Daughter : "Please study hard"
Dad -> Son : "Nice Kiddo"
Note right of Son: I am 4\nyears old
Daughter ->> Son : "My dear brother"
Son --> Dad : "Hi Dad,\nI am naughty"
```

![序列图示例](/assets/img/20200729_sequncechart.png)

## 流程图

### 指南

[flowchart.js guide](http://flowchart.js.org/)

### 示例

#### 示例 1 - 简单流程图

```flow
st=>start: Start
e=>end: End
op1=>operation: My Operation
cond=>condition: Yes
or No?
io=>inputoutput: catch something....
para=>parallel: parrel tasks
sub1=>subroutine: My Subroutine

st->op1->cond(yes)->io->e
cond(no)->para
para(path1,bottom)->sub1(right)->op1
para(path2,top)->op1
```

![流程示例1](/assets/img/20200729_flowchart1.jpg)

#### 示例 2 - 复杂流程图

```flow
st=>start: Improve your
l10n process!
e=>end: Continue to have fun!:>https://youtu.be/YQryHo1iHb8[blank]
op1=>operation: Go to locize.com:>https://locize.com[blank]
sub1=>subroutine: Read the awesomeness
cond(align-next=no)=>condition: Interested to
getting started?
io=>inputoutput: Register:>https://www.locize.app/register[blank]
sub2=>subroutine: Read about improving
your localization workflow
or another source:>https://medium.com/@adrai/8-signs-you-should-improve-your-localization-process-3dc075d53998[blank]
op2=>operation: Login:>https://www.locize.app/login[blank]
cond2=>condition: valid password?
cond3=>condition: reset password?
op3=>operation: send email
sub3=>subroutine: Create a demo project
sub4=>subroutine: Start your real project
io2=>inputoutput: Subscribe

st->op1->sub1->cond
cond(yes)->io->op2->cond2
cond2(no)->cond3
cond3(no,bottom)->op2
cond3(yes)->op3
op3(right)->op2
cond2(yes)->sub3
sub3->sub4->io2->e
cond(no)->sub2(right)->op1

st@>op1({"stroke":"Red"})@>sub1({"stroke":"Red"})@>cond({"stroke":"Red"})@>io({"stroke":"Red"})@>op2({"stroke":"Red"})@>cond2({"stroke":"Red"})@>sub3({"stroke":"Red"})@>sub4({"stroke":"Red"})@>io2({"stroke":"Red"})@>e({"stroke":"Red","stroke-width":6,"arrow-end":"classic-wide-long"})
```

![流程示例2](/assets/img/20200729_flowchart2.jpg)

参考
- [Draw Diagrams With Markdown](https://support.typora.io/Draw-Diagrams-With-Markdown/)
- [js-sequence-diagrams guide](https://bramp.github.io/js-sequence-diagrams/)
- [flowchart.js guide](http://flowchart.js.org/)
- 
