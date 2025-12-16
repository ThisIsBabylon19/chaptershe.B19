const { Client } = require("pg");

exports.handler = async (event) => {
  const { username } = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const res = await client.query(
      "SELECT * FROM members WHERE username = $1",
      [username]
    );

    await client.end();

    if (res.rows.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ username, isMember: false }) };
    }

    const { haspaid } = res.rows[0]; // column names are lowercase by default
    return { statusCode: 200, body: JSON.stringify({ username, isMember: true, hasPaid: haspaid }) };

  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
