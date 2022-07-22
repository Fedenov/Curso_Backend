


db.inventory.insertMany([{
    product: "Piano",
    price:25
},{
    product: "lato",
    price:250
},{
    product: "esa",
    price:2500
},{
    product: "Lampara",
    price:25
},{
    product: "Lampara2",
    price:251
},{
    product: "Lampara3",
    price:252
},{
    product: "Lampara4",
    price:253
},{
    product: "Lampara66",
    price:254
},{
    product: "Lampara78",
    price:2570
},{
    product: "Lampara90",
    price:25000
},{
    product: "Lampara12",
    price:25230
}])





//CRUD
db.inventory.count()

db.inventory.insertMany({product:"Lampara13", price:123})

db.inventory.find({product:"Lampara12"})

db.inventory.find({price:{$lte:1000}})

db.inventory.find({price:{$gte:1000}},{price:{$lte:3000}})

db.inventory.find().sort({price:1}).skip(2)

db.inventory.update({}, {$set:{stock:100}})

db.inventory.update({price:{$gte:4000}},{$set:{stock:0}})

db.inventory.deleteMany({price:{$lte:1000}})

//Crear Usuario
db.createUser(
    {
        user: "pepe", 
        pwd: "asd456",
        roles:[
            {role:"read", db:mibase}
        ]
    }
)