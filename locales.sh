#!/bin/sh
# 目前既有品牌
SITE_LIST=(nova88 onetwobet)

# READ
echo "選擇品牌(單選、複選)"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done

read -p ": " site
siteList=($(echo "$site" | tr ' ' '\n'))

node sheet/sheetToJson.js $site

echo ""

echo "是否要對表單進行排序更新?"
echo "(非必要，進行途中若中斷可能會造成該表被清空)"
read -p "(y/N): " isUpdating
if [[ "$isUpdating" == "y" || "$isUpdating" == "Y" ]]; then
  node sheet/sheetSort.js $site
fi