const Student = require("../models/student");
const Session = require("../models/session");
const Dean = require("../models/dean");
const mongoose = require('mongoose');

exports.listFreeSessions = async (req, res) => {
  try {
    // You would query the database here to get the sessions
    // For simplicity, we'll return a mock response
    const sessions = [
      { id: 1, date: "2023-07-27", time: "10:00 AM", student: null },
      { id: 2, date: "2023-07-27", time: "11:00 AM", student: null },
      { id: 3, date: "2023-07-27", time: "12:00 PM", student: null },
      // Add more sessions here
    ];

    return res.json({ sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.bookSession = async (req, res) => {
  const { sessionId } = req.body;
  const token = req.headers.authorization;
  console.log("Authorization Header:", req.headers.authorization);
  console.log("Token:", token);
  console.log("Session ID:", sessionId);
  console.log(`session contains : ${req.session}`);

  try {
    // Validate the student's token
    const student = await Student.findOne({
      token: "1ac1bdbc-190a-42d1-867c-48869aa7bf87",
    });
    console.log("student contains", student);
    console.log("req body contains", req.body);

    if (!student) {
      return res.status(401).json({ error: "Invalid token for book session" });
    }

    console.log("this line is passed");

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: "Invalid session ID format" });
    }

    // Fetch the session from the database and update it with the student's name
    console.log("findById is started");
    const session = await Session.findById(sessionId);

    // // Fetch the session from the database and update it with the student's name
    // console.log("findby id is started");
    // const session = await Session.findById(sessionId);
    console.log("Fetched Session:", session);
    if (!session || session.student !== null) {
      return res
        .status(400)
        .json({ error: "Invalid session ID or slot already booked" });
    }

    session.student = student._id;
    await session.save();

    return res.json({ message: "Slot booked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server error ${err.message}` });
  }
};

exports.pendingSessionsAll = async (req, res) => {
  const { token } = req.headers;

  try {
    // Validate the dean's token
    const dean = await Dean.findOne({ token });

    if (!dean) {
      return res
        .status(401)
        .json({ error: "Invalid token for pending session All" });
    }

    // Fetch all pending sessions from the database based on deanAvailability
    // For simplicity, we'll return a mock response
    const pendingSessionsAll = [
      { student: "A", date: "2023-07-27", time: "10:00 AM" },
      { student: "B", date: "2023-07-27", time: "11:00 AM" },
      // Add more pending sessions here
    ];

    return res.json({ pendingSessionsAll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.pendingSessionsAfterA = async (req, res) => {
  const { token } = req.headers;

  try {
    // Validate the dean's token
    const dean = await Dean.findOne({ token });

    if (!dean) {
      return res
        .status(401)
        .json({ error: "Invalid token pending session after A" });
    }

    // Fetch sessions from the database based on the current time and deanAvailability
    // For simplicity, we'll return a mock response
    const pendingSessionsAfterA = [
      { student: "B", date: "2023-07-27", time: "11:00 AM" },
      // Add more pending sessions here
    ];

    return res.json({ pendingSessionsAfterA });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
