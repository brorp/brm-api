const express = require("express");
const web_router = express();
const MailController = require('../controllers/mailController');
const TeamController = require('../controllers/teamController');
const BlogController = require('../controllers/blogController');
const TestimonialController = require('../controllers/testimonialController');
const CertificationController = require('../controllers/certificationController');
const CategoryController = require("@controllers/categoryController")

web_router.get("/testiomonials", TestimonialController.all);
web_router.get("/testiomonials/:id", TestimonialController.detail);

web_router.get("/teams", TeamController.all);
web_router.get("/teams/:id", TeamController.detail);

web_router.get("/certifications", CertificationController.all);
web_router.get("/certifications/:id", CertificationController.detail);

cms_router.get("/categories", CategoryController.all);

web_router.get("/blogs", BlogController.all_web);
web_router.get("/blogs/:id", BlogController.detail);
web_router.get("/blogs/:id/more", BlogController.more);

web_router.post("/contact-us", MailController.post);

module.exports = web_router