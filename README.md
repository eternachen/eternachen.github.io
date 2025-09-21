九里大集 | Eternachen's Blog
=======================

我的 Github 博客，博客模板引用自 [Kuanghy](http://kuanghy.github.io/) 自适应 Jekyll 主题，并对其做了部分修改。

- Built for jekyll 2.x
- Supports Google analytics and RSS feeds
- Sass based styles
- Browser support: IE 8+, Chrome, Safari and Firefox
- Fluidly responsive

## About jekyll

[Jekyll](http://jekyllrb.com/) is a static site generator, an open-source tool for creating simple yet powerful websites of all shapes and sizes.

## How to install/run

1. Fork this repository.
2. Clone it: git clone https://github.com/YOUR-USERNAME/harmony.
3. If you're completely new to jekyll, please read more about [Jekyll](http://jekyllrb.com/) and [Github pages](https://help.github.com/articles/using-jekyll-with-pages).
4. Change your directory into cloned repository.
5. Run `bundle install`
6. Edit the _config.yml on root directory. Change `url` property to to
`http://127.0.0.1:4000` since you are going to run on localhost.
7. Run the jekyll server by having: `jekyll serve --baseurl ''` or `rake preview`   

Point your browser to [http://localhost:4000](http://localhost:4000).

Note: If you are a windows user please refer to this nice website - http://jekyll-windows.juthilo.com/ by Julian Thilo to configure ruby + jekyll on windows.

## Options/Usage

Harmony has some customizable options. All the configuration details are
configured in `_config.yml` file under root of the harmony directory.

Feel free to change your `name`, `descriptionn`, `meta_description`, `author details`,
`social media names` and `Google analytics id` accordingly.

``` yml
# Harmony theme configuration. Please change accordingly.
harmony:
  name: Harmony
  # Little description about your site
  description: Harmony is free responsive jekyll theme.
  meta_description: Harmony is free responsive jekyll theme. It will appear in your document head meta (for Google search results) and in your feed.xml site description.
  basetheme: theme-base-01 # pre defined the{{ site.url | prepend: site.baseurl }}mes are darken, blue-water, reddish.
  author: # Author details
    name: Gayan Virajith
    email: gayanvirajith@gmail.com
    url: http://gayanvirajith.github.io

  # Google Analytics key, leave blank to ignore
  google_analytics_key: UA-xxxx-x

  # Profile links, leave blank to ignore
  social:
    github: gayanvirajith
    twitter: gayanvirajith
    facebook: gayanvirajith
    gplus: +GayanVirajith
    dribble: gayan
    pinterest:
  # Toggle disclaimer in footer
  show_disclaimer: true
```

### Includes

All the partial includes are under `_includes` directory.

#### Header navigation links

Feel free to add/edit links for your header in the file `header-links.html`.

#### Footer links

Customize your footer links by editing `_includes/footer-links.html`

#### Copyrights/Disclaimer statements

All copyright notes are under `_includes/footer.html`. Also note that you
can toggle on/off copyright notes from the front-end by setting up `show_disclaimer`
property in `_config.yml`.

#### Feedback/Bugs/Suggestions

Please submit as an [issue](https://github.com/web-create/harmony/issues/new),
I am happy to response back.

## Local development (macOS)

These notes are macOS-focused and help when native gems (C/C++) need to be built.

1. Install Homebrew if you don't have it:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install rbenv (or use your preferred Ruby manager):

```bash
brew install rbenv ruby-build
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc
# Install a Ruby version (example: 3.2.9)
rbenv install 3.2.9
rbenv global 3.2.9
```

3. Install required system libs (OpenSSL) and developer tools:

```bash
xcode-select --install
brew install openssl@3 pkg-config
```

4. Install bundler and project gems (work from the repo root):

```bash
gem install bundler
cd /path/to/eternachen.github.io
# Ensure Bundler will install into vendor/bundle for the repo
bundle config set --local path 'vendor/bundle'

# Export SDK and OpenSSL locations so native extensions compile
export SDKROOT=$(xcrun --sdk macosx --show-sdk-path)
export CC=clang CXX=clang++
export CPPFLAGS="-I$(brew --prefix openssl@3)/include -I${SDKROOT}/usr/include"
export LDFLAGS="-L$(brew --prefix openssl@3)/lib"
export PKG_CONFIG_PATH="$(brew --prefix openssl@3)/lib/pkgconfig"

bundle install --jobs=4 --retry=3 --verbose
```

5. Serve the site locally with live reload:

```bash
bundle exec jekyll serve --livereload
```

6. Quick verification commands:

```bash
which ruby
ruby -v
bundle -v
```

Notes
- If you prefer `asdf` or `rvm` instead of `rbenv`, install Ruby via your manager of choice and ensure the same environment variables are exported before `bundle install`.
- If `bundle install` fails building native gems, check the `vendor/bundle/.../extensions/.../gem_make.out` file for errors and make sure `SDKROOT`, `CPPFLAGS`, and `LDFLAGS` are set in the same shell where you run `bundle install`.
