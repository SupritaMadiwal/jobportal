import jobmodel from "../models/jobsmodel.js";
import usermodel from "../models/usermodel.js";

export const postjob = async(req, res) => {
    try {
        const adminid = req.params.adminid;
        if (!adminid) {
            return res.status(400).json({ error: 'admin id is required' });
        }

        const { title, description, location, type, minsalaryrange, maxsalaryrange, requiredexperience, company, shifts } = req.body;
        if (!title, !description, !location, !type, !minsalaryrange, !maxsalaryrange, !requiredexperience, !company, !shifts) {
            return res.status(400).json({ error: 'all fields are required' });
        }

        const adminuser = await usermodel.findById(adminid);
        if (!adminuser) {
            return res.status(404).json({ error: 'admin user not found' });
        }
        if (adminuser.isadmin !== true) {
            return res.status(400).json({ error: 'only admin can post jobs' });
        }
        const newjob = new jobmodel({...req.body, userid: adminid });
        await newjob.save();
        return res.status(200).json({ message: "job posted successfully", job: newjob });

    } catch (error) {
        return res.status(500).json({ error: 'internal server error' + error.message });
    }
}

export const getalljobs = async(req, res) => {
    try {
        const jobs = await jobmodel.find();
        return res.status(200).json({ message: "jobs fetched successfully", jobs: jobs })
    } catch (error) {
        return res.status(500).json({ error: 'internal server error' + error.message });
    }
}

export const getjobbyid = async(req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "id missing in params" })
        }
        let job = await jobmodel.findById(id)
        if (!job) {
            return res.status(404).json({ error: "job not found" })
        }
        return res.status(200).json({ message: "job fetched", job: job })
    } catch (error) {
        return res.status(500).json({ error: 'internal server error' + error.message });
    }
}
export const updatejob = async(req, res) => {
    try {
        let jobid = req.params.jobid;
        if (jobid || adminid) {
            return res.status(400).json({ error: 'jobid is required' });
        }

        let updatedjob = await usermodel.findByIdAndUpdate(jobid, req.body); //old data not exist means null
        if (!updatedjob) {
            return res.status(404).json({ error: "job not found updated failed" })
        }
        return res.status(200).json({ message: "job updated successfully", job: updatedjob })
    } catch (error) {
        return res.status(500).json({ error: "internal server error" + error })
        return res.status(200).json({ message: "job updated successfully", job: updatedjob })
    }

}
export const updateadmin = async(req, res) => {
    try {
        let adminid = req.params.adminid;
        if (!adminid) {
            return res.status(400).json({ error: 'adminid is required' });
        }
        let updatedadmin = await usermodel.findByIdAndUpdate(adminid, req.body); //old data not exist means null
        if (!updatedadmin) {
            return res.status(404).json({ error: "admin not found updated failed" })
        }
        return res.status(200).json({ message: "admin updated successfully", admin: updateduser })
    } catch (error) {
        return res.status(500).json({ error: "internal server error" + error })
    }
}
export const deletejob = async(req, res) => {
    try {
        const deletejob = req.params.jobid;
        if (jobid || adminid) {
            return res.status(400).json({ error: 'job is required' });
        }
        let deletedjob = await jobmodel.findByIdAndDelete(id);
        if (!deletedjob || adminid) {
            return res.status(404).json({ error: "job not found deleted failed" })
        }

        return res.status(200).json({ message: "job deleted successfully", user: deletedjob })
    } catch (error) {
        return res.status(400).json({ error: "internal server error" + error })
    }
}
export const updatedjob = async(req, res) => {
    try {
        let jobid = req.params.jobid;
        if (jobid || adminid) {
            return res.status(400).json({ error: 'jobid is required' });
        }

        let updatedjob = await usermodel.findByIdAndUpdate(jobid, req.body); //old data not exist means null
        if (!updatedjob) {
            return res.status(404).json({ error: "job not found updated failed" })
        }
        return res.status(200).json({ message: "job updated successfully", job: updatedjob })
    } catch (error) {
        return res.status(500).json({ error: "internal server error" + error })
        return res.status(200).json({ message: "job updated successfully", job: updatedjob })
    }

}


exports.deletejob = async(req, res) => {
    try {
        const id = req.paramas.id;
        const deletedjob = await jobmodel.findByIdAndDelete(id);
        if (!deletedjob) {
            return res.status(200).json({ error: "job not found" });

        }
        return res.status(200).json({ message: "job deleted successfully" });
    } catch (error) {
        console.error('error deleting job:', error);
        return res.status(500)({ error: "interal server error" });
    }
};