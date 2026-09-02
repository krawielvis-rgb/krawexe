const KEY = "atspro.session";
const USERNAME = "admin";
const PASSWORD = "9o9a";

export function login(username: string, password: string): boolean {
  if (username === USERNAME && password === PASSWORD) {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable */
    }
    return true;
  }
  return false;
}

export function logout() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
