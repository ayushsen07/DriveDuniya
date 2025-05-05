const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    name : {
        type:String,
        required :[true,"Please provide a name"]
    },
    email : {
        type:String,
        required :[true,"Please provide a email"]
    },
    password : {
        type:String,
        required :[true,"Please provide a password"],
        minlength:6
    },
    phone:{
        type:Number,
        required :[true ,"Please provide Phone no."]
    },
    status :{
        type:String,
        enum:['Active','Banned'],
        default:'Active'
    },
    role:{
        type:String,
        required :[true ,"Role is required"]

    }
},{
    timestamps : true
})

// hashed password using bcryptjs

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
})


// compare password with the hashed password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User',userSchema)