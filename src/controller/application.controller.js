const Application = require("../model/application.model");
const User = require("../model/user.model");

exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const application = await Application.create({
      ...req.body,
      user: req.user.id,
      job: jobId,
    });

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          appliedJobs: application._id,
        },
      }
    );

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