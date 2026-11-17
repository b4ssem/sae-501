import { THEME_COLORS, DEFAULT_THEME_COLOR } from "#utils-shared";

const STORAGE_KEY = "admin-theme-color";
const SHADES = Object.keys(THEME_COLORS[DEFAULT_THEME_COLOR]);

const applyThemeColor = (colorName) => {
    const palette = THEME_COLORS[colorName];
    if (!palette) {
        return;
    }

    SHADES.forEach((shade) => {
        document.documentElement.style.setProperty(`--color-blue-${shade}`, palette[shade]);
    });

    // Matches the gradient at the top of every admin page, so the browser's
    // own chrome (mobile address bar, PWA title bar...) follows the theme.
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.content = palette[200];
    }
};

const getStoredThemeColor = () => localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME_COLOR;

applyThemeColor(getStoredThemeColor());

const picker = document.querySelector("[data-theme-color-picker]");

if (picker) {
    const activeColor = getStoredThemeColor();

    Object.keys(THEME_COLORS).forEach((colorName) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.themeColor = colorName;
        button.setAttribute("aria-label", `Thème ${colorName}`);
        button.setAttribute("aria-pressed", String(colorName === activeColor));
        button.className = "w-6 h-6 rounded-full border-2 hocus:scale-110 transition-transform";
        button.style.backgroundColor = THEME_COLORS[colorName][500];
        button.classList.toggle("border-slate-900", colorName === activeColor);
        button.classList.toggle("border-white", colorName !== activeColor);

        button.addEventListener("click", () => {
            localStorage.setItem(STORAGE_KEY, colorName);
            applyThemeColor(colorName);

            picker.querySelectorAll("[data-theme-color]").forEach((otherButton) => {
                const isActive = otherButton === button;
                otherButton.setAttribute("aria-pressed", String(isActive));
                otherButton.classList.toggle("border-slate-900", isActive);
                otherButton.classList.toggle("border-white", !isActive);
            });
        });

        picker.append(button);
    });
}
