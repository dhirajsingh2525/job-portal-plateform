const Job = require("../model/job.model");
const { uploadFile } = require("../services/storage.service");

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      city,
      country,
      location,
      job_type,
      salary,
      description,
      skills,
      education,
      experience,
    } = req.body;

    let logoUrl = "";

    if (req.file) {
      const uploadedLogo = await uploadFile(req.file.buffer);
      logoUrl = uploadedLogo.url;
    }
    console.log(req.file)

    const job = await Job.create({
      title,
      company,
      city,
      country,
      logo: logoUrl,
      location,
      job_type,
      salary,
      description,
      skills: skills || [],
      education,
      experience,
      postedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllJobs = async (req,res) => {
   
  try {
    const jobs = await Job.find();

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.updateJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    let updateData = { ...req.body };

    if (req.file) {
      const uploadedLogo = await uploadFile(req.file.buffer);

      updateData.logo = uploadedLogo.url;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};