var router = express.Router();
const itemController = require("../controllers/itemControllers");

router.get('/items/:id', itemController.byID);
router.get('/items', itemController.query);
router.post('/items/:id/', function(req,res){
    if(isAuthenticated()){

    }
    else{
        res.send(404);
    }
});

router.

module.exports = router;