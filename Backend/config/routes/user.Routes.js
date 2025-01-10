import { Router } from "express";
import { userController } from "../controllers/usersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { tracker } from "../middleware/reportRequest.js";
const router = Router();

router.post("/usuarios", tracker, userController.register);
router.post("/login", tracker, authMiddleware, userController.login);
router.get("/usuarios", tracker, authMiddleware, userController.getUser);


router.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe");
});

export default router;