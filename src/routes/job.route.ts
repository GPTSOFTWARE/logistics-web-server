import { Router } from "express";
import { createJob, deleteJob, getJob, getJobById, updateJob } from "../controllers/Job/job.controller";
const router = Router();

router.get('/jobs', getJob);
router.get('/job/:id', getJobById);
router.post('/job',createJob);
router.put('/job/:id',updateJob);
router.delete('/job/:id',deleteJob);



export default router;