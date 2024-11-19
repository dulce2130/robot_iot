const checkAuth = async (req, res, next) => {
    console.log("Encabezados recibidos:", req.headers);
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extraer el token del encabezado
            token = req.headers.authorization.split(" ")[1];
            console.log("Token extraído:", token);

            // Verificar y decodificar el token
            const decoded = jwt.verify(token, "palabraultrasecreta");
            console.log("Token decodificado:", decoded);

            // Buscar el usuario en la base de datos
            req.user = await User.findById(decoded.id).select("-password -token -confirmado");
            console.log("Usuario encontrado:", req.user);

            if (!req.user) {
                console.error("Usuario no encontrado en la base de datos.");
                throw new Error("Usuario no encontrado.");
            }

            // Usuario autenticado, continúa con la siguiente función
            return next();
        } catch (e) {
            console.error("Error en checkAuth:", e.message);
            return res.status(403).json({ mensaje: "Token no válido o usuario no encontrado." });
        }
    }

    if (!token) {
        console.error("Token no proporcionado o formato incorrecto.");
        return res.status(403).json({ mensaje: "Token no válido o inexistente." });
    }

    next();
};

export default checkAuth;
