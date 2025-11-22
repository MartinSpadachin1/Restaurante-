import sequelize from "../data/db.js";
import DataTypes from "sequelize";
import Restaurantes from "./restaurantes.js";
import Mozos from "./mozos.js";

// Ya lo hicimos...

const Mesas = sequelize.define("Mesas",{
    nmesa:{
        type: DataTypes.INTEGER,
        field: "nmesa",
        allowNull: false,
        primaryKey: true
    },
    idResto:{
        type: DataTypes.INTEGER,
        field: "id_resto",
        primaryKey: true,
        allowNull: false,
        references: {
            model: Restaurantes,
            key: "idResto"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE" 
    },
    cantPersonas:{
        type: DataTypes.INTEGER,
        field: "cant_personas",
    },
    idMozo:{
        type: DataTypes.INTEGER,
        field: "id_mozo",
        references:{
            model: Mozos,
            key: "idMozo"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE" 
    },
    estaLibre:{
        type: DataTypes.BOOLEAN, 
        field: "esta_libre"
    }
},{
    "timestamps": false,
    "tableName": "Mesas"
})

// Asociaciones 

// Una Mesa pertenece a un Restaurante - belongsTo

Mesas.belongsTo(Restaurantes, { foreignKey: 'idResto' });

// Una Mesa es atendida por un Mozo - belongsTo

Mesas.belongsTo(Mozos, { foreignKey: 'idMozo' });

export default Mesas;