const uuid = require("uuid");
const Student = require("../models/student");
const Dean = require("../models/dean");


exports.authenticateStudent = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    console.log("Authorization Header:", authorizationHeader);
  
    // Check if the Authorization header is present
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token for book session" });
    }
  
    // Extract the token from the Authorization header
    const token = authorizationHeader.replace("Bearer ", "").trim();
  
    try {
      // Validate the student's token
      const student = await Student.findOne({ token });
  
      if (!student) {
        return res.status(401).json({ error: "Invalid token for book session" });
      }
  
      // Attach the student object to the request for later use
      req.student = student;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  
  
  

exports.checkToken = async (req, res) => {
  const token = req.headers.authorization;
  console.log("Received Token:", token);

  try {
    // Validate the student's token
    const student = await Student.findOne({ token });

    if (!student) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.json({ message: "Token is valid", student });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
  
};



exports.studentLogin = async (req, res) => {
    const { universityID, password } = req.body;
  
    try {
      const student = await Student.findOne({ universityID, password });
  
      if (!student) {
        console.log(`Invalid login attempt for universityID: ${universityID}`);
        return res.status(401).json({
          error:
            "Invalid credentials. Please check your university ID and password.",
        });
      }
  
      // Generate a UUID token for the student
      const token = uuid.v4();
  
      console.log("Generated Token:", token);
  
      // Save the token to the student record in the database (optional step)
      student.token = token;
      await student.save();
  
      console.log("Student after Saving Token:", student);
  
      return res.json({ message: "Login successful", token });
    } catch (err) {
      console.error("Error during student login:", err);
      res
        .status(500)
        .json({ error: "Internal server error. Please try again later." });
    }
  };
  

exports.deanLogin = async (req, res) => {
  const { universityID, password } = req.body;

  try {
    const dean = await Dean.findOne({ universityID, password });

    if (!dean) {
      console.log(
        `Invalid login attempt for dean with universityID: ${universityID}`
      );
      return res
        .status(401)
        .json({
          error:
            "Invalid credentials. Please check your university ID and password.",
        });
    }

    // Generate a UUID token for the dean
    const token = uuid.v4();

    // Save the token to the dean record in the database (optional step)
    dean.token = token;
    await dean.save();

    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during dean login:", err);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};
