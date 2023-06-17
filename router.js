import express from "express";
import scoreController from "./controllers/score.controller.js";
import userController from "./controllers/user.controller.js";
import pageController from "./controllers/page.controller.js";
import auth from "./middleware/auth.js";


const router = express.Router();

//Pages
router.get('/', pageController.getMainPage2);
router.get('/sketches', pageController.getSketchPage);
router.get('/paintings', pageController.getPaintingPage);
router.get('/old', pageController.getMainPage);
router.get('/mario',pageController.getGamePage);
router.get('/admin', auth, pageController.getAdminPage);
router.get('/login', pageController.getLoginPage)
router.get('/register', pageController.getRegistrationPage);
router.get('/logout', userController.logout);

//User Rotues
router.post('/User/Create',userController.register);
router.post('/User/Login',userController.login);

//Score Routes
router.post('/Score/Update',scoreController.updateScore);
router.post('/Score/Delete', scoreController.deleteScore);
router.get('/Score',scoreController.getScores);
router.post('/Score/Create',scoreController.createScore);


export default router;