const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSingIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// //register
// const registerController = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     //validation
//     if (!name) {
//       return res.status(400).send({
//         success: false,
//         message: "name is required",
//       });
//     }
//     if (!email) {
//       return res.status(400).send({
//         success: false,
//         message: "email is required",
//       });
//     }
//     if (!password || password.length < 6) {
//       return res.status(400).send({
//         success: false,
//         message: "password is required and 6 character long",
//       });
//     }
//     //exisiting user
//     const exisitingUser = await userModel.findOne({ email });
//     if (exisitingUser) {
//       return res.status(500).send({
//         success: false,
//         message: "User Already Register With This EMail",
//       });
//     }
//     //hashed pasword
//     const hashedPassword = await hashPassword(password);

//     //save user
//     const user = await userModel({
//       name,
//       email,
//       password: hashedPassword,
//     }).save();
//     user.password = undefined;

//     return res.status(201).send({
//       success: true,
//       message: "Registeration Successfull please login",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       }
//     });




//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in Register API",
//       error,
//     });
//   }
// };
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({  // ✅ Changed from 500 to 409
        success: false,
        message: "User already registered with this email",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save user to database
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    // Remove password from response
    user.password = undefined;

    // No token generation required since the message says "please login"
    return res.status(201).send({
      success: true,
      message: "Registration successful! Please login.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error in Register API:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,  // Send only the message to avoid exposing sensitive info
    });
  }
};




//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email Or Password",
      });
    }
    // find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid usrname or password",
      });
    }
    //TOKEN JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // undeinfed password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};

//update user
const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    //user find
    const user = await userModel.findOne({ email });
    //password validate
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 character long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //updated useer
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated Please Login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In User Update Api",
      error,
    });
  }
};

module.exports = {
  requireSingIn,
  registerController,
  loginController,
  updateUserController,
};
