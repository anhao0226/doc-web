# #
# npm run build
# #
# cd dist
# #
# scp -r * root@123.57.239.39:/var/www/html

curr_dir=$(pwd)
tar_dir="$curr_dir/src/$1"
mkdir -p $tar_dir
touch "$tar_dir/$1.ts" "$tar_dir/$1.css" "$tar_dir/$1.vue"

