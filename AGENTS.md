# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Jekyll, hosted on GitHub Pages at `jiulidaji.cn`. The site uses the Minimal Mistakes Jekyll theme and contains technical blog posts about Linux, programming, and software development.

## Development Commands

### Local Development Setup
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Alternative using Rake task
rake preview
```

### Build and Check Commands
```bash
# Build the site
bundle exec jekyll build

# Check for Jekyll issues
rake check
# or
bundle exec jekyll doctor
```

## Architecture

- **Jekyll Structure**: Standard Jekyll static site generator with posts in `_posts/` directory
- **Theme**: Uses Minimal Mistakes Jekyll theme (`minimal-mistakes-jekyll` gem)
- **Configuration**: Main config in `_config.yml`, development config in `_config-dev.yml`
- **Content**: Blog posts are Markdown files with YAML front matter in `_posts/`
- **Layouts**: Custom layouts in `_layouts/` directory
- **Includes**: Reusable components in `_includes/` directory

## Key Files

- `_config.yml` - Main site configuration (production settings)
- `_config-dev.yml` - Development configuration (localhost settings)
- `Gemfile` - Ruby dependencies including Jekyll and theme
- `Rakefile` - Task automation for preview and checks
- `CNAME` - Custom domain configuration for GitHub Pages

## Content Management

- Blog posts follow Jekyll naming convention: `YYYY-MM-DD-title.md`
- Posts use Markdown with YAML front matter for metadata
- Site supports both Chinese and English content
- Posts cover technical topics like Linux, Docker, Git, and programming

## Deployment

- Automatically deployed via GitHub Pages
- Custom domain: `jiulidaji.cn`
- Uses GitHub Pages gem for compatibility
- No manual deployment needed - pushes to master trigger builds