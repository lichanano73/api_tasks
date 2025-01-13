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
        rol: {  type: String,  required: true, 
            enum: ['admin', 'user'],  default: 'user'
        },
        password: { type: String, required: true, minlength: 6, select: false }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Excluir timestamps
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

const User = model('User', userSchema);

module.exports = User;