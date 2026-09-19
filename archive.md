---
layout: default
title: 博客归档
permalink: /archive/
---

<div class="page-content">
    <div class="container">
        <div class="page-header">
            <h1>{{ page.title }}</h1>
            <p class="page-header__lede">共 {{ site.posts | size }} 篇文章，按时间倒序排列</p>
        </div>

        {%- for post in site.posts %}
        {%- capture currentyear %}{{ post.date | date: "%Y" }}{% endcapture %}
        {%- if currentyear != year %}
        {%- unless forloop.first %}</ul>{% endunless %}
        <h2 class="archive-year">{{ currentyear }}</h2>
        <ul class="archive-list">
        {%- capture year %}{{ currentyear }}{% endcapture %}
        {%- endif %}
            <li>
                <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </li>
        {%- if forloop.last %}</ul>{% endif %}
        {%- endfor %}
    </div>
</div>
