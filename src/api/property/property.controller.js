
const propertyService=require("./property.service");

const createProperty=async (req,res)=>{
    try {
        const adminId = req.user.id;
        const property = await propertyService.createProperty({
          adminId,
          ...req.body,
        });
        res.status(201).json(property);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const listAllProperty=async (req,res)=>{
    try {
        const filters = {};
        ['isActive', 'city', 'adminId'].forEach((k) => {
          if (req.query[k] !== undefined) filters[k] = req.query[k];
        });
        const props = await propertyService.getProperties(filters);
        res.json(props);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const MinePropertylist=async (req, res)=>{
    try {
      const props = await propertyService.getPropertiesByAdminId(req.user.id);
      res.json(props);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const getByPropertyId=async (req, res)=>{
    try {
      const prop = await propertyService.getPropertiesById(req.params.propertyId);
      if (!prop) return res.status(404).json({ error: 'Not found' });
      res.json(prop);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const updateProperty=async (req, res)=>{
    try {
      const updated = await propertyService.updateProperty(
        req.user.id,
        req.params.propertyId,
        req.body
      );
      if (!updated)
        return res.status(404).json({ error: 'Not found or not owned' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports={updateProperty,getByPropertyId,MinePropertylist,listAllProperty,createProperty};

