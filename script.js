const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll("span")
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(10px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translateY(-10px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll("a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      const spans = menuToggle.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    })
  })
}

// Navbar scroll effect
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll <= 0) {
    navbar.classList.remove("scrolled")
  } else {
    navbar.classList.add("scrolled")
  }

  lastScroll = currentScroll
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href === "#") return

    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const navbarHeight = navbar ? navbar.offsetHeight : 0
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe elements for animation
const animateElements = document.querySelectorAll(".highlight-card, .featured-card, .beach-item, .island-card")
animateElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Parallax effect for hero section
const hero = document.querySelector(".hero")
if (hero) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroImage = hero.querySelector(".hero-image")
    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })
}

const createLightbox = (imageSrc, imageAlt) => {
  const lightbox = document.createElement("div")
  lightbox.className = "lightbox"
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="${imageAlt}">
        </div>
    `

  lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
        cursor: pointer;
    `

  const content = lightbox.querySelector(".lightbox-content")
  content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        cursor: default;
    `

  const closeBtn = lightbox.querySelector(".lightbox-close")
  closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        font-weight: 300;
        cursor: pointer;
        transition: opacity 0.3s;
        user-select: none;
    `

  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.opacity = "0.7"
  })

  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.opacity = "1"
  })

  const lightboxImg = lightbox.querySelector("img")
  lightboxImg.style.cssText = `
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `

  document.body.appendChild(lightbox)
  document.body.style.overflow = "hidden"

  const closeLightbox = () => {
    lightbox.style.animation = "fadeOut 0.3s ease"
    setTimeout(() => {
      if (document.body.contains(lightbox)) {
        document.body.removeChild(lightbox)
      }
      document.body.style.overflow = ""
    }, 300)
  }

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    closeLightbox()
  })

  lightbox.addEventListener("click", closeLightbox)

  content.addEventListener("click", (e) => {
    e.stopPropagation()
  })

  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      closeLightbox()
      document.removeEventListener("keydown", escHandler)
    }
  })
}

// Add click handlers for beach images
const beachImages = document.querySelectorAll(".beach-image, .island-image img, .featured-image img")
beachImages.forEach((img) => {
  img.style.cursor = "pointer"
  img.addEventListener("click", () => {
    createLightbox(img.src, img.alt)
  })
})

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`
document.head.appendChild(style)

// Console log for debugging
console.log("[v0] Chumphon Tourism Website Loaded Successfully")


