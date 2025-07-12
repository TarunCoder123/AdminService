const express=require('express');
const router=express.Router();
const authenticate=require("../auth/auth.middleware");
const propertyController=require("./property.controller");

router.post('/',auth,propertyController.createProperty);
router.get('/',auth,propertyController.listAllProperty);
router.get("/:propertyId",auth,propertyController.getByPropertyId);
router.get("/my-list",auth,propertyController.MinePropertylist);
router.put("/:propertyId",auth,propertyController.updateProperty);

module.exports=router;