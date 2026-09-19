---
layout: default
title: 博客分类
permalink: /categories/
---

<div class="page-content">
    <div class="container">
        <div class="page-header">
            <h1>{{ page.title }}</h1>
            <p class="page-header__lede">共 {{ site.categories | size }} 个分类，{{ site.posts | size }} 篇文章</p>
        </div>

        <div class="term-cloud">
            {%- for category in site.categories %}
            <a href="#{{ category[0] }}">{{ category[0] }}<span class="term-count">{{ category[1] | size }}</span></a>
            {%- endfor %}
        </div>

        {%- for category in site.categories %}
        <section class="term-group">
            <h2 id="{{ category[0] }}">{{ category[0] }}</h2>
            <ul class="term-list">
                {%- for post in category[1] %}
                <li>
                    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
                    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </li>
                {%- endfor %}
            </ul>
        </section>
        {%- endfor %}
    </div>
</div>
