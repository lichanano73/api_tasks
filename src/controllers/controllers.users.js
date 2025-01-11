const User = require('../models/model.user');
const { usersSchemaValidator } = require('../validators/validators.user');

const bcryptjs = require('bcryptjs');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            mensaje: 'Lista de usuarios obtenida correctamente',
            data: users,
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al obtener los usuarios',
            error: error.message,
        });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { name, username, email, rol, password } = req.body;
        
        if (!name || !username || !email || !rol || !password) {
            return res.status(400).json({
                error: 'Todos los campos son obligatorios: name, username, email, rol, password',
            });
        }

        // Validar esquema
        const validator = usersSchemaValidator.safeParse(req.body);
        if (!validator.success) {
            return res.status(400).json({
                error: 'Ocurrió un error al validar el esquema',
                details: validator.error.errors,
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                error: 'El email o username ya están registrados',
            });
        }

        // Password
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        
        
        const newUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();

        return res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            data: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                rol: newUser.rol,
            },
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al crear el usuario',
            error: error.message,
        });
    }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const validator = usersSchemaValidator.safeParse(req.body);
        if (!validator.success) {
            return res.status(400).json({
                error: 'Ocurrió un error al validar el esquema',
                details: validator.error.errors,
            });
        }
        
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({
                mensaje: 'No se encontró un usuario con el ID proporcionado',
            });
        }

        return res.status(200).json({
            mensaje: 'Usuario actualizado correctamente',
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                mensaje: `No se encontró un usuario ID ${id}`,
            });
        }

        return res.status(200).json({
            mensaje: 'Usuario eliminado correctamente',
            data: deletedUser,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al eliminar el usuario',
            error: error.message,
        });
    }
};
