import { Router } from "express";
import { isAuthenticated } from "../../utils/middleware";

const router = Router();

router.use('/', isAuthenticated, (req, res) => {
    res.send(200); // Zaakee love girls code
});

export default router
