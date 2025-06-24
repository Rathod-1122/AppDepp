
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const multer=require('multer')
const dotenv=require('dotenv')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const path=require('node:path')
dotenv.config();

const app=express();
app.use(cors());

app.listen(5544,()=>{
    console.log('server is running on port:5544');
})

//-------------------------------extra for deployment------------
app.use(express.static(path.join(__dirname,'./Client/build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, './Client/build/index.html'))});
//---------------------------------------

let store=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}--${file.originalname}`)
    }
})

const upload=multer({storage:store})

app.use('/uploads',express.static('uploads'))//it enables the clients to access its folders and files

app.post('/insertingDataToDB',upload.single('profilePic'),async(req,res)=>{
    console.log(req.body)
    console.log(req.file)

    try{
        let hashedPassword = await bcrypt.hash(req.body.password,10);
        let employee1=new employees({
            name:req.body.name,
            age:req.body.age,
            id:req.body.id,
            phoneNo:req.body.phoneNo,
            email:req.body.email,
            password:hashedPassword,
            profilePic:req.file.path//path of the file where it has uploaded in the server side
        })
        employees.insertMany([employee1,]);
        console.log('data insertion is successfull');
        res.json({status:'success' ,message:'user created successfully'});
    }catch(err){
        console.log('unable to create the user',err)
        res.json({status:'fialure',message:'unable to create the user'})
    }
})

app.post('/login',upload.none(),async(req,res)=>{

    console.log('request from client is:',req.body)
    let wholeDataSet=await employees.find();
    console.log('the whole data set is :',wholeDataSet)
    let matchedData= await employees.find().and({email:req.body.email});
    console.log('the matcheddata is :',matchedData);

    if(matchedData.length>0)
    {
        console.log('email is matched')
        let i=0;
        for(i=0;i<matchedData.length;i++)
        {
            let isPasswordCorrect=await bcrypt.compare(req.body.password,matchedData[i].password)//the second argument should be a hashed password
            if(isPasswordCorrect)
            {
                let token=jwt.sign({email:matchedData[i].email,password:matchedData[i].password},'hi');
                console.log('password is matched')
                res.json({status:'success',message:'user login successfull',encryptedData:token,data:matchedData[i]})
            }
            if(i==matchedData.length-1){
                res.json({message:'enter the valid password'})
                console.log('enter the correnct password')
            }
        }
    }
    else{
        res.json({status:'failed',message:'enter a valid email'})
    }
})

app.post('/validateTokenForAutologin',upload.none(),async(req,res)=>{

    let decryptedData=jwt.verify(req.body.token,'hi');
    console.log('the decrypted data is :',decryptedData)
    let wholeDataSet=await employees.find();
    console.log('the whole data set is :',wholeDataSet)
    let dataFoundAfterDecrypt= await employees.find().and({email:decryptedData.email});

    if(dataFoundAfterDecrypt.length>0)
    {
        console.log('email is valid');
        let i;
        for(i=0;i<dataFoundAfterDecrypt.length;i++)
        {
            if(decryptedData.password==dataFoundAfterDecrypt[i].password)
            {
                console.log('password is valid')
                let dataToSend={
                    name:dataFoundAfterDecrypt[i].name,
                    age:dataFoundAfterDecrypt[i].age,
                    id:dataFoundAfterDecrypt[i].id,
                    phoneNo:dataFoundAfterDecrypt[i].phoneNo,
                    email:dataFoundAfterDecrypt[i].email,
                    password:dataFoundAfterDecrypt[i].password,
                    profilePic:dataFoundAfterDecrypt[i].profilePic
                }

                res.json({status:'success',message:'autologin successfull',data:dataToSend});
            }
            if(i==dataFoundAfterDecrypt.length-1)
            {
                res.json({status:'filed',message:'autologin failed due to invalid decrypted password'})
            }
        }
    }
    else{
        res.json({status:'failed',message:'autologin is failed due to invalid decrypted email'})
    }
})

app.put('/updateEmployeeProfile',upload.single('profilePic'),async(req,res)=>{

    // console.log('req.body',req.body)

    try{
        if(req.body.name.trim().length>0)
        {
            let updatedName= await employees.updateMany({email:req.body.email},{name:req.body.name})
            console.log('the updated name details:',updatedName)
        }
        if(req.body.age>0 && req.body.age<100)
        {
            await employees.updateMany({email:req.body.email},{age:req.body.age})
        }
        if(req.body.email.trim().length>0)
        {
            await employees.updateMany({email:req.body.email},{email:req.body.email})
        }
        if(req.body.password.length>0)
        {
            await employees.updateMany({email:req.body.email},{password:req.body.password})
        }
        if(req.file && req.file.path)
        {
            await employees.updateMany({email:req.body.email},{profilePic:req.file.path})
        }

        console.log('employees details updated successfully')
        res.json({status:'Updation Success',message:'Details updated successfully'})

    }catch(err){
        res.json({status:'Updation Failed',message:'Unable to update the details',error:err})

    }
    
})
app.delete('/deleteEmployeesProfile',async(req,res)=>{

    console.log('inside the delete API endpoint')

    try{
        let delResult= await employees.deleteMany({email:req.query.email})
         if(delResult.deletedCount>0)
            res.json({status:'Deletion successfull',message:'Employee deleted successfully'})
        else{
            res.json({status:'Deletion failed',message:'Unable to delete the employee'})
        }
    }catch(err){
        res.json({message:'Error occured while deleting the employee'})

    }
    
})

//---------------------------- Data Base Part --------------------------

let connectingServerToDataBase=async()=>{
    try{
        await mongoose.connect(process.env.mongoDBConnectionString);
        //mongodb+srv://itisformywork17:REnhJKhBofETWF55@cluster3.lwuhh1k.mongodb.net/HCLEmployees
        console.log('server has connected to the DB successfully');
    }catch(err){
        console.log('server has not connected to the DB',err);
    }
}
connectingServerToDataBase();

let employeesSchema=new mongoose.Schema({
    name:String,
    age:Number,
    id:String,
    phoneNo:Number,
    email:String,
    password:String,
    profilePic:String
})

let employees=new mongoose.model('employees',employeesSchema,'EmployeesProfile');
