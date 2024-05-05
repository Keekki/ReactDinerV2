const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/menuitems", menuController.getAllMenuItems);
router.post("/menuitems", menuController.createMenuItem);
router.put("/menuitems/:id", menuController.updateMenuItem);
router.delete("/menuitems/:id", menuController.deleteMenuItem);
router.get("/menuitems/:id", menuController.getMenuItemById);

module.exports = router;
