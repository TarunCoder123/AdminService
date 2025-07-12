const client=require('../db/client');

const create=async ({adminId,name,address,price,lat,long})=>{
    const result=await client.query(`INSERT INTO property_details (adminId,name,address,price,lat,long) VALUES ($1 $2 $3 $4 $5 $6) RETURNING *`,[adminId,name,address,price,lat,long]);
    console.log(result,"result for create");
    return result.rows[0];
};

const findAll=async (filters)=>{
    let base=`SELECT * FROM property_details WHERE 1=1`;
    const values=[];
    Object.entries(filters).forEach(([key,val],i)=>{
        values.push(val);
        base+= `AND ${key}=$${i+1}`;
    });
    return (await client.query(base,values)).rows;
};

const findById=(id)=>{
    return (await.client.query(`SELECT * FROM property_details where property_id=$1`,[id])).rows[0];
};

const findByAdminId=(adminId)=>{
    return (await.client.query(`SELECT * FROM property_details where admin_id=$1`,[id])).rows;
};

const updateByAdmin=async ({adminId,propertyId,data})=>{
    const setString=Object.keys(data).map((k,i)=>`${k}=$${i+1}`).join(',');
    const values=[...Object.values(data),adminId,propertyId];
    const query=`UPDATE property_details SET ${setString} where admin_id = $${values.length-1} AND property_id=$${values.length} RETURNING *`;
    const res=await client.query(query,values);
    return res.rows[0];
};

module.exports={updateByAdmin,findAll,findByAdminId,findById,create}
