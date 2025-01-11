const z = require('zod');

exports.tasksSchemaValidator = z.object({
    text: z.string().min(1),
    done: z.boolean(),
    date: z.string()
})

exports.updateTaskSchema = z.object({
    done: z.boolean()
})
