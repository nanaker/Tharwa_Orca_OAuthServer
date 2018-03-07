//imports
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var http = require("http");
const request = require('request');



//Routes
module.exports = function(User,sequelize) {

    //service d'unscription ( création du compte utilisateur)
    function inscription (req,res){
        var id = req.body.userId;
        var Username = req.body.UserName;
        var Password = req.body.Pwd;
        var Type = req.body.Type;
       
        if(id == null || Username == null || Password == null || Type == null){
            return res.status(400).json({'error':'missing parameters'});
        }

        
       const value = sequelize.escape(id);
       var idd = sequelize.literal(`userId = CONVERT(varchar, ${value})`)
     
    

       User.findOne({
            attributes:['userId'],
            where: {  idd }
            
        })
        .then(function(userFound){
           if(userFound){
              //conflict
              return res.status(409).json({'error':'User already exists'});
            

           }else{
                  const passwordHash = crypto.createHmac('sha256', Password).digest('hex');
                   var newUser = User.create({
                       userId : id,
                       username : Username,
                       type : Type,
                       password : passwordHash
                      

                   }).then(function(newUser){
                        return res.status(201).json({'Id': newUser.userId});
                   })
                   .catch(err => {
                    console.error('Unable to add user:', err);
                    });
           
           }
        })
        .catch(function(err){
            return res.status(500).json({'error':'Can\'t verify parameters'});
            console.log(err);
        });

    }

    //service d'authentification
    function logedIn  (req1,res1){
        
        const token = req1.body.token;
        const options = {  
            url: 'http://localhost:8000/oauth/info',
            method: 'GET',
            headers: {
                "Authorization": "Bearer " +token, 
                "Cache-Control": "no-cache",
                "Content-Type": 'application/json'
            }
           
        };

        let responseBody;
        function getResponseBody(body){
            responseBody = body;
        }

        request(options, function(err, res, body,Id) {  
            
            if(err){
                console.log(err);
                
            }
            else {
                if(res.statusCode == 401){
                    res1.status(401).json({'error': "unauthorized"});
                }
                else {
                bodyJson = JSON.parse(body);
                appId = bodyJson.applicationId;
                id = bodyJson.userId;
                exp = bodyJson.expiresIn;
                getResponseBody(bodyJson);
                const value = sequelize.escape(id);
                var idd = sequelize.literal(`userId = CONVERT(varchar, ${value})`)
                User.findOne({
                    attributes:['userId','username'],
                    where: {  idd }
                    
                })
                .then(function(userFound){
                   if(userFound){
                      console.log(userFound.username);
                      res1.status(200).json({'userId':userFound.userId,
                                            'userName': userFound.username});
                   
                   }else{
                          
                    res1.status(404).json({'error':'User not found'});
                   }
                })
                .catch(function(err){
                     res1.status(500).json({'error':'Can\'t verify user'});
                     console.log(err);
                });
            }
                
            }

         console.log("OK"); 
         return res1; 
        });

        
        
    }
    return {inscription,logedIn};
}