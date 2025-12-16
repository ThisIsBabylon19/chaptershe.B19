// This is a module
export async function checkMembership(username) {
  if (!username) return;

  try {
    const res = await fetch('/.netlify/functions/checkmembers', {
      method: 'POST',
      body: JSON.stringify({ username })
    });

    const data = await res.json();
    return data; // { username, isMember, hasPaid }
  } catch (err) {
    console.error(err);
    return { username, isMember: false, error: err.message };
  }
}
