const { Router } = require("express");
const router = Router();

const {
  addUser,
  getUsers,
  getUserById,
  loginUser,
  updateUser,
  deleteUserById,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUserById);
router.post("/login", loginUser);

module.exports = router;
