# 七荷相亲卡片导出指南

这个目录包含了七荷相亲卡片的HTML页面和导出工具。

## 文件说明

- `qihe.html` - 相亲卡片的HTML页面
- `images/` - 存放卡片中使用的图片
- `screenshot.js` - Node.js截图脚本
- `exportImage.sh` - 自动导出脚本(Unix/Mac)

## 如何导出高清图片

### 方法一：使用自动脚本（推荐）

1. 确保已安装Node.js（https://nodejs.org/）
2. 打开终端，进入当前目录
3. 运行 `./exportImage.sh`
4. 脚本会自动安装依赖并生成高质量图片

### 方法二：手动运行

1. 安装Node.js和npm
2. 安装依赖: `npm install puppeteer`
3. 运行脚本: `node screenshot.js`

### 方法三：浏览器打印功能

如果上述方法不起作用，可以：

1. 在浏览器中打开`qihe.html`
2. 点击页面底部的"3倍高清导出图片"按钮
3. 在弹出的打印对话框中，选择"保存为PDF"
4. 确保设置为"无边距"和"100%比例"

## 技术说明

自动截图使用Puppeteer库，它会启动无头Chrome浏览器，以3倍分辨率渲染页面并截图。这确保了图片的高质量和准确还原。

## 问题排查

如果遇到问题：

1. 确保已安装Chrome浏览器
2. 检查Node.js和npm是否正确安装
3. 尝试手动安装Puppeteer: `npm install puppeteer`

## 联系方式

如有问题，请联系A梦 