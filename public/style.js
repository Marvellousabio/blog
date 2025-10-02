document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav ul li a');
  let currentPath = window.location.pathname;
  console.log(currentPath) 

  links.forEach(link => {
    let linkPath = link.getAttribute('href');
    console.log(linkPath)
    if (linkPath ===currentPath){link.classList.add("active");}

  });
});

const toggleBtn = document.getElementById('mode-toggle');
  const icon = toggleBtn.querySelector('i');

  // Load saved theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');

    if (isDark) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });
    
