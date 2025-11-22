import sequelize from "../data/db.js";
import DataTypes from "sequelize";
// import Mesas from "./mesas.js";

// JAVI

const Mozos = sequelize.define("Mozos",{
    idMozo:{
        type: DataTypes.INTEGER,
        field: "id_mozo",
        allowNull: false,
        unique: true, 
        primaryKey: true,
        autoIncrement:true  
    },
    fechaIngreso:{
        type: DataTypes.DATE,
        field: "fecha_ingreso" 
    },
    nombre:{
        type: DataTypes.STRING(30),
        field: "nombre" 
    }
},{
    "timestamps": false,
    "tableName": "Mozos"
})

/* Mozos.hasMany(Mesas, { 
    foreignKey: 'idMozo', 
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE'
}); */


export default Mozos; 