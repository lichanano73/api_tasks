const Task = require("../models/model.task");
const User = require("../models/model.user");
const {
    tasksSchemaValidator, updateTaskSchema,
    assignUsersSchema, addPartHoursSchema
} = require("../validators/validators.task");

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({
            mensaje: "Lista de tareas obtenida correctamente",
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener las tareas",
            error: error.message,
        });
    }
};

exports.addTask = async (req, res) => {
    try {
        const { text, company, done, date, description } = req.body;

        if (!text || !company || !date || !description) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios: text, done y date",
            });
        }

        const user_created = req.user._id;
        const validator = tasksSchemaValidator.safeParse(req.body);

        if (!validator.success) {
            return res.status(400).json({
                error: "Ooooops ha ocurrido un error validando Schema",
            });
        }

        const newTask = new Task({
            text,
            done,
            company,
            date,
            description,
            user_created,
        });
        await newTask.save();

        return res.status(201).json({
            mensaje: "Tarea creada correctamente",
            data: newTask,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al crear la tarea",
            error: error.message,
        });
    }
};

exports.assignUsersToTask = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id_token = req.user._id;

        const validation = assignUsersSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                error: "Error de validación",
                detalles: validation.error.issues,
            });
        }

        const { assigned_users } = validation.data;
        const users = await User.find({ _id: { $in: assigned_users } });
        if (users.length !== assigned_users.length) {
            return res
                .status(404)
                .json({ error: "Uno o más usuarios no existen en el sistema" });
        }

        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

        // Solo usuario creador puede asignar
        const user_token = await User.findById(user_id_token);
        if (task.user_created.toString() !== user_token._id.toString()) {
            return res.status(403).json({
                error: "No tienes permiso para asignar usuarios a esta tarea",
            });
        }

        const updatedAssignedUsers = [
            ...new Set([
                ...task.assigned_users.map((u) => u.toString()),
                ...assigned_users,
            ]),
        ];

        task.assigned_users = updatedAssignedUsers;
        await task.save();

        return res.status(200).json({
            mensaje: "Usuarios asignados a la tarea correctamente",
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al asignar usuarios a la tarea",
            error: error.message,
        });
    }
};

exports.addPartHours = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user._id;

        const validation = addPartHoursSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                error: 'Error de validación',
                detalles: validation.error.issues,
            });
        }

        const { date, description, duration } = validation.data;

        // Buscar la tarea
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

        // Verificar si el usuario está asignado a la tarea
        if (!task.assigned_users.map(String).includes(user.toString())) {
            return res.status(403).json({
                error: 'No tienes permiso para cargar horas en esta tarea',
            });
        }

        task.part_hours.push({ user, date, description, duration });
        await task.save();

        return res.status(200).json({
            mensaje: 'Parte de horas agregado correctamente',
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al agregar parte de horas',
            error: error.message,
        });
    }
};

exports.getTasksByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
            });
        }

        // Buscar tareas asignadas al usuario
        const tasks = await Task.find({
            $or: [
                { assigned_users: user._id },
                { user_created: user._id },
            ],
        }).populate("assigned_users user_created"); // Poblar referencias

        if (!tasks.length) {
            return res.status(404).json({
                mensaje: "No se encontraron tareas asignadas a este usuario",
            });
        }

        return res.status(200).json({
            mensaje: `Tareas encontradas para el usuario con ID: ${userId}`,
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener las tareas",
            error: error.message,
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const validator = updateTaskSchema.safeParse(body);
        if (!validator.success) {
            return res.status(400).json({
                error: "Ooooops ha ocurrido un error validando Schema",
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({
                error: "No se encontró la tarea con el ID proporcionado",
            });
        }

        return res.status(200).json({
            mensaje: "Tarea actualizada correctamente",
            data: updatedTask,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al actualizar la tarea",
            error: error.message,
        });
    }
};



exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                error: "No se encontró la tarea con el ID proporcionado",
            });
        }

        return res.status(200).json({
            mensaje: "Tarea eliminada correctamente",
            data: deletedTask,
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar la tarea",
            error: error.message,
        });
    }
};
