const {db,Users,express,app} = require('./db')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
db.authenticate()
.then(()=>{
    console.log('db works')
})
.catch((err)=>{
    console.error(err)
})

app.use('/',express.static(__dirname+'/public'))
app.patch("/todos/:id", async(req, res) => {
    if(isNaN(parseInt(req.params.id))){
        return res.status(400).send({error: 'todo must be integer'})
    }
    const  id= req.body.id
    const  Priority= req.body.Priority
    const  date= req.body.date
    const  Notes = req.body.Notes
    const status = req.body.status
                
    const user = await Users.findByPK(id);
      user.Priority=Priority;
      user.date=date;
      user.Notes=Notes;
      user.status=status;
      console.log("user",user);
      //await user.save();
     
      res.status(204).send({success: 'updated successfully'})
   
})
app.post('/todosremove',async(req,res)=>{
    console.log('server:')
    await Users.destroy({
        where: { status: req.body.status}
        
    })
    res.status(201).redirect('/')
})

app.get('/todos',async(req,res)=>{
    const user = await Users.findAll();
    console.log(user)
    res.send(user)
})

app.get('/todos/:id',async(req,res)=>{
    if(isNaN(parseInt(req.params.id))){
        return res.status(400).send({error: 'todo must be integer'})
    }
    const idd=req.params.id
    const user = await Users.findByPK(idd);
    if(!user){
        return res.status(404).send({error: 'no todo found with id =' +req.params.id})
    }
    res.send(user)
})

app.post('/todos',async(req,res)=>{
    db.sync()
    await Users.create({task: req.body.task ,Description: req.body.Description,date: req.body.date,Notes: req.body.Notes,Priority: req.body.Priority,status: req.body.status}).then(function(user) {
        console.log('success', user.toJSON());
    })
    .catch(function(err) {
        console.log(err);
    })
    res.status(201).send({success: 'new task added'})
})

app.post('/todoss',async(req,res)=>{
    const idd= req.body.id
    const Priority= req.body.Priority
    const date= req.body.date
    const Notes= req.body.Notes
    const status= req.body.status
    console.log("dataata", date)
    const user = await Users.findOne({
        where : { id: idd}
    });
      user.Priority=Priority;
      user.date=date;
      user.Notes=Notes;
      user.status=status;
      console.log("user",user);
      await user.save();
    
    res.status(204).send({success: 'updated'})
})
//const sererport= process.env.PORT || 3232
app.listen(3232)