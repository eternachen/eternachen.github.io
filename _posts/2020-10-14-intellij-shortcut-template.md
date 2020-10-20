---
layout: post
title: "以思考的速度码砖 - Intellij Idea快捷键与代码模版"
keywords: intellij idea shortcut code template
description: "本文中介绍了笔者在工作中遇到的一个关于systemd的问题"
category: 计算机科学 
tags: intellij idea shortcut code template
---



IDE是程序开发中必不可少的工具，不少工程师在每天大部分的时间都在使用它。

正如天下武功有“气宗”和“剑宗”一样，对于IDE的使用上也有不同的流派。有些人对IDE的功能了然于胸，用的非常纯熟，人剑（IDE）合一；而有些人则把IDE当作一个文本编辑器，主要的编码工作是在自己的头脑中完成，对这些大神来说用IDE，VIM，Emacs甚至Notepad其实没有区别；现实中大部分工程师介于二者之间。

对于一个Java程序员而言，IDEA已经超越Eclipse成为主流IDE。IDEA 全称 IntelliJ IDEA，是java编程语言开发的集成环境。IntelliJ在业界被公认为最好的java开发工具，尤其在智能代码助手、代码自动提示、重构、JavaEE支持、各类版本工具(git、svn等)、JUnit、CVS整合、代码分析、 创新的GUI设计等方面的功能可以说是超常的。IDEA是JetBrains公司的产品，这家公司总部位于捷克共和国的首都布拉格，开发人员以严谨著称的东欧程序员为主。它的旗舰版本还支持HTML，CSS，PHP，MySQL，Python等。免费版也支持Java,Kotlin等不少语言。

工欲善其事，必先利其器。对于我等即非剑宗大师，又非气宗大师的普通工程师而言，野球拳的套路还是要能比划几下的。在这里跟大家分享一下我常用的Intellij快捷键和代码模版，希望对大家码砖的效率提高有所帮助。最终希望大家都成长为大师，以思维的速度来码砖，编写程序。

# 常用的Intellij Idea快捷键（Mac版）

- Alt + Enter - 快速纠错，纠错建议
- Ctrl + Shift + Space - 代码智能补全
- Shift + Shift - 全局搜索
- Ctrl + Ctrl - 全局运行
- Cmd + 1 - 打开项目视图
- Cmd + E - 打开最近工作的文件列表
- Cmd + [ - 回到上一次编辑位置
- Cmd + N - 呼出生成模版代码菜单（constructor，hash，toString，override method等等）
- Ctrl + T - 呼出代码重构菜单
- Cmd + B - 打开方法定义，Cmd + Shift + B - 打开方法实现
- Alt + F7 - 寻找所有对方法或者变量使用
- Cmd + P - 变量信息
- Alt + Cmd + V - 抽取变量
- Cmd + Shift + V - 代码copy/paste历史
- Cmd + Shift + T - 创建或者导航到相应的单元测试类
- Alt + Cmd + L - 格式化所选代码，Alt + Cmd + Shift + L - 格式化整个类
- Cmd + Shift +  Up/Down - 选中代码上下移动  
- Cmd + Shift + A - 寻找快捷设置
- Cmd + / - 逐行注释， Cmd + Shift + / - 块注释
- F2 - 下一个错误
- Cmd + ，- 呼出全局设置菜单
- Cmd + ； - 呼出项目设置菜单 

# 常用的Intellij Idea代码模版（Mac版）

- main, psvm - 快速生成main函数
- sout, soutv, soutp - 快速生成各种System.out
- psfi - 各种函数或者变量声明的模版
- fori, foreach - for循环模版
- ifn - if模版
- Iter - 迭代器模版
- Alt + Cmd + J - 选择应用某个模版在对应的代码上
- 我自己创建的slf4j Logger模版



以我的经验，数量运用一些常用的快捷键和代码模版对编码效率会有极大提高。不过编码只是工作的一部分，还有不少时间花在找问题查错上面，这里IDE也提供了不少的功能来协助解决问题，以后再和大家一起分享。

天下武功，唯快不破，愿大家能够以思考的速度编程。



参考但不限于
- [Intellij Idea](https://baike.baidu.com/item/IntelliJ%20IDEA)
- [Code Completion](https://blog.jetbrains.com/idea/2020/05/code-completion/)
- [Top 15 shortcuts](https://www.youtube.com/watch?v=QYO5_riePOQ&feature=youtu.be)
- [Live Template](https://www.youtube.com/watch?v=ffBeoE6NBSs)
- [Java Features](https://www.youtube.com/watch?v=oNiOUiAS70w)

