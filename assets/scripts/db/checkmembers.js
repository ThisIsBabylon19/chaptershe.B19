
export async function checkMembership(username) {
  try {
	  alert("fron assets, checking functions");
    const res = await fetch('/.netlify/functions/checkmembers', {
      method: 'POST',
      body: JSON.stringify({ username })
    });

    const data = await res.json();
    return data;

  } catch (err) {
    console.error("Fetch error:", err);
    return { username, isMember: false, error: err.message };
  }
}