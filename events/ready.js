module.exports = async (client) => {
  console.log(`[API] Logged in as ${client.user.username}`);
  await client.user.setActivity("BOKEP", {
    type: "STREAMING",//can be LISTENING, WATCHING, PLAYING, STREAMING
  });
};
