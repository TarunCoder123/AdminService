const createPropertyTable = async (client) => {
    await client.query(`
      CREATE TABLE IF NOT EXISTS property_details (
        property_id BIGSERIAL PRIMARY KEY,
        property_name VARCHAR(100) NOT NULL,
        address VARCHAR(255) NOT NULL,
        price price NUMERIC(12, 2) NOT NULL,
        lat VARCHAR(20) NOT NULL,
        long VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT FALSE,
        is_deleted BOOLEAN DEFAULT FALSE,
        admin_id BIGINT REFERENCES admin_details(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  };
  
  module.exports = { createPropertyTable };
  