# !/bin/bash

inputDir=$1
width=$2

saveTo=$inputDir/resized
mkdir -p $saveTo

images=$(ls $inputDir/*.{jpg,png,gif})

echo $images

for input in $images; do
    # https://stackoverflow.com/a/965069
    file=$(basename -- $input)
    name="${file%.*}"
    ext="${file##*.}"
    output=$saveTo/$name@$width.$ext

    # method from https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/
    convert $input -resize 1080 -quality 70 $output

    echo → $output saved
done

