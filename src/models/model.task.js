const { model, Schema } = require('mongoose');

const partHoursSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // usuario creador
    date: { type: Date, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
}, { _id: false });

const tasksSchema = new Schema(
    {
        text: {     type: String, required: true },
        company: {  type: String, required: true },
        done: { type: Boolean, required: true },
        date: { type: Date, required: true },
        user_created: {     type: Schema.Types.ObjectId, ref: 'User', required: true },
        assigned_users: [{  type: Schema.Types.ObjectId, ref: 'User' }], // Referencias usuarios asignados
        part_hours: [ partHoursSchema ], // Array
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Task = model('Task', tasksSchema);

module.exports = Task;