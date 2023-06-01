module.exports=(sequelize,DataTypes)=>{

    const addProduct=  sequelize.define("products",{
    name:{type:DataTypes.STRING,
    allowNull:false
    },
    category:{
    type:DataTypes.STRING,
    allowNull:false
    },
    price:{type:DataTypes.NUMBER,
    allowNull:false
    },
    image:{
    type:DataTypes.STRING,
    allowNull:false
    }
    })

    return addProduct
}