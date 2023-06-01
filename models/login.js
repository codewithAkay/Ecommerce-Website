module.exports=(sequelize,DataTypes)=>{
    const login=sequelize.define("login",{
        email:{type:DataTypes.STRING,
        unique:true,
        allowNull:false
        },
        password:{type:DataTypes.STRING,
        unique:true,
        allowNull:false
        }
    })
    return login
}