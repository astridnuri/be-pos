import pool from "../config/db.js"

//get all data
export const getAllCategories = async(req,res) => {
    try {
        const [categories] = await pool.query("SELECT * FROM categories ORDER BY id DESC")
        return res.status(200).json({
            status: true,
            total: categories.length,
            data: categories
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

// get 1 data
export const getCategoryById = async (req, res) => {
    
    try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            status: false,
            message: "not a number"
        })
    }
    const [category] = await pool.query("SELECT * FROM categories WHERE id=?", [id]);
    if (category.length === 0) {
        return res.status(404).json({
            status: false,
            message: "no data"
        })
    }
    return res.status(200).json({
        status: true,
        data: category
    })
  } catch (error) {
    return res.status(500).json({
        status: false,
        message: error.message
    })
  }
}

//create
export const createCategory = async(req, res) => {
try {
    const {name} = req.body //harusnya ini klo gk di destruct
    //const email = req.body.email
    //pilot adalah inputan orang
    if (!name) {
        return res.status(400).json({
            status: false,
            message: "Name is required"
        })
    }
    const [category] =  await pool.query("INSERT INTO categories (name) VALUES(?)",[name])
    return res.status(201).json({
        status: true,
        message: "Create category success",
        data: category,
    }); //utk bikin data baru, status 201 bukan 200
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
            status:false,
            message:"Category already exists"
        })
    }
    return res.status(500).json({
      status: false,
      message: "Create user failed",
    });
  }
};

//update
export const updateCategory = async(req, res) => {
try {
  const id = parseInt(req.params.id);
  const { name } = req.body;
//   if (isNaN(id)) {
//     return res.status(400).json({
//         status: false,
//         message: "Not a number"
//     })
//   }
    const category = await pool.query("UPDATE categories SET name=? WHERE id=?", [name, id]);
    if (category.length === 0) {
        return res.status(404).json({
            status: false,
            message: "Data not found"
        })
    }
    return res.status(200).json({
      status: true,
      message: "Update categories success",
    });  
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Create categories failed"
    });
  }
}
//delete