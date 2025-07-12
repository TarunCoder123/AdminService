const {create, findAll, findById, findByAdminId, updateByAdmin}=require("../../helper/propertyHelper");

const createProperty=async (adminId,name,address,price,lat,long)=>{
    return await create({adminId,name,address,price,lat,long});
};

const getProperties=async (filters)=>{
   return await findAll(filters);
};

const getPropertiesById=async (propertyId)=>{
    return await findById(propertyId);
};

const getPropertiesByAdminId=async (adminId)=>{
    return await findByAdminId(adminId);
};

const updateProperty=async (adminId,propertyId,data)=>{
    return await updateByAdmin({adminId,propertyId,data});
};

module.exports={createProperty,getProperties,getPropertiesById,getPropertiesByAdminId,updateProperty}

