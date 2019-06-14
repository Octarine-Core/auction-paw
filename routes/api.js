var router = express.Router();
const itemController = require("../controllers/itemControllers");

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { next(null); }
    res.redirect('/error')
  };
  

router.get('/items/:id', itemController.byID);
router.get('/items', itemController.query);
router.post('/items/:id/', ensureAuthenticated, );



module.exports = router;