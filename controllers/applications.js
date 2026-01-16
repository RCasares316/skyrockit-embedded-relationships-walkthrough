const { application } = require("express");
const User = require("../models/user.js");

// Add controller logic here
const getApplicationPage = async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  res.render("applications/index.ejs", {
    applications: currentUser.applications,
  });
};

const getCreateFormPage = (req, res) => {
  res.render("applications/new.ejs");
};

const createApplication = async (req, res) => {
  // Look up the user from req.session
  const currentUser = await User.findById(req.session.user._id);
  console.log("Current User: ", currentUser);
  console.log("Request Body: ", req.body);
  // Push req.body (the new form data object) to the
  // applications array of the current user
  currentUser.applications.push(req.body);
  // Save changes to the user
  await currentUser.save();
  //redirect to applications page
  res.redirect("/applications");
};

const applicationDetails = async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  const applicationData = currentUser.applications.id(req.params.applicationId);
  res.render("applications/show.ejs", {
    application: applicationData,
  });
};

const deleteApplication = async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  currentUser.applications.id(req.params.applicationId).deleteOne();
  await currentUser.save();
  res.redirect("/applications");
};

const editApplication = async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  const application = currentUser.applications.id(req.params.applicationId);
  res.render("applications/edit.ejs", {
    application: application,
  });
};

const updateApplication = async (req,res) => {
    const currentUser = await User.findById(req.session.user._id)
    const application = currentUser.applications.id(req.params.applicationId)
    application.set(req.body)
    await currentUser.save()
    res.redirect(`/applications/${req.params.applicationId}`)
}

module.exports = {
  getApplicationPage,
  getCreateFormPage,
  createApplication,
  applicationDetails,
  deleteApplication,
  editApplication,
  updateApplication,
};
