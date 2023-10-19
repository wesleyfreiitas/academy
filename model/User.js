const knex = require("../database/connection");
const bcrypt = require("bcrypt");
// const PasswordToken = require("./PasswordToken");

class User{

    // async findAll(){
    //     try{
    //         var result = await knex.select(["id","email","name"]).table("users");
    //         return result;
    //     }catch(err){
    //         console.log(err);
    //         return [];
    //     }
    // }

    async findById(id){
        try{
            var result = await knex.select(["id","email","name","tokenRefresh"]).where({id:id}).table("users");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(["id","email","password","name"]).where({email:email}).table("users");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async new(email,password,name){
        try{
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({name,email,password: hash}).table("users");
        }catch(err){
            console.log(err);
        }
    }   

    async findEmail(email){
        try{
            var result = await knex.select("*").from("users").where({email: email});
            
            if(result.length > 0){
                return {status:true,user:result};
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }
    async findToken(token){
        try{
            var result = await knex.select("*").from("users").where({tokenRefresh: token});
            
            if(result.length > 0){
                return {status:true,user:result};
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }

    async update(id,tokenRefresh){

        var user = await this.findById(id);

        if(user != undefined){

            var editUser = {};

            editUser.tokenRefresh = tokenRefresh;
           
            try{
                await knex.update(editUser).where({id: id}).table("users");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O usuário não existe!"}
        }
    }

    async delete(id){
        var user = await this.findById(id);
        if(user != undefined){

            try{
                await knex.delete().where({id: id}).table("users");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O usuário não existe, portanto não pode ser deletado."}
        }
    }

    async changePassword(password,token){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt)
        var editUser = {};

        editUser.password = hash

        try {
            var attPass = await knex.update(editUser).where({tokenRefresh: token}).table("users");
            return {status: true}
        } catch (err) {
            return {status: false,err: err}
        }

        
    }
}

module.exports = new User();