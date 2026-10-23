import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import prisma from "../config/prisma.js";

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
export const login = async (req, res) => {
  const { email, password } = req.body;

  // if (!email || !password) {
  //   res.status(400).json({
  //     //status 4: eror browser
  //     //5: server eror / data base (eror query)
  //     //2: sukses
  //     status: false,
  //     message: "Email and password is required",
  //   });
  // } dikomen krn ud pake validasi Joi

  //find()
  //   const user = USERS.find((u) => u.email === email && u.password === password);

  try {
    const user = await prisma.users.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid credential",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credential", //401:unauthorized /login gagal
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        nama: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1D" },
    );

    res.status(200).json({
      status: true,
      message: "Login success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }

  // const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email =?", [email]);
  // email unik

  // if (user.length === 0) {
  //   return res.status(401).json({
  //     status: false,
  //     message: "Invalid credential",
  //   });
  // }

  //     const dataUser = user[0];
  //     // const isMatch = await bcrypt.compare(password, dataUser.password);

  //   if (!isMatch) {
  //     return res.status(401).json({
  //       status: false,
  //       message: "Invalid credential", //401:unauthorized /login gagal
  //     });
  //   }

  // const token = jwt.sign(
  //     {
  //     id: user.id,
  //     nama: user.name,
  //     email: dataUser.email,
  //     },
  //     process.env.JWT_SECRET,
  //     {expiresIn: process.env.JWT_EXPIRES_IN || '1D'},

  // )

  //   res.status(200).json({
  //     status: true,
  //     message: "Login success",
  //     data: {
  //       user: {
  //         id: dataUser.id,
  //         name: dataUser.name,
  //         email: dataUser.email,
  //       },
  //       token,
  //     },
  //   });
};

export const me = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });
    // const [rows] = await pool.query("SELECT id, name, email FROM users WHERE id=?", [userId])
    return res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
