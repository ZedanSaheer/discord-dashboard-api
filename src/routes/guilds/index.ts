import { Router } from "express";
import { getGuildsController, getGuildsPermissionController } from "../../controllers/guilds";
import { isAuthenticated } from "../../utils/middleware";

const router = Router();

router.get('/', isAuthenticated, getGuildsController); //Redirects user to the guilds controller if authenticated
router.get('/:id/permissions',isAuthenticated,getGuildsPermissionController)

export default router
