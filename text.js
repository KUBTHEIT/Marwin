const texts = [
  "ยินดีต้อนรับสู่จังหวัด",
  "ชุมพร",
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  const currentText = texts[index];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => isDeleting = true, 1000);
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
  }

  setTimeout(typeEffect, isDeleting ? 30 : 50);
}

typeEffect();



