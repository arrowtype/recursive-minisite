# recursive

## Installation

https://idratherbewriting.com/jekylldoctheme-separate-outputs/mydoc/mydoc_install_dependencies.html

## Manually running Purge CSS to override unused bootstrap classes:

1. In the command line, run this line: `purgecss -c purgecss.config.js -o css/purge-result`
2. In `_includes/head.html`, look for where it says "Switch these two lines after a purge:". Comment in the Purge result stylesheet and comment out the standard stylesheet. 
## Build

```
bundle exec jekyll serve
```
