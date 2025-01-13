const z = require('zod');

exports.tasksSchemaValidator = z.object({
    text: z.string().min(1, 'El texto es obligatorio'),
    company: z.string().min(1, 'El texto es obligatorio'),
    description:z.string().min(1, 'El texto es obligatorio'),
    done: z.boolean().default(false),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'La fecha debe ser válida',
    }),
});

exports.updateTaskSchema = z.object({
    done: z.boolean()
})


exports.assignUsersSchema = z.object({
    assigned_users: z.array(z.string().min(1, 'El ID del usuario asignado es obligatorio')),
});

exports.addPartHoursSchema = z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'La fecha debe ser válida',
    }),
    description: z.string().min(1, 'La descripción es obligatoria'),
    duration: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'La duración debe estar en formato HH:mm'),
});