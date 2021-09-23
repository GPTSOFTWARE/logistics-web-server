import { Router } from "express";
const router = Router();
import { createJob, deleteJob, getJob, getJobById, updateJob, getAllJob, deleteMultiJob, restoreJob } from "../controllers/Job/job.controller";


router.get('/jobs', getJob);
router.get('/jobs/all', getAllJob);
router.get('/job/:id', getJobById);
router.post('/job', createJob);
router.put('/job/:id', updateJob);
router.delete('/job/delete', deleteMultiJob);
router.patch('/job/restore/:id', restoreJob);
// router.delete('/job/:id', deleteJob);



export default router;