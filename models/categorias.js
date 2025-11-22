import sequelize from "../data/db.js";
import DataTypes from "sequelize";

// OSCAR 

const Categorias = sequelize.define("Categorias",{
    idCat:{
        type: DataTypes.INTEGER,
        field: "id_cat",
        allowNull: false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
        },
    nombre:{
        type: DataTypes.STRING(30),
        field: "nombre"
    }
},{
    "timestamps": false,
    "tableName": "Categorias"
})

export default Categorias;