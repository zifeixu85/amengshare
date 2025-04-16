#!/bin/bash

# 七荷相亲卡片导出脚本
# 此脚本会安装必要的Node.js依赖并运行截图脚本

echo "===== 七荷相亲卡片导出工具 ====="
echo "此工具将帮助您生成高清的卡片图片"
echo ""

# 检查Node.js是否已安装
if ! command -v node &> /dev/null; then
    echo "错误: 未找到Node.js"
    echo "请先安装Node.js: https://nodejs.org/zh-cn/download/"
    exit 1
fi

echo "正在安装依赖..."
npm install puppeteer --no-fund --no-audit

# 检查安装是否成功
if [ $? -ne 0 ]; then
    echo "安装依赖失败，请检查网络连接并重试"
    exit 1
fi

echo "正在生成图片..."
node screenshot.js

echo ""
echo "如果成功，图片已保存在当前目录下的'七荷相亲卡片.png'"
echo "如遇问题，请确保您已安装Chrome浏览器" 