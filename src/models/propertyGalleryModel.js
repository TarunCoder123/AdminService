const createPropertyGalleryTable = async (client) => {
    // 1. Define the enum type once
    await client.query(`
      CREATE TYPE IF NOT EXISTS picture_type AS ENUM ('normal', 'main');
    `);
  
    // 2. Create or update the gallery table
    await client.query(`
      CREATE TABLE IF NOT EXISTS property_gallery (
        property_gallery_id  BIGSERIAL PRIMARY KEY,
        property_id   VARCHAR(255) NOT NULL REFERENCES property_details(id) ON DELETE CASCADE,
        picture_type  picture_type DEFAULT 'normal',
        picture_link  VARCHAR(255) NOT NULL,
        is_active     BOOLEAN DEFAULT FALSE,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  };
  
  module.exports = { createPropertyGalleryTable };
  