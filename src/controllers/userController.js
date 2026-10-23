import Joi from "joi";
import pool from "../config/db.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt"

const USERS = [
  {
    id: 1,
    name: "Reza",
    email: "admin@gmail.com",
    password: "12345678",
  },
  {
    id: 2,
    name: "Tri",
    email: "info@gmail.com",
    password: "12345678",
  },
  {
    id: 3,
    name: "Ratna",
    email: "ratna@gmail.com",
    password: "12345678",
  },
];

//CRUD create read update delete

//read, nampilin smua data
export const getAllUser = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select:{
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true
      },
      orderBy: {id:"desc"}
    })
    // const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
    return res.status(200).json({
      status: true,
      message: "Fetch user success",
      total: users.length,
      data: users, //klo statis, USERS
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Fail Fetch User",
      error: error.message,
    });
  }
};


//read 1

export const getUserById = async (req, res) => {
  try {
  const id = parseInt(req.params.id);
  const user = await prisma.users.findUnique({
    where: {id: id}
  })
  // const [user] = await pool.query("SELECT id, name, email, is_active FROM users WHERE id=?", [id]);
  // if (user.length === 0) {
  //   return res.status(404).json({
  //     status: false,
  //     message: "no data",
  //   });

  // }
    return res.status(200).json({
      status: true,
      message: "User found",
      data: user
    })
} catch(error) {
  return res.status(500).json({
    status: false,
    message: "Fail fetch users",
    error: error.message
  })
}
}

//create
export const createUser = async(req, res) => {
  const { name, email, password } = req.body; //masing2 body jd objek
  // const name = req.body.name //harusnya ini klo gk di destruct
  //const email = req.body.email
  //pilot adalah inputan orang

  try {
    const user = await prisma.users.create({
      data:{
        name,
        email,
        password
      },
      select:{
        id: true,
        name: true,
        email:true
      }
    })
    // const [user] =  await pool.query("INSERT INTO users(name, email, password) VALUES(?,?,?)",[name, email, password])

    return res.status(201).json({
        status: true,
        message: "Create user success",
        // data: {id: user.insertId, name, email}, ini klo pake pool
        data: user
    }); //utk bikin data baru, status 201 bukan 200
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Create user failed",
      error: error.message,
    });
  }
};

//update
export const updateUser = async(req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  let update = ""

  const dataUpdate={}
  if(email) dataUpdate.email=email
  if(name) dataUpdate.name=name
  if(password){
    dataUpdate.password = await bcrypt.hash(password,10)
  }
  try {

      const user = await prisma.users.update({
        where: {id:id},
        data: dataUpdate,
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true
        }
      })
      // await pool.query("UPDATE users SET name=?, email=?, is_active=? WHERE id=?", [name, email, password, is_active, id]);
      return res.status(200).json({
        status: true,
        message: "Update user success",
        data: user
      });  

      // await pool.query("UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?", [name, email, password, is_active, id])
    

    // const [data] = await pool.query(`SELECT * FROM users WHERE id=?`, [id])
    
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Create user failed",
      error: error.message,
    });
  }
}

//   USERS[userIndex] = {
//     ...USERS[userIndex],
//     ...(name && { name }), //name yg di kiri itu namenya users yg di tabel, yg di kanan itu inputan user
//     ...(email && { email }),
//     ...(password && { password }),
//   };

//   return res.status(200).json({
//     status: true,
//     message: "Update user success",
//     data: USERS[userIndex],
//   });
// };

export const deleteUser = async(req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.users.delete({
      where: {id:id}
    })
    // await pool.query("DELETE FROM users WHERE id=?", [id]);

    return res.status(200).json({
      status: true,
      message: "Delete Successful",
    });
  } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Delete user failed",
        error: error.message,
      });
  }
}
  
  // const userIndex = USERS.findIndex((u) => u.id === id);

  // if (userIndex === -1) {
  //   return res.status(404).json({
  //     status: false,
  //     message: "User not found",
  //   });
  // }

  // const deletedUser = USERS.splice(userIndex, 1)[0];
  // return res.status(200).json({
  //   status: true,
  //   message: "Delete user success",
  // });
