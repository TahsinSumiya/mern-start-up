const express = require('express')
const cors =require('cors')
const app =express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port= process.env.PORT || 7000;
const cookieParser = require('cookie-parser');


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(express.json())
app.use(cookieParser)

const uri = `mongodb+srv://tahsin:${process.env.DB_PASS}@cluster0.tomqqym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const logger =async(req,res,next)=>{
console.log('called',req.host,req.originalUrl)
next()
}

const verifyToken =async(req,res,next)=>{
    const token = req.cookies?.token
    if(!token){
        return res.status(401).send({message:'not authorized'})
    }
    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
        if(err){
return res.status(401).send({message:'unauthorized'})
        }
        console.log('value of the token',decoded)
        req.user = decoded
        next()
    })

    }
async function run() {
    try {
      
        await client.connect();

       const serviceCollection = client.db('car').collection('allcars')
       const bookingCollection = client.db('car').collection('booking')

       app.get('/services',logger,async(req,res)=>{
       const curosr= serviceCollection.find();
       const result = await curosr.toArray()
       res.send(result)
    })




    app.get('/services/:id',async(req,res)=>{
        const id = req.params.id
        const query = {_id :new ObjectId(id)}
        const options ={
            projection :{title:1,price:1,img:1,service_id:1}
        }
        const result = await serviceCollection.findOne(query)
        res.send(result)
     })


     app.get('/getbookings',logger, verifyToken, async (req, res) => {
        let query = {}
        if (req.query?.email) {
            query = { email: req.query.email }
            console.log("Fetching bookings with query:", query);
        }
        const result = await bookingCollection.find(query).toArray()  // Ensure the query is used here
        res.send(result)
        console.log("Fetching bookings with query:", query);

    })
    

     app.post('/bookings',async(req,res)=>{
        const booking = req.body
        const result= await bookingCollection.insertOne(booking)
        res.send(result)
     })

     app.patch('/updatebookings/:id', async (req, res) => {
        const id = req.params.id
        const filter ={ _id: new ObjectId(id) };
      const updatedbooking = req.body
      const updateDoc ={
        $set: {
            status:updatedbooking.status
        }
      }
      const result = await bookingCollection.updateOne(filter,updateDoc)
      res.send(result)

    })
    
     app.delete('/bookings/:id', async (req, res) => {
        const { id } = req.params; // Extract the id from req.params
        const query = { _id: new ObjectId(id) }; // Ensure ObjectId is used correctly
        const result = await bookingCollection.deleteOne(query);
        res.send(result);
    });
    

    app.post('/jwt',logger,async(req,res)=>{
        const user = req.body
    
        const token = jwt.sign(user,process.env.SECRET,{expiresIn:'1h'})
        console.log(user)
        res
        .cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'none'
        })
        .send({success:true})
     })


     app.post('/logout',async(req,res)=>{
const user = req.body
res.clearCookiecookie('token',{maxAge:0}).send({success:true})
     })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
  
    }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('car is running')
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})