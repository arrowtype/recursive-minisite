# Recursive

A minisite for [Recursive Sans & Mono](https://github.com/arrowtype/recursive).

## Local Development

Follow these instructions to set up Jekyll for development:

https://idratherbewriting.com/jekylldoctheme-separate-outputs/mydoc/mydoc_install_dependencies.html

## Manually running Purge CSS to override unused bootstrap classes:

Install PurgeCSS globally with:

```
npm install -g purgecss
```

1. In the command line, run this line: `purgecss -c purgecss.config.js -o css/purge-result`
2. In `_includes/head.html`, look for where it says "Switch these two lines after a purge:". Comment in the Purge result stylesheet and comment out the standard stylesheet.

Note: sometimes, PurgeCSS doesn't "notice" a font path change. Check that each font update has actually made it through to prod CSS.

## Build

```
bundle exec jekyll serve
```
