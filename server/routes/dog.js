const express = require("express");
const router = express.Router();
const dogController = require("../controllers/dog");

router.get("/", dogController.getDogs);
router.get("/:id", dogController.getDog);
router.post("/", dogController.postDog);
router.put("/:id", dogController.putDog);
router.patch("/:id", dogController.patchDog);
router.delete("/:id", dogController.deleteDog);

module.exports = router;