const clientId = "e99b04271c7c498f8d9ec7af349f81c0";
const clientSecret = "0b06a90252144b51b42b8e76b8bfe15d";

const getSpotifyToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

export default getSpotifyToken;
