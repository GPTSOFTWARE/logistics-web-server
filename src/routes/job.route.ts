import { Router } from "express";
const router = Router();
import { createJob, deleteJob, getJob, getJobById, updateJob } from "../controllers/Job/job.controller";


router.get('/jobs', getJob);
router.get('/job/:id', getJobById);
router.post('/job',createJob);
router.put('/job/:id',updateJob);
router.delete('/job/:id',deleteJob);



export default router;