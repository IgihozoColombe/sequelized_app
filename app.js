const express = require("express");
const { sequelize, User } = require("./models");
const { genSalt, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const bcrypt = require("bcrypt")
const { compare } = bcrypt;


const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        let password=await req.body.password
        let salt=await bcrypt.genSalt(5)
        let hashedPassword=await bcrypt.hash(password,salt)
        let newUser=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            age:req.body.age,
            address:req.body.address
   
        })
        let email=await User.findOne({email:req.body.email})
         if(email){
            res.status(200).send("The user with that email arleady exists")
        }
        else{
    
            await newUser.save();
            res.status(200).send(newUser)
        }
    
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

app.post("/signin", async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(403).send("Invalid Email or Password!");

        const validPassword = await compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid Email or Password!");

        const token = sign(
            { id: user.id },
            "sequelized_project_2344"
        );

        res.header("Authorization", token).send({
           
            token: 'Bearer ' + token,
            message: "Logged in successively",
            status: 200
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Invalid login email or password!" });
    }

})


app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email, password, address, age } = req.body;
    try {
        if (password) {
            return res.status(403).json({ message: "Reset your password" })
        }
        if (email) {
            return res.status(403).json({ message: "Email can't be changed" })
        }


        const user = await User.findOne({ where: { id } })
        user.name = name;
        user.age = age;
        user.address = address;
   
        await user.save();

        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})


app.listen({ port: 6000 }, async () => {
    console.log("Server up on port 6000");
    await sequelize.authenticate();
    console.log("Connected to database");
})