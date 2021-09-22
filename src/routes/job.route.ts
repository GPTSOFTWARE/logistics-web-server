import { Router } from "express";
const router = Router();
import { createJob, deleteJob, getJob, getJobById, updateJob, getAllJob } from "../controllers/Job/job.controller";


router.get('/jobs', getJob);
router.get('/jobs/all', getAllJob);
router.get('/job/:id', getJobById);
router.post('/job', createJob);
router.put('/job/:id', updateJob);
router.delete('/job/:id', deleteJob);



export default router;