const AUTH_STORAGE_KEY = "riff-authenticated";

// sessionStorage keeps the gate open across reloads in the same tab, and
// closes it when the tab does. It throws in some privacy contexts, so every
// access is guarded.
export const isAuthenticated = () => {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
  } catch (error) {
    return false;
  }
};

export const setAuthenticated = (value) => {
  try {
    if (value) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    // Non-fatal: the gate simply won't survive a reload.
  }
};
