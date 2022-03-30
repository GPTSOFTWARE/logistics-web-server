import { Router } from "express";
const router = Router();
import { createJob, deleteJob, getJob, getJobById, updateJob, getAllJob, deleteMultiJob, restoreJob } from "../controllers/Job/job.controller";
import auth from "../middleware/auth.middleware";


router.get('/jobs', getJob);
router.get('/jobs/all', getAllJob);
router.get('/job/:id', getJobById);
router.post('/job', auth, createJob);
router.put('/job/:id', auth, updateJob);
router.delete('/job/delete', auth, deleteMultiJob);
router.patch('/job/restore/:id', auth, restoreJob);
// router.delete('/job/:id', deleteJob);



export default router;