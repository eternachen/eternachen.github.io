---
layout: post
title: "Amazon Redshift vs Redshift Spectrum vs Amazon Aurora"
keywords: Redshift Aurora RedshiftSpectrum
description: "介绍笔者在工作中用到的Amazon Redshift，Amazon Redshift Spectrum，Amazon Athena与Amazon Aurora及其场景"
category: 计算机科学 
tags: AWS Redshift Aurora RedshiftSpectrum
---

在本文中，我将尝试介绍笔者在工作中用到的Amazon Redshift，Amazon Redshift Spectrum，Amazon Athena与Amazon Aurora之间的关系与区别，以及何时该应用何种技术的具体实际场景。

让我们从数据库概念开始吧。



# 数据库概念
关于数据库时，您经常会听到两个术语：

- “在线交易处理(online transaction processing”)”或简称“OLTP”。 OLTP系统针对大量写入进行了优化，即“输入”数据。 
- “在线分析处理(online analytical processing)”或简称“OLAP”。 OLAP系统针对大量读取进行了优化，即“取出”数据。 OLAP有时候也被称为数据仓库(data warehouse)。



# 实际示例：南方航空
让我们以南方航空公司为例来介绍这两个缩写的含义。

当客户在南航的网站或移动应用上购买机票时，南航会在其生产数据库中写入该购买记录。

这些购票记录将使用OLTP样式数据库来存储记录。

在月底，南航的首席财务官想知道“我们这个月卖了几张票？”。为了获得答案，他们可以查询生产数据库。但是，这些查询会给生产数据库增加更多的负载。这样的查询一般较为复杂，可能会引起数据库运行缓慢，进而会对核心业务 - 机票销售产生负面影响。

一个解决方案是使用分析数据库或数据仓库(data warehouse)，该数据库具有生产数据库中相关记录的副本。

将数据从生产数据库转移到数据仓库的过程称为“ ETL”。

- Extract - 从生产数据库中提取数据

- Transform - 将数据转换为适合分析的结构

- Load - 将数据加载到您的数据仓库中。

  

一旦数据存储在数据仓库中，您就可以做出很多复杂的查询（例如，“我们双十一的那周通过iOS应用在杭州卖了多少张票，其中哪些来自南航白金客户？”），而不会影响生产数据库。

# 数据湖和无服务器查询引擎

随着时间的流逝，南航票务系统数据量越来越多，将所有历史票务销售的副本存储在数据仓库中变得非常昂贵。很多时候，您真正关心的只是最后一个会计月份，季度和年份，对3到5年前的数据访问次数很少。

到那时，您可以将数据从仓库转移到数据湖中，进行冷热数据分离，那里的存储价格大约便宜5倍。

但是偶尔我们也需要历史数据–“ 5年前我们在双11卖出了几张票，与今年双11相比又有什么不同？”

因此，您可能需要将数据从数据湖移回到数据仓库以回答该问题，或者使用查询引擎可以直接在数据湖中查询数据，并且/或者可以将其与仓库中的数据合并（Union All）。

查询引擎本身不存储数据，它只是完成了运行查询的工作。 “无服务器”部分意味着您无需启动服务器即可按需运行引擎。

在这种背景下，我们继续我们的讨论。

# Amazon Redshift vs. Redshift Spectrum vs. Amazon Athena vs Amazon Aurora

以上四个服务都来自于Amazon AWS全家桶，我将Amazon S3放进来一起说。

- Amazon S3是一个扁平的对象存储，近来通常被称为“数据湖”。

- Amazon Aurora是OLTP的数据库。这是专为云计算而构建的与MySQL和PostgreSQL兼容的关系数据库。您将把Aurora用于生产工作负载。

- Amazon Redshift是一个关系式的，OLAP风格数据库。这是专为云计算而建的数据仓库，可用标准SQL中运行非常复杂的分析工作负载。

- Amazon Redshift Spectrum是Amazon Redshift的功能之一。 Spectrum是一个无服务器查询处理引擎，允许将Amazon S3中的数据与Amazon Redshift中的数据连接（join）在一起。

- Amazon Athena是基于开源Presto的无服务器查询处理引擎。 Athena允许编写交互式查询以使用标准SQL分析S3中的数据。

  

  在我们的南航示例中，南航将使用：

- Amazon Aurora存储机票销售记录

- Amazon Redshift存储短期历史数据以分析他们的机票销售记录
- Amazon S3，可以更便宜地存储所有长期历史票数据
- Amazon Redshift Spectrum可将S3中的长期历史数据与Amazon Redshift中的短期历史数据结合起来，例如比较当年票务与10年前票务的多年比较。
- Amazon Athena，用于在S3中快速临时查询数据，例如回答有关门票销售的单年度问题，该问题只需要S3中的数据，例如“我们10年前的双11卖了几张票？”

简而言之，您最终得到一个完整的技术栈，其中Aurora是您的生产数据库，S3数据湖具有您生产数据的长期历史，然后您可以选择三种AWS（Redshift，Redshift Spectrum，Athena ）产品来运行分析生产数据。

接下来的一个问题–您何时使用哪种产品进行分析？

# 放在一起–基于云的分析堆栈
使用哪种产品取决于您的工作负载和查询的成本，复杂性和执行速度。

- Amazon Redshift
  Amazon Redshift擅长在大型数据集上运行复杂的分析查询，联接和聚集，因为它利用了高性能的本地磁盘，专为复杂的查询执行和联接而优化的数据格式。 Redshift功能非常强大，您甚至可以在仓库内运行ETL的“T”部分，而无需运行某些外部处理引擎，例如Spark或Hadoop。实际上，这是从“ETL”到“ELT”的转变。如果执行速度以及查询和转换的速度至关重要，那么使用Amazon Redshift是必经之路。

  但是，这就意味着必须通过数据工程师或DBA将数据加载到仓库中，并根据所需的存储和CPU需求来配置管理Redshift集群。而且，即便是最便宜的价格（具有3年RI的密集存储节点），Redshift的价格还是不菲，大约为1000美元/ TB /年。这是S3的4倍，后者的价格约为250美元/ TB /年。

- Amazon Redshift Spectrum
  借助Redshift Spectrum，Amazon Redshift用户可以利用廉价的S3存储，并提取，过滤，聚合，分组和排序数据。

  由于Spectrum是无服务器的，因此无需进行配置或管理。 Spectrum的价格为每TB数据扫描5美元。与Redshift相比，S3存储更便宜。与仅在Redshift集群中存储数据相比，S3存储具成本优势。您只需为针对实际扫描的数据运行的查询付费。

  需要权衡的是，Redshift Spectrum查询的运行速度确实比Amazon Redshift集群中的查询慢，这主要是由于S3与集群之间的数据移动。但是，如果成本是优先考虑因素，性能要求不那么高的话，那么将S3 / Spectrum组合在一起是一个不错的选择。

  但是，您确实必须注意RedShift Spectrum查询的运行频率以及它们花费了多少费用。如果使用Spectrum扫描数据的成本超过了讲数据存储在Redshift中，那当然还是把将数据移回到Redshift群集更合理。

- Amazon Athena

  雅典娜（Athena）遵循与Spectrum（Spectrum）相同的逻辑，它是无服务器的S3数据查询引擎。它通常仅适用于不需要大规模汇总的简单交互式查询。

  

  这些功能不是“或/或”选项。根据应用场景，我们看到不少客户同时使用以上服务来进行数据分析。

  希望这篇文章对大家有所启发，感谢我的同事们对本篇文章的帮助。