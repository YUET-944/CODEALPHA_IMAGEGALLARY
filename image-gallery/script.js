class ImageGallery {
  constructor() {
    this.gallery = document.getElementById("gallery")
    this.lightbox = document.getElementById("lightbox")
    this.lightboxImage = document.getElementById("lightboxImage")
    this.lightboxTitle = document.getElementById("lightboxTitle")
    this.lightboxDescription = document.getElementById("lightboxDescription")
    this.lightboxPhotographer = document.getElementById("lightboxPhotographer")
    this.currentImageSpan = document.getElementById("currentImage")
    this.totalImagesSpan = document.getElementById("totalImages")

    this.currentImageIndex = 0
    this.currentFilter = "all"
    this.visibleImages = []

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.updateVisibleImages()
    this.updateImageCounter()
    this.initializeTheme()
  }

  initializeTheme() {
    const themeToggle = document.getElementById("themeToggle")
    const savedTheme = localStorage.getItem("gallery-theme") || "dark"

    this.setTheme(savedTheme)

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "light" ? "dark" : "light"
      this.setTheme(newTheme)
    })
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("gallery-theme", theme)

    const themeIcon = document.querySelector(".theme-icon")
    themeIcon.textContent = theme === "light" ? "🌙" : "☀️"
  }

  setupEventListeners() {
    const filterButtons = document.querySelectorAll(".filter-btn")
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.createRipple(e, btn)
        this.handleFilterClick(e.target)
      })
    })

    const galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.openLightbox(index)
      })
    })

    document.getElementById("closeBtn").addEventListener("click", () => {
      this.closeLightbox()
    })

    document.getElementById("prevBtn").addEventListener("click", () => {
      this.previousImage()
    })

    document.getElementById("nextBtn").addEventListener("click", () => {
      this.nextImage()
    })

    document.addEventListener("keydown", (e) => {
      if (this.lightbox.classList.contains("active")) {
        switch (e.key) {
          case "Escape":
            this.closeLightbox()
            break
          case "ArrowLeft":
            this.previousImage()
            break
          case "ArrowRight":
            this.nextImage()
            break
        }
      }
    })

    this.lightbox.addEventListener("click", (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox()
      }
    })
  }

  createRipple(event, element) {
    const circle = document.createElement("span")
    const diameter = Math.max(element.clientWidth, element.clientHeight)
    const radius = diameter / 2

    const rect = element.getBoundingClientRect()
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - rect.left - radius}px`
    circle.style.top = `${event.clientY - rect.top - radius}px`
    circle.classList.add("ripple")

    const ripple = element.getElementsByClassName("ripple")[0]
    if (ripple) {
      ripple.remove()
    }

    element.appendChild(circle)
  }

  handleFilterClick(button) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    button.classList.add("active")

    const filter = button.getAttribute("data-filter")
    this.currentFilter = filter

    this.filterImagesWithStagger(filter)
  }

  filterImagesWithStagger(filter) {
    const galleryItems = document.querySelectorAll(".gallery-item")

    galleryItems.forEach((item, index) => {
      const category = item.getAttribute("data-category")
      const shouldShow = filter === "all" || category === filter

      if (shouldShow) {
        setTimeout(() => {
          item.classList.remove("hidden")
          item.classList.add("visible")
          item.style.display = "block"
        }, index * 100)
      } else {
        item.classList.add("hidden")
        item.classList.remove("visible")
        setTimeout(() => {
          if (item.classList.contains("hidden")) {
            item.style.display = "none"
          }
        }, 600)
      }
    })

    setTimeout(() => {
      this.updateVisibleImages()
      this.updateImageCounter()
    }, 600)
  }

  updateVisibleImages() {
    const allItems = document.querySelectorAll(".gallery-item")
    this.visibleImages = Array.from(allItems).filter((item) => {
      const category = item.getAttribute("data-category")
      return this.currentFilter === "all" || category === this.currentFilter
    })
  }

  openLightbox(index) {
    const allItems = Array.from(document.querySelectorAll(".gallery-item"))
    const clickedItem = allItems[index]
    this.currentImageIndex = this.visibleImages.indexOf(clickedItem)

    if (this.currentImageIndex === -1) return

    this.showLightboxImage()
    this.lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  closeLightbox() {
    this.lightbox.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  showLightboxImage() {
    if (this.visibleImages.length === 0) return

    const currentItem = this.visibleImages[this.currentImageIndex]
    const img = currentItem.querySelector("img")
    const title = currentItem.querySelector(".overlay h3").textContent
    const description = currentItem.querySelector(".overlay p").textContent
    const photographer = currentItem.querySelector(".photographer").textContent

    this.lightboxImage.src = img.src
    this.lightboxImage.alt = img.alt
    this.lightboxTitle.textContent = title
    this.lightboxDescription.textContent = description
    this.lightboxPhotographer.textContent = photographer

    this.currentImageSpan.textContent = this.currentImageIndex + 1
    this.totalImagesSpan.textContent = this.visibleImages.length

    this.lightboxImage.style.opacity = "0"
    this.lightboxImage.onload = () => {
      this.lightboxImage.style.opacity = "1"
    }
  }

  nextImage() {
    if (this.visibleImages.length === 0) return

    this.currentImageIndex = (this.currentImageIndex + 1) % this.visibleImages.length
    this.showLightboxImage()
  }

  previousImage() {
    if (this.visibleImages.length === 0) return

    this.currentImageIndex = this.currentImageIndex === 0 ? this.visibleImages.length - 1 : this.currentImageIndex - 1
    this.showLightboxImage()
  }

  updateImageCounter() {
    this.totalImagesSpan.textContent = this.visibleImages.length
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ImageGallery()
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running"
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item) => {
    item.style.animationPlayState = "paused"
    observer.observe(item)
  })
})

const style = document.createElement("style")
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)
