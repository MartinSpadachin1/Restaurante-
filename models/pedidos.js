import sequelize from "../data/db.js";
import DataTypes from "sequelize";
import Mesas from "./mesas.js";
import moment from 'moment-timezone';
//import 'moment-timezone';

// JULI... recordar fechaHoraCreacion = DEFAULTVALUE... DATA.NOW y tambien recordar ASOCIACIONES

const Pedidos = sequelize.define("Pedidos",{
    codigo:{
        type: DataTypes.INTEGER,
        field: "codigo",
        primaryKey: true,
        allowNull: false,
        autoIncrement:true 
    },
    nmesa:{
        type: DataTypes.INTEGER,
        field: "nmesa",
        references:{
            model: Mesas,
            key: "nmesa"
        }
    },
    idResto:{
        type: DataTypes.INTEGER,
        field: "id_resto",
        references:{
            model: Mesas,
            key: "idResto"
        }
    },
    fechaHoraCreacion:{
        type: DataTypes.STRING,
        field: "fechahora_Creacion",
        //defaultValue: DataTypes.NOW
        defaultValue: () => moment().tz('America/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss')
    },
    fechaHoraCobro:{
        type: DataTypes.STRING,
        field: "fechahora_cobro",
        defaultValue: null
    },
    total:{
        type: DataTypes.FLOAT,
        field: "total"
    }
},{
    "timestamps": false,
    "tableName": "Pedidos"
})

Pedidos.belongsTo(Mesas, { foreignKey : 'nmesa', targetKey: 'nmesa', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

Pedidos.belongsTo(Mesas, { foreignKey : 'idResto', targetKey: 'idResto', onUpdate: 'CASCADE', onDelete: 'CASCADE' })

export default Pedidos;