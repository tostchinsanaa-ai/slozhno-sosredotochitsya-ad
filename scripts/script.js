// Переключение тем
function setTheme(theme) {
  const root = document.documentElement;
  root.classList.remove('theme_light', 'theme_dark');
  if (theme === 'light') {
    root.classList.add('theme_light');
  } else if (theme === 'dark') {
    root.classList.add('theme_dark');
  }
  localStorage.setItem('theme', theme);
  // Обновляем активную кнопку
  document.querySelectorAll('.header__theme-menu-button').forEach(btn => {
    btn.classList.remove('header__theme-menu-button_active');
    btn.disabled = false;
  });
  let activeBtn;
  if (theme === 'light') activeBtn = document.querySelector('.header__theme-menu-button_type_light');
  else if (theme === 'dark') activeBtn = document.querySelector('.header__theme-menu-button_type_dark');
  else activeBtn = document.querySelector('.header__theme-menu-button_type_auto');
  if (activeBtn) {
    activeBtn.classList.add('header__theme-menu-button_active');
    activeBtn.disabled = true;
  }
}

// Восстановление сохранённой темы
const saved = localStorage.getItem('theme');
if (saved === 'light') setTheme('light');
else if (saved === 'dark') setTheme('dark');
else {
  // auto: слушаем систему
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
  localStorage.setItem('theme', 'auto');
}

// Назначаем обработчики кнопкам
document.querySelectorAll('.header__theme-menu-button').forEach(btn => {
  btn.addEventListener('click', () => {
    let theme = 'auto';
    if (btn.classList.contains('header__theme-menu-button_type_light')) theme = 'light';
    else if (btn.classList.contains('header__theme-menu-button_type_dark')) theme = 'dark';
    setTheme(theme);
    localStorage.setItem('theme', theme);
  });
});

// Следим за системными изменениями, если выбрано auto
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (localStorage.getItem('theme') === 'auto') {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
