import pool from "../config/db.js";

//get all
export const getAllProducts = async(req, res)=> {
    try {
        const [produks] = await pool.query("SELECT *, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id=categories.id");
        return res.status(200).json({
          status: true,
          total: produks.length,
          data: produks.category_name,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
//get 1 product
export const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const [produk] = await pool.query("SELECT *, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id=categories.id WHERE products.id=?", [id]);
    return res.status(200).json({
      status: true,
      total: produk.length,
      data: produk,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
//create
//update
//delete