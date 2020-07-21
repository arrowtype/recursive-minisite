# !/bin/bash

input=$1

width=1080

# https://stackoverflow.com/a/965069
file=$(basename -- $input)
name="${file%.*}"
ext="${file##*.}"
output=$name@$width.$ext

saveTo=$(dirname $input)/resized

# get dir path
mkdir -p $saveTo

outputPath=$saveTo/$output

# method from https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/
convert $input -resize 1080 -quality 70 $saveTo/$output

echo Image converted to $outputPath

