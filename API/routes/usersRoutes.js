//imports
module.exports = function(express,usersController){
   
    const router = express.Router();
    router.post('/inscription',(req,res) =>{
        usersController.inscription(req,res);
    });

    router.post('/logedIn',(req,res) =>{
        usersController.logedIn(req,res);
    });

    return router;
}


