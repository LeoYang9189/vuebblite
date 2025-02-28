// 等待DOM加载完成
document.addEventListener("DOMContentLoaded", function () {
  // 导航菜单高亮
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach(link => {
    if (link.href === currentLocation) {
      link.classList.add("active");
    }
  });

  // 英雄区域轮播图
  const slides = document.querySelectorAll(".hero-slider .slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  let currentSlide = 0;
  let slideInterval;

  // 显示当前轮播图
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
  }

  // 下一张轮播图
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // 前一张轮播图
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // 点击指示器切换轮播图
  dots.forEach(dot => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(dot.getAttribute("data-slide"));
      showSlide(slideIndex);

      // 重置自动轮播计时器
      clearInterval(slideInterval);
      startSlideInterval();
    });
  });

  // 启动自动轮播
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // 初始化自动轮播
  startSlideInterval();

  // 搜索表单切换
  const tabBtns = document.querySelectorAll(".tab-btn");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      // 移除所有按钮的active类
      tabBtns.forEach(btn => btn.classList.remove("active"));
      // 为当前点击的按钮添加active类
      this.classList.add("active");
    });
  });

  // 客户反馈轮播
  const testimonials = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;

  // 显示当前反馈
  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove("active"));
    testimonials[index].classList.add("active");
  }

  // 下一个反馈
  function nextTestimonial() {
    currentIndex++;
    if (currentIndex >= testimonials.length) {
      currentIndex = 0;
    }
    showTestimonial(currentIndex);
  }

  // 上一个反馈
  function prevTestimonial() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = testimonials.length - 1;
    }
    showTestimonial(currentIndex);
  }

  // 添加按钮点击事件
  if (prevBtn && nextBtn) {
    nextBtn.addEventListener("click", nextTestimonial);
    prevBtn.addEventListener("click", prevTestimonial);
  }

  // 自动轮播
  setInterval(nextTestimonial, 5000);

  // 窗口滚动效果
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");

    // 添加固定导航栏样式
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // 滚动动画效果
    const animatedElements = document.querySelectorAll(
      ".feature-card, .memory-card, .traveler-card"
    );

    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add("animated");
      }
    });
  });
});
