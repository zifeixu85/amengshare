/**
 * 七荷相亲卡片截图脚本
 * 
 * 使用方法:
 * 1. 安装依赖: npm install puppeteer
 * 2. 运行脚本: node screenshot.js
 * 
 * 这个脚本会打开本地HTML文件，以3倍分辨率截图并保存为七荷相亲卡片.png
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// 通用的延迟函数，适用于所有puppeteer版本
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('正在启动浏览器...');
  
  // 启动浏览器
  const browser = await puppeteer.launch({
    headless: 'new', // 使用新的Headless模式
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    console.log('正在打开页面...');
    const page = await browser.newPage();
    
    // 设置视口大小为高分辨率
    await page.setViewport({
      width: 1200,
      height: 1800,
      deviceScaleFactor: 3 // 3倍分辨率
    });
    
    // 获取HTML文件的绝对路径
    const htmlPath = path.resolve(__dirname, 'qihe.html');
    const fileUrl = `file://${htmlPath}`;
    
    console.log(`正在加载文件: ${fileUrl}`);
    
    // 等待所有网络请求完成和页面完全渲染
    await page.goto(fileUrl, { 
      waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
      timeout: 30000  // 增加超时时间到30秒
    });
    
    // 等待字体和样式完全加载 (使用通用延迟函数)
    console.log('等待页面元素完全渲染...');
    await sleep(2000); // 等待2秒确保字体和样式加载
    
    // 等待页面完全加载
    await page.waitForSelector('.card-container', { visible: true });
    await page.waitForSelector('.header', { visible: true });
    
    // 确保图片加载完成
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const images = Array.from(document.querySelectorAll('img'));
        
        // 如果没有图片，立即解析
        if (images.length === 0) {
          resolve();
          return;
        }
        
        // 计数已加载的图片
        let loadedImages = 0;
        const imageLoaded = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            resolve();
          }
        };
        
        // 检查每张图片
        images.forEach(img => {
          if (img.complete) {
            imageLoaded();
          } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded);
          }
        });
      });
    });
    
    console.log('正在截图...');
    // 为元素添加漂亮的背景和阴影
    await page.evaluate(() => {
      const card = document.querySelector('.card-container');
      
      // 确保header区域样式正确
      const header = document.querySelector('.header');
      if (header) {
        // 确保渐变背景显示正确
        header.style.background = 'linear-gradient(135deg, #FF9370, #FF5C8A)';
        
        // 确保header内容可见
        const headerContent = header.querySelector('.header-content');
        if (headerContent) {
          headerContent.style.zIndex = '10';
        }
        
        // 确保姓名和标签正确显示
        const nameBadge = header.querySelector('.name-badge');
        if (nameBadge) {
          nameBadge.style.zIndex = '10';
        }
      }
      
      // 创建一个包裹元素
      const wrapper = document.createElement('div');
      wrapper.style.padding = '36px';
      wrapper.style.backgroundColor = '#f5f5f5';
      wrapper.style.display = 'inline-block';
      wrapper.style.borderRadius = '20px';
      wrapper.style.position = 'absolute';
      wrapper.style.left = '50%';
      wrapper.style.top = '50%';
      wrapper.style.transform = 'translate(-50%, -50%)';
      wrapper.id = 'screenshot-wrapper';
      
      // 确保卡片有阴影
      card.style.boxShadow = '0 20px 40px rgba(255, 92, 138, 0.3), 0 10px 20px rgba(0, 0, 0, 0.15)';
      
      // 替换原始卡片
      const parent = card.parentNode;
      parent.insertBefore(wrapper, card);
      wrapper.appendChild(card);
      
      // 隐藏其他元素
      const exportButton = document.querySelector('.export-button-container');
      if (exportButton) {
        exportButton.style.display = 'none';
      }
    });
    
    // 再次等待确保样式应用完成 (使用通用延迟函数)
    await sleep(1000);
    
    // 等待DOM更新完成
    await page.waitForSelector('#screenshot-wrapper', { visible: true });
    
    // 截取包裹元素
    const wrapperElement = await page.$('#screenshot-wrapper');
    
    // 保存为PNG（使用高质量设置）
    const outputPath = path.resolve(__dirname, '七荷相亲卡片.png');
    await wrapperElement.screenshot({
      path: outputPath,
      omitBackground: false,
      type: 'png'
    });
    
    console.log(`截图已保存至: ${outputPath}`);
  } catch (error) {
    console.error('截图过程中出错:', error);
  } finally {
    await browser.close();
    console.log('浏览器已关闭');
  }
})(); 