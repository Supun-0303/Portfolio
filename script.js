const loader = document.getElementById("loader");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const themeToggle = document.getElementById("theme-toggle");
const scrollTopBtn = document.getElementById("scroll-top");

const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

const typingTextElement = document.getElementById("typing-text");
const typingWords = ["Full-Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Software Engineer"];

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 700);
});

// Mobile navigation toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
});

// Close mobile nav on click
navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Active section link highlight
const sections = document.querySelectorAll("main section");
window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.remove("active");
    if (anchor.getAttribute("href") === `#${current}`) {
      anchor.classList.add("active");
    }
  });

  // Scroll to top visibility
  if (window.scrollY > 450) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme toggle with persistence
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeIcon(storedTheme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeToggle.innerHTML = theme === "dark"
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

// Typing animation
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = typingWords[wordIndex];

  if (!deleting) {
    typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  const speed = deleting ? 45 : 90;
  setTimeout(typeEffect, speed);
}

typeEffect();

// Reveal on scroll animation
const revealElements = document.querySelectorAll(".section-title, .about-card, .timeline-card, .service-card, .project-card, .contact-form, .contact-info");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

// Contact form simulation
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

// Chatbot toggle
function toggleChatbot(open) {
  chatbotBox.classList.toggle("open", open);
  chatbotBox.setAttribute("aria-hidden", String(!open));
}

chatbotToggle.addEventListener("click", () => {
  const isOpen = chatbotBox.classList.contains("open");
  toggleChatbot(!isOpen);
});

chatbotClose.addEventListener("click", () => toggleChatbot(false));

// Chatbot message logic
const chatbotReplies = [
  {
    pattern: /(who are you|about you|yourself)/i,
    response: "I am Supun Viduranga's portfolio assistant. I can tell you about his profile, skills, and projects.",
  },
  {
    pattern: /(skills|what skills|technical skills|soft skills)/i,
    response: "Supun is skilled in HTML, CSS, JavaScript, React, Python, communication, teamwork, leadership, and problem solving.",
  },
  {
    pattern: /(projects|what projects|work done|portfolio)/i,
    response: "He has completed projects like a Smart Home Management System, Hotel Web Site, and Portfolio CMS using modern web technologies.",
  },
  {
    pattern: /(hello|hi|hey)/i,
    response: "Hello! Ask me: Who are you? What skills do you have? What projects have you done?",
  },
];

chatbotForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userText = chatbotInput.value.trim();
  if (!userText) {
    return;
  }

  appendMessage(userText, "user-message");
  chatbotInput.value = "";

  const reply = getBotReply(userText);
  setTimeout(() => {
    appendMessage(reply, "bot-message");
  }, 450);
});

function getBotReply(userText) {
  const foundReply = chatbotReplies.find((item) => item.pattern.test(userText));
  return foundReply
    ? foundReply.response
    : "I can help with questions about who Supun is, his skills, and his projects.";
}

function appendMessage(text, className) {
  const message = document.createElement("div");
  message.className = className;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
