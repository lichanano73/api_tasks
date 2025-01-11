const Task = require('../models/model.task');
const { tasksSchemaValidator, updateTaskSchema } = require('../validators/validators.task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            mensaje: 'Lista de tareas obtenida correctamente',
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las tareas',
            error: error.message,
        });
    }
};


exports.addTask = async (req, res) => {
    try {
        const { text, done, date } = req.body;

        if (!text || typeof done === 'undefined' || !date) {
            return res.status(400).json({
                error: 'Todos los campos son obligatorios: text, done y date',
            });
        }

        const validator = tasksSchemaValidator.safeParse({text, done, date});

        if (!validator.success){
            return res.status(400).json({
                error: 'Ooooops ha ocurrido un error validando Schema'
            })
        }

        const newTask = new Task({ text, done, date });
        await newTask.save();

        res.status(201).json({
            mensaje: 'Tarea creada correctamente',
            data: newTask,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la tarea',
            error: error.message,
        });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const validator = updateTaskSchema.safeParse(body);
        if (!validator.success){
            return res.status(400).json({
                error: 'Ooooops ha ocurrido un error validando Schema'
            })
        }

        const updatedTask = await Task.findByIdAndUpdate(id, body, {
            new: true, 
            runValidators: true, 
        });

        if (!updatedTask) {
            return res.status(404).json({
                error: 'No se encontró la tarea con el ID proporcionado',
            });
        }

        res.status(200).json({
            mensaje: 'Tarea actualizada correctamente',
            data: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la tarea',
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
                error: 'No se encontró la tarea con el ID proporcionado',
            });
        }

        res.status(200).json({
            mensaje: 'Tarea eliminada correctamente',
            data: deletedTask,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la tarea',
            error: error.message,
        });
    }
};