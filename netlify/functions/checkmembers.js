const { Client } = require("pg");

exports.handler = async (event) => {
  try {
    const { username } = JSON.parse(event.body || "{}");

    if (!username) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "username required" })
      };
    }

    const client = new Client({
      connectionString: process.env.NETLIFY_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const result = await client.query(
      "SELECT hasPaid FROM members WHERE username = $1",
      [username]
    );

    await client.end();

    if (result.rows.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isMember: false })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        isMember: true,
        hasPaid: result.rows[0].haspaid
      })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};