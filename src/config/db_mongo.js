const mongoose = require('mongoose');


const conectDB = async (URI_DB)=>{
    try{
        await mongoose.connect(URI_DB);
        console.log('Conexion mongodb exitosa');
    } catch (error) {
        console.log('Error de conexion mongodb');
        console.log(error);
    }
}

module.exports = conectDB;