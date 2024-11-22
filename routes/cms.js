const express = require("express");
const cms_router = express();

const TeamController = require('../controllers/teamController');
const BlogController = require('../controllers/blogController');
const CertificationController = require('../controllers/certificationController');
const TestimonialController = require('../controllers/testimonialController');
const AuthController = require('../controllers/authController');
const authentication = require('../middlewares/authentication');
const DocumentController = require("@controllers/documentController");
const { parseFile } = require("@helpers/multer");

cms_router.post('/login', AuthController.login)

cms_router.use(authentication)

// Teams
cms_router.post("/teams", TeamController.post);
cms_router.get("/teams", TeamController.all);
cms_router.get("/teams/:id", TeamController.detail);
cms_router.put("/teams/:id", TeamController.update);
cms_router.delete("/teams/:id", TeamController.delete);

// Blogs
cms_router.post("/blogs", BlogController.post);
cms_router.get("/blogs", BlogController.all_cms);
cms_router.get("/blogs/:id", BlogController.detail);
cms_router.put("/blogs/:id", BlogController.update);
cms_router.put("/blogs/:id/status", BlogController.update_status);

// Certifications
cms_router.post("/certifications", CertificationController.post);
cms_router.get("/certifications", CertificationController.all);
cms_router.get("/certifications/:id", CertificationController.detail);
cms_router.put("/certifications/:id", CertificationController.update);
cms_router.delete("/certifications/:id", CertificationController.delete);

// Testimonials
cms_router.post("/testimonials", TestimonialController.post);
cms_router.get("/testimonials", TestimonialController.all);
cms_router.get("/testimonials/:id", TestimonialController.detail);
cms_router.put("/testimonials/:id", TestimonialController.update);
cms_router.delete("/testimonials/:id", TestimonialController.delete);

cms_router.post("/documents", parseFile, DocumentController.post);
cms_router.delete("/documents/:id", DocumentController.delete);
cms_router.get("/documents/:id/url", DocumentController.url);

module.exports = cms_router