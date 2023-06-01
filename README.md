# 
first you can go to the correct directory
 than you can  install all dependencies
dependencies install code Npm init -y
if packeges cannot find you can install that package
like Npm i express etc
then  you can run server 
 nodemon = Npm run dev

localhost:7000

  <!-- <form action="/deleteItem/<%=item.id%>" method="get"> -->
  router.get("/deleteItem/:id",async(req,res)=>{
  const {id}=req.params
  const data =await Register.destroy({where:{id}})
  const product=await Register.findAll({})
   res.render("register",{ product:product})
})