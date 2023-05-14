import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'root',
  database: 'likeme',
  allowExitOnIdle: true,
});

export const getPosts = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows;
  } catch (queryError) {
    console.error(`The was an error doing query to bd: ${queryError}`);
  }
};

export const newPost = async (title, img, description, likes) => {
  try {
    const insertValues = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)';
    const values = [title, img, description, likes];
    await pool.query(insertValues, values);
    console.log('New post added successfully');
  } catch (postError) {
    console.error(`There was an error posting new post: ${postError}`);
  }
};
