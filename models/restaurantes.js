import sequelize from "../data/db.js";
import DataTypes from "sequelize";
// Importando otros modelos relacionados...
// import Mesas from "./mesas.js";

// AGUS

const Restaurantes  = sequelize.define("Restaurantes",{
    idResto:{
        type: DataTypes.INTEGER,
        field: "id_resto",
        allowNull: false,
        unique: true, 
        primaryKey: true,
        autoIncrement: true 
    },
    nombre:{
        type: DataTypes.STRING(30),
        field: "nombre"
    },
    horaApertura:{
        type: DataTypes.STRING(30),
        field: "hora_apertura",
    },
    horaCierre:{
        type: DataTypes.STRING(30),
        field: "hora_cierre"
    },
    usuario: {
        type: DataTypes.STRING(30),
        field: "usuario",
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING(30),
        field: "contraseña"
    },
    direc: {
        type: DataTypes.STRING,
        field: "direc"
    }
},{
    "timestamps": false,
    "tableName": "Restaurantes"
})

// Restaurantes tiene muchas Mesas - hasMany
/* Restaurantes.hasMany(Mesas, { 
    foreignKey: 'idResto', 
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
}); */

export default Restaurantes;