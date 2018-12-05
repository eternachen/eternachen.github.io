---
layout: post
title: MySQL数据库操作基本使用简介
category: 数据库
tags: mysql 数据库
---

MySQL 是一个非常流行的小型关系型数据库管理系统。在数据库的管理上，我们一般会借助一些工具，如 phpMyAdmin。它是一个用 PHP 开发的基于 Web 方式架构在网站主机上的 MySQL 管理工具，支持中文，管理数据库非常方便。但有时候我们可能会无可避免的要用到命令行下的操作，这里会介绍一些 MySQL 的基本使用方法，主要是一些基本的命令行操作。

在 Ubuntu 系统中，安装完 MySQL 时会提示你设置用户名和密码，如何没有设置，可以采用如下方式**创建密码**：

> mysqladmin -u root password "new_password";

有了数据库服务器的用户名和密码之后，就可以通过命令**登录到服务器**：

> mysql -u root -p <password>

需要**启动或者重启** MySQL 服务器时，可以采用如下命令：

> sudo service mysql start

> sudo service mysql restart

检查**MySQL服务器是否启动**：

> ps -ef | grep mysqld

如果成功通过命令登录数据库，则可以采用如下命令**列出 MySQL 数据库管理系统的所有数据库列表:**

> show databases;

要对服务器中的某一数据库进行操作，则应先用 `use` 命令**选择要操作的数据库：**

> use 数据库名;

使用该命令后所有Mysql命令都只针对该数据库。如果要对其他数据库进行操作，则应使用`use`命令切换到相应数据库。

选择要操作的数据库之后，可以采用如下命令**列出所选数据库的所有表:**

> show tables;

**注：** 使用该命令前需要使用 use 命令来选择要操作的数据库。

如果要查看数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息，可以使用如下命令：

> show columns from 数据表;

或者使用如下命令查看更加详细的表属性信息(包括字段权限，表注释等)：

> show full columns from 数据表;

要**查看数据表的详细索引信息**，包括 PRIMARY KEY（主键），可以采用如下命令：

> show index from 数据表;

用如下命令可以**输出 Mysql 数据库管理系统的性能及统计信息：**

> show table status like '数据表'\G;

**创建数据库:**

> create databases 数据库名;

**删除数据库:**

> drop database 数据库名;

**查看表结构:**

> desc 表名;
>
> show columns from 表名;
>
> describe 表名;

**清空表:**

> delete from 表名;
>
> truncate table 表名;

**删除表:**

> drop table 表名;

**表字段的增删改:**

修改字段属性：

> alter table 表名 modify 字段名称 字段类型 [是否允许非空] comment '字段注释';

改变字段名称：

> alter table 表名 change 字段原名称 字段新名称 字段类型 [是否允许非空] comment '字段注释';

添加字段：

> alter table 表名 add 字段名称 字段类型 [是否允许非空] comment '字段注释';

删除字段：

> alter table 表名 drop column 字段名称;

其他对数据库的相应操作使用 SQL 语句即可。

**一个实用的 shell 脚本：**

```shell
#! /bin/bash

# Filename: _mysql.sh 2015-09-21
# Author: Huoty <sudohuoty@gmail.com>
# Script starts from here:

__mysql() {
    mysql -h localhost -u root --database test --password=123456
}

if [ "$*" != '' ] ; then
    echo "$*" | __mysql
else
    __mysql
fi
```

用该命令可以直接在命令行执行 mysql 命令和 sql 语句，而不用进入 mysql 的交互式解释器。例如：

> _mysql.sh "show tables"
>
> _mysql.sh "select * from users"
