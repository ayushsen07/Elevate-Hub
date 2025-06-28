const express = require('express');
const serviceController = require("../contollers/service.controller");
const asyncHandler = require("../helper/asyncHandler");
const validate = require("../midlewares/validate");
const authMiddleware = require("../midlewares/auth")
const router = express.Router();
const {createServiceSchema} = require('../validation/service.validation')
router.post("/", validate(createServiceSchema), authMiddleware.protect,
    authMiddleware.restricTo("mentor"),
    asyncHandler(serviceController.createService))

router.put("/:serviceId",validate(createServiceSchema), authMiddleware.protect,
    authMiddleware.restricTo("mentor"),
    asyncHandler(serviceController.updateService))

router.get("/",authMiddleware.protect,
    authMiddleware.restricTo("mentor"),
    asyncHandler(serviceController.getServiceByMentor))

router.get("/:serviceId", authMiddleware.protect,
    authMiddleware.restricTo("mentor"),
    asyncHandler(serviceController.getServiceById));


module.exports = router;

