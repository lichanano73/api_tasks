const { model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { 
            type: String, 
            required: true, 
            unique: true,
            match: [/.+@.+\..+/, 'Por favor, ingrese un correo electrónico válido'],
        },
        rol: { 
            type: String, 
            required: true, 
            enum: ['admin', 'user'], 
            default: 'user'
        },
        password: { 
            type: String, 
            required: true, 
            minlength: 6
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const User = model('User', userSchema);

module.exports = User;