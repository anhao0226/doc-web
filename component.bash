#
vue_temp="<template>\n<div></div>\n</template>\n\n<script lang='ts' >\nimport $1 from './$1'\nexport default $1\n</script>"

ts_temp="import { defineComponent} from 'vue'\n\nexport default defineComponent({\n    setup() {\n        return {\n           \n        }\n    }\n})"

#
curr_dir=$(pwd)
#
tar_dir="$curr_dir/src/views/$1"
#
mkdir -p $tar_dir
#
vue_temp_path="$tar_dir/$1.vue"
#
ts_temp_path="$tar_dir/$1.ts"
#
touch "$tar_dir/$1.ts" "$tar_dir/$1.css" $vue_temp_path
#
echo -e $vue_temp >> $vue_temp_path
#
echo -e $ts_temp >> $ts_temp_path


