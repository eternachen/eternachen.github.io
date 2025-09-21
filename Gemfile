source 'https://rubygems.org'

# Use the GitHub Pages gem for compatibility with GitHub Pages
require 'json'
require 'open-uri'
versions = JSON.parse(::URI.open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
gem 'rake'

# Use Minimal Mistakes theme (widely used Jekyll theme)
gem "minimal-mistakes-jekyll", "~> 4.24"

# Syntax highlighter
gem 'pygments.rb'
