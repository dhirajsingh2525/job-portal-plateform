const Application = require("../model/application.model");
const User = require("../model/user.model");
const Job = require("../model/job.model");

exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const application = await Application.create({
      ...req.body,
      user: req.user.id,
      job: jobId,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        appliedJobs: application._id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Applied Successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRecruiterApplications = async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user.id,
    });

    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("user", "name email")
      .populate("job", "title company");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const job = await Job.findById(application.job);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Application.findByIdAndDelete(id);

    await User.findByIdAndUpdate(application.user, {
      $pull: {
        appliedJobs: id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
