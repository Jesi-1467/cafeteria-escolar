const login = async () => {
    try {
        const response = await API.get("usuarios/");
        const usuarios = response.data;

        console.log("Usuarios:", usuarios);

        const user = usuarios.find(
            u => u.email === email && u.password === password
        );

        console.log("Usuario encontrado:", user);

        if (!user) {
            alert("Credenciales incorrectas");
            return;
        }

        localStorage.setItem("usuario", JSON.stringify(user));

        if (user.id_rol === 1) {
            navigate("/admin");
        } else {
            navigate("/cliente");
        }

    } catch (error) {
        console.error(error);
    }
};