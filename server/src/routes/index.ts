import { Router } from "express";
import translateRouter from "./translate";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/translate", translateRouter);

// Export the base-router
export default router;
