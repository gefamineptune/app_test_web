async function handleLogin() {
  const username = usernameInput.getValue();
  const password = passwordInput.getValue();

  const user = await login(username, password);

  if (user) {
    console.log("Login berhasil");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("User dari localStorage:", storedUser);
    // Arahkan ke halaman utama
  } else {
    console.log("Login gagal: Username atau password salah.");
  }
}

handleLogin()








