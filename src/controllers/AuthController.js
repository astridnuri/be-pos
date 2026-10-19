import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import pool from "../config/db.js";

// data awalan yang tampil
const USERS = [
  {
    nama: "Reza",
    email: "admin@gmail.com",
    password: "12345678",
  },
  {
    nama: "Tri",
    email: "info@gmail.com",
    password: "12345678",
  },
];

//bs juga export default login
export const login = async(req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    res.status(400).json({
      //status 4: eror browser
      //5: server eror / data base (eror query)
      //2: sukses
      status: false,
      message: "Email and password is required",
    });
  }

  //find()
//   const user = USERS.find((u) => u.email === email && u.password === password);

const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email =?", [email])
// email unik 

  if (user.length === 0) {
    return res.status(401).json({
        status: false,
        message: "Invalid credential"
    })
  }

    const dataUser = user[0];
    const isMatch = await bcrypt.compare(password, dataUser.password);

  if (!isMatch) {
    return res.status(401).json({
      status: false,
      message: "Invalid credential", //401:unauthorized /login gagal
    });
  }

const token = jwt.sign(
    {
    id: dataUser.id,
    nama: dataUser.name,
    email: dataUser.email,
    }, 
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN || '1D'},

)

  res.status(200).json({
    status: true,
    message: "Login success",
    data: {
      user: {
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
      },
      token,
    },
  });
};
