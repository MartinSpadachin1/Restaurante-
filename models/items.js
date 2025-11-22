import sequelize from "../data/db.js";
import DataTypes from "sequelize";
import Categorias from "./categorias.js"

// MARTÍN - El Item es la comida. Recordar las ASOCIACIONES (belongsTo... ver documentación)

const Items = sequelize.define("Items", {
    idItem:{
        type: DataTypes.INTEGER,
        field: "id_item",
        allownull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING(30),
        field: "nombre"
    },
    categoria:{
        type: DataTypes.INTEGER,
        field: "categoria",
        references:{
            model: Categorias,
            key: "idCat"
        }
    },
    imgURL:{
        type: DataTypes.TEXT,
        field: "img_url"
    },
    descrip:{
        type: DataTypes.STRING(30),
        field: "descrip"
    },
    precio:{
        type: DataTypes.FLOAT,
        field: "precio"
    }
},{
    "timestamps": false,
    "tableName": "Items"
})

Items.belongsTo(Categorias,{foreignKey:"categoria", onUpdate:"CASCADE", onDelete:"CASCADE"})
export default Items;