const {Sequelize,DataTypes}=require("sequelize")

const sequelize= new Sequelize({
    dialect:'sqlite',
    storage:"./db.db",
    logging:false
})

try{
  sequelize.authenticate()
  console.log("Connected SuccessFully")
}catch(error){
    console.log(error)
}

const db={}

db.sequelize=sequelize
db.Sequelize=Sequelize
db.product=require("./addProduct")(sequelize,DataTypes)
db.login=require("./login")(sequelize,DataTypes)
db.register=require("./register")(sequelize,DataTypes)


db.sequelize.sync({})

module.exports=db