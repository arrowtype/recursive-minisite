# !/bin/bash

input=$1
output=${input/".mp4"/".webm"}

# method from https://video.stackexchange.com/a/28276
ffmpeg  -i $input  -b:v 0  -crf 30  -pass 1  -an -f webm /dev/null
ffmpeg  -i $input  -b:v 0  -crf 30  -pass 2  $output

echo Video converted to $output