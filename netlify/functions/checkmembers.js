// netlify/functions/checkmembers.js
const { Client } = require("pg");

exports.handler = async (event) => {
  try {
    const { username } = JSON.parse(event.body);
    if (!username) {
      return { statusCode: 400, body: JSON.stringify({ error: "Username required" }) };
    }

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    const res = await client.query(
      "SELECT * FROM members WHERE username = $1",
      [username]
    );

    await client.end();

    if (res.rows.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ username, isMember: false }) };
    }

    const { haspaid } = res.rows[0];
    return {
      statusCode: 200,
      body: JSON.stringify({ username, isMember: true, hasPaid: haspaid })
    };

  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
