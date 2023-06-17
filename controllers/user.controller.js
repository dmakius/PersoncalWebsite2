import User from './../models/Users.js';
import bcrypt from  "bcryptjs";
import jwt from "jsonwebtoken";
const jwtSecret = 'c779d5151c977254056d21937d52d7caacc224b6c063f798f80abc2a8e5e92fa99c194';

export default class UserController{
    static async register(req, res){
        const username  = req.body.username;
        const password= req.body.password;
        console.log("Creating New User");
        if (password.length < 6) {
            return res.status(400).json({ message: "Password less than 6 characters" ,flash_type:"alert-danger"});
        }
        bcrypt.hash(password, 10).then(async (hash) => {
            await User.create({
                username,
                password: hash,
            })
            .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    //create JWT
                    { id: user._id, username},
                    jwtSecret,
                    {
                        expiresIn: maxAge, // 3hrs in sec
                    }
                    );
                console.log(token);
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                });

                res.status(201).json({
                    message: "User successfully created",
                    user: user._id,
                    flash_type:"alert-success"
                });
            })
            .catch((error) =>{
                console.log(error);
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                    flash_type:"alert-danger"
                })
            }
            );
        });
    }

    static async login (req, res) {
        const username  = req.body.username;
        const password= req.body.password;
        // Check if username and password is provided
        if (!username || !password) {
          return res.status(400).json({
            message: "Username or Password not present",
            flash_type:"alert-danger"
          })
        }
        try {
          const user = await User.findOne({ username })
          if (!user) {
            res.status(400).json({
              message: "Login not successful",
              error: "User not found",
              flash_type:"alert-danger"
            })
          } else {
            // comparing given password with hashed password
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                  const maxAge = 3 * 60 * 60;
                  const token = jwt.sign(
                    { id: user._id, username, role: user.role },
                    jwtSecret,
                    {
                      expiresIn: maxAge, // 3hrs in sec
                    }
                  );
                  console.log("token:");
                  console.log(token);
                  res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                  });
                  res.status(201).json({
                    message: "User successfully Logged in",
                    user: user._id,
                    flash_type:"alert-success"
                  });
                } else {
                  res.status(400).json({ message: "Login not succesful" ,flash_type:"alert-danger"});
                }
              });
            
          }
        } catch (error) {
          res.status(400).json({
            message: "An error occurred",
            error: error.message,
            flash_type:"alert-danger"
          })
        }
        }

        static async update(req, res){
            const { role, id } = req.body;
            // First - Verifying if role and id is presnt
            if (role && id) {
              // Second - Verifying if the value of role is admin
              if (role === "admin") {
                // Finds the user with the id
                await User.findById(id)
                  .then((user) => {
                    // Third - Verifies the user is not an admin
                    if (user.role !== "admin") {
                      user.role = role;
                      user.save((err) => {
                        //Monogodb error checker
                        if (err) {
                          res
                            .status("400")
                            .json({ message: "An error occurred", error: err.message , flash_type:"alert-danger"});
                          process.exit(1);
                        }
                        res.status("201").json({ message: "Update successful", user });
                      });
                    } else {
                      res.status(400).json({ message: "User is already an Admin" , flash_type:"alert-danger"});
                    }
                  })
                  .catch((error) => {
                    res
                      .status(400)
                      .json({ message: "An error occurred", error: error.message , flash_type:"alert-danger"});
                  });
                }
            }
        }
        
        static async logout(req, res){
          res.cookie("jwt", "", { maxAge: "1" });
          res.redirect("/");
        }

        static async deleteUser(req, res) {
            const { id } = req.body
            await User.findById(id)
              .then(user => user.remove())
              .then(user =>res.status(201).json({ message: "User successfully deleted", user }))
              .catch(error =>
                res.status(400).json({ message: "An error occurred", error: error.message })
              )
          }

}