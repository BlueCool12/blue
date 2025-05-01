

interface ThemeState {
    mode: "light" | "dark";
}

const initialTheme = (localStorage.getItem("theme") === "dark" ? "dark" : "light") as "light" | "dark";

const initialState: ThemeState = {
    mode: initialTheme,
};