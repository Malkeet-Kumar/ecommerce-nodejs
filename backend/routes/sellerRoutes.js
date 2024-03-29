const {
    sellerLogin,
    sellerSignUp,
    getSellerProducts,
    addProduct,
    deleteProduct,
    getSellerOrders,
    dispatchOrder,
    acceptOrder,
    updateProductSeller,
    getReport
} = require('../controllers/sellerControllers');
const jwt = require("jsonwebtoken")

const auth = async(req, res, next) => {
    if (req.headers.authorization) {
        try {
            const token = await jwt.verify(req.headers.authorization,process.env.JWTKEY)
            if(token?.seller?.isSeller)
                next()
        } catch (error) {
            res.status(401).send(error)
        }
    } else {
        res.status(401).end()
    }
}

const sellerRoutes = require('express')();

sellerRoutes.post("/login", sellerLogin)

sellerRoutes.post("/signup", sellerSignUp)

sellerRoutes.use("/inventory", auth)
sellerRoutes.route("/inventory")
    .get(getSellerProducts)
    .post(addProduct)
    .delete(deleteProduct)
    .patch(updateProductSeller)
    .put(updateProductSeller)

sellerRoutes.use("/orders", auth)
sellerRoutes.route("/orders")
    .get(getSellerOrders)
    .post(acceptOrder)
    .patch(dispatchOrder)

sellerRoutes.use("/reports",auth)
sellerRoutes.route("/reports")
.get(getReport)


module.exports = sellerRoutes