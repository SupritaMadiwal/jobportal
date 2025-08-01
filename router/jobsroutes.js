import express from "express";
import { getalljobs, getjobbyid, postjob } from '../controller/jobscontroller.js'
const router = express.Router();

//routes
router.post('/jobs/:adminid', postjob);
router.get('/jobs', getalljobs);
router.get('/jobs/:id', getjobbyid)
router.put('/jobs/:;jobid:adminid', updatejob)
router.delete('/deletejob/:jobid', deletebyid)
export default router