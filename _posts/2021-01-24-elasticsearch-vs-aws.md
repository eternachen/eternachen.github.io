---
layout: post
title: "列王的纷争 - ElasticSearch开源社区的分裂"
keywords: opensource elasticsearch aws opendistro 
description: "本文对最近AWS和ElasticSearch之间对于开源的争论进行分析，试图找出开源社区分裂的原因"
category: 计算机科学
tags: opensource elasticsearch aws opendistro
---





从2020年底开始，开源社区就不安宁。

首先是去年年底，[RedHat宣布终结Centos Linux，全面转向Centos Stream](https://blog.centos.org/2020/12/future-is-centos-stream/)。

紧接着在今年1月15日，[ElasticSearch宣布把旗下ElasticSearch和Kibana的license从Apache 2.0修改为SSPL和Elastic License的双许可](https://www.elastic.co/blog/licensing-change)， 一场开源社区的大戏自此拉开帷幕。

5天之后，在1月20日，[ElasticSearch再次在官方博客上将许可修改的原因指向了AWS](https://www.elastic.co/blog/why-license-change-AWS)。

第二天（1月21日），AWS就发出了自己的声明，宣布了应对措施，[将OpenDistro开源进行到底](https://aws.amazon.com/blogs/opensource/stepping-up-for-a-truly-open-source-elasticsearch/)。



# 战火乍起

作为旁观者，第一个问题就是ElasticSearch为什么要修改许可权。这在ElasticSearch的第一篇博客中有详细说明。

一句话的总结就是，云厂商使用了开源软件来构建了自己的服务，但是没有按照开源的原则回馈社区，违反了开源软件开放、透明、协作、共享的原则，也就是说认为云厂商搭了开源软件的便车。

做为反制措施，ElasticSearch会将License改为SSPL和ElasticSearch的双许可。



# 杀手锏

ElasticSearch祭起的秘密武器武器是SSPL。



## 那什么是SSPL呢

> 以下来源于[SSPL协议详细介绍](http://www.mybatis.cn/archives/1227.html)

> SSPL是MongoDB创建的一个源码可用的许可证，以体现开源的原则，同时提供保护，防止公有云提供商将开源产品作为服务提供而不回馈。SSPL允许自由和不受限制的使用和修改，但如果你把产品作为服务提供给别人，你也必须在SSPL下公开发布任何修改以及管理层的源代码。



## SSPL协议的详细内容

>  SSPL协议的全称是：Server Side Public License，翻译为：服务器端公共授权，其详细条款请见下面的链接：

>  https://www.mongodb.com/licensing/server-side-public-license

> SSPL协议并不影响当前使用社区服务器的常规用户。但是，对于云厂商来说，想要将MongoDB作为公共服务运行的公司必须将他们的软件开源，或需要从MongoDB公司获得商业许可。

> 根据SSPL协议，MongoDB公司会明确要求托管MongoDB实例的云计算公司要么从MongoDB公司获取商业许可证，要么向社区开源其服务代码。从而导致了，MongoDB从Linux系统各个平台中抽离出来了。



# 开源社区的声明

> 开源社区的阵地opensource.org在1月19日发表了一篇官方博客，题目就叫[The SSPL is Not an Open Source License](https://opensource.org/node/1099)。

正式的宣告了在开源社区眼中，SSPL不是开源许可，而是异端。言语中也透露出对ElasticSearch的做法的不认可。

在文章的结尾处，博文提到了三点：

- ElasticSearch有权利修改版权声明
- ElasticSearch修改许可权不代表开源软件的失败。开源仍然是社区协作创建伟大软件的最好方式之一。
- 一个公司不能改了一个不被开源社区认可的许可，还继续声称自己是开源软件。这是一种欺骗。

最后一句非常直白，意思就是不能既要当婊子，又要立牌坊。



# 第二波攻击 - 敌人是谁

也许是由于开源社区的压力，在1月20日ElasticSearch官方博客发表了第二篇关于许可权变化的文章。在这篇文章中，ElasticSearch明确了自己针对的对象 - AWS。

文章中列出ElasticSearch认为AWS种种违反开源许可权的行为，并通过6个`Not OK`旗帜鲜明的表明了自己的态度。很奇幻的是，我竟然联想起了努尔哈赤发布的`七大恨诏书`。



# AWS的反击

AWS在沉默了多天之后，终于在1月21日对此事做出了回应， AWS将在OpenDistro的基础上沿着开源的路走下去。这也正式宣告了ElastiSearch社区的分裂，从此ElastcSearch和OpenDistro将沿着不同的方向走下去。



# 旁观者眼中的纷争

笔者认为这并不是开源不开源的问题，而是开源软件商业化利益蛋糕分配问题。ElasticSearch是一家商业公司，提供基于ElasticSearch商业版本以及服务。这在开源社区是很正常的现象，有不少伟大的开源软件背后都有相关的商业公司，从事相关的商业服务活动。

云计算厂商的加入，让开源软件商业化的竞争更加激烈。在某种层面上讲，云计算厂商给开源软件商业公司进行了降维打击。开源软件商业公司能做的事情云计算厂商也能做，开源软件商业公司不能做的事情云计算厂商也能做，而且价格有可能会更低。

希望开源社区，开源软件商业公司，云计算厂商能够找到合理的利益分配模式，形成闭环，一起促进开源软件的发展。

没有永恒的朋友，只有永恒的利益。列王的纷争，这只是个开始。It is just a start......

>The brightest flame casts the darkest shadow. 最明亮的火焰投下最深的阴影。

> —— 乔治·马丁《列王的纷争》



# 版权声明

转载请注明出处

