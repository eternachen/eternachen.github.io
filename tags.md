---
layout: default
title: 博客标签
permalink: /tags/
---

<div class="page-content">
    <div class="container">
        <div class="page-header">
            <h1>{{ page.title }}</h1>
            <p class="page-header__lede">共 {{ site.tags | size }} 个标签，{{ site.posts | size }} 篇文章</p>
        </div>

        <div class="term-cloud">
            {%- for tag in site.tags %}
            <a href="#{{ tag[0] }}">{{ tag[0] }}<span class="term-count">{{ tag[1] | size }}</span></a>
            {%- endfor %}
        </div>

        {%- for tag in site.tags %}
        <section class="term-group">
            <h2 id="{{ tag[0] }}">{{ tag[0] }}</h2>
            <ul class="term-list">
                {%- for post in tag[1] %}
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
