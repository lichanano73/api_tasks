const { model, Schema } = require('mongoose');

const tasksSchema = new Schema(
    {
        text: { type: String, required: true },
        done: { type: Boolean, required: true },
        date: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Task = model('Task', tasksSchema);

module.exports = Task;