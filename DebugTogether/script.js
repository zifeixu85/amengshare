// Import or declare the mermaid variable before using it
const mermaid = window.mermaid

document.addEventListener("DOMContentLoaded", () => {
  // Mermaid 初始化
  mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    fontFamily: "Inter, sans-serif",
    securityLevel: "loose",
    themeVariables: {
      primaryColor: "#3b82f6",
      primaryTextColor: "#ffffff",
      primaryBorderColor: "#2563eb",
      lineColor: "#64748b",
      textColor: "#e2e8f0",
      mainBkg: "transparent",
      nodeBorder: "#475569",
      clusterBkg: "#1e293b",
      clusterBorder: "#334155",
    },
  })

  // 设置当前年份
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // 移动端菜单切换
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("translate-x-full")
  })

  // 移动端菜单链接点击关闭菜单
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full")
    })
  })

  // 滚动进度条
  const progressFill = document.querySelector(".progress-fill")

  function updateProgress() {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressFill.style.width = scrollPercent + "%"
  }

  window.addEventListener("scroll", updateProgress)

  // 滚动到顶部按钮
  const scrollToTopBtn = document.getElementById("scrollToTop")

  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("show")
    } else {
      scrollToTopBtn.classList.remove("show")
    }
  }

  window.addEventListener("scroll", toggleScrollButton)

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // 滚动动画观察器
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  }, observerOptions)

  // 为所有需要动画的元素添加观察
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("scroll-reveal")
    observer.observe(section)
  })

  // 层级项目悬停效果
  document.querySelectorAll(".layer-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px) scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0) scale(1)"
    })
  })

  // 工具卡片悬停效果
  document.querySelectorAll(".tool-card, .principle-card, .principle-detailed").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // 步骤项目动画
  document.querySelectorAll(".step-item").forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`
    item.classList.add("scroll-reveal")
    observer.observe(item)
  })

  // 代码块复制功能
  document.querySelectorAll(".code-text").forEach((codeBlock) => {
    codeBlock.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(this.textContent)

        // 显示复制成功提示
        const originalText = this.textContent
        this.textContent = "已复制到剪贴板!"
        this.style.color = "#10b981"

        setTimeout(() => {
          this.textContent = originalText
          this.style.color = ""
        }, 2000)
      } catch (err) {
        console.error("复制失败:", err)
      }
    })
  })

  // 键盘快捷键
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + Home: 回到顶部
    if ((e.ctrlKey || e.metaKey) && e.key === "Home") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Ctrl/Cmd + End: 滚动到底部
    if ((e.ctrlKey || e.metaKey) && e.key === "End") {
      e.preventDefault()
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }

    // ESC: 关闭移动端菜单
    if (e.key === "Escape") {
      mobileMenu.classList.add("translate-x-full")
    }
  })

  // 性能优化：节流滚动事件
  let ticking = false

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress()
        toggleScrollButton()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll)

  // 预加载关键资源
  const preloadLinks = ["https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"]

  preloadLinks.forEach((href) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "style"
    link.href = href
    document.head.appendChild(link)
  })

  // 添加加载完成类
  document.body.classList.add("loaded")

  console.log("🚀 页面加载完成，所有交互功能已激活")
})

// 页面可见性 API - 优化性能
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // 页面不可见时暂停动画
    document.body.style.animationPlayState = "paused"
  } else {
    // 页面可见时恢复动画
    document.body.style.animationPlayState = "running"
  }
})
