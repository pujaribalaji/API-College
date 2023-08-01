const express = require("express");
const authController = require("../controllers/authController");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.post("/student/login", authController.studentLogin);
router.post("/dean/login", authController.deanLogin);

// Apply the authenticateStudent middleware to the /student/book route
router.post("/student/book", authController.authenticateStudent, sessionController.bookSession);

// Add the route for /student/check-token
router.get("/student/check-token", authController.checkToken);

router.get("/dean/sessions", sessionController.listFreeSessions);
router.get("/dean/pending-sessions-all", sessionController.pendingSessionsAll);
router.get("/dean/pending-sessions-after-A", sessionController.pendingSessionsAfterA);

module.exports = router;
