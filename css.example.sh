#!/bin/sh
# 從 UI設計同仁的 Design Project 更新 css 至指定品牌的專案

# 配置到當前路徑，組員在這邊需更改為自己專案的路徑，絕對或相對皆可
DESIGN_PROJECT=../Design
PROJECT=.


# Update
designPath="${DESIGN_PROJECT}/onetwobet/12-Reward/public/css"
projectPath="${PROJECT}/apps/onetwobet/styles"

echo $designPath "->" $projectPath
cp -R ${designPath} ${projectPath}

designFontsPath="${DESIGN_PROJECT}/onetwobet/12-Reward/public/fonts"

echo $designFontsPath "->" $projectPath
cp -R ${designFontsPath} ${projectPath}

# 僅複製 CSS 內用到的相對路徑圖片 (img/style-img/*)
designStyleImgPath="${DESIGN_PROJECT}/onetwobet/12-Reward/public/img/style-img"
projectImgPath="${PROJECT}/apps/onetwobet/styles/img"
if [ -d "$designStyleImgPath" ]; then
  # 清空 img 目錄確保不會有舊圖片殘留
  rm -rf ${projectImgPath}/* 
  echo $designStyleImgPath "->" $projectImgPath
  cp -R ${designStyleImgPath} ${projectImgPath}
fi

# --
