const z = require('zod');

exports.usersSchemaValidator = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    username: z.string().min(1, 'El nombre de usuario es obligatorio'),
    email: z.string().email('Debe ser un correo electrónico válido'),
    rol: z.string().min(1, 'El rol es obligatorio'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});


exports.usersSchemaValidator = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    username: z.string().min(1, 'El nombre de usuario es obligatorio'),
    email: z.string().email('Debe ser un correo electrónico válido'),
    rol: z.string().min(1, 'El rol es obligatorio')
});

