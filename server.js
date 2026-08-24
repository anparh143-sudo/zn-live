const express = require("express");
const { AccessToken } = require("livekit-server-sdk");

const app = express();
app.use(express.json());

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;

app.post("/token", async (req, res) => {
    try {
        const identity = req.body.identity || "ZN_User";
        const room = req.body.room || "ZN_Live";

        const token = new AccessToken(API_KEY, API_SECRET, {
            identity: identity
        });

        token.addGrant({
            roomJoin: true,
            room: room,
            canPublish: true,
            canSubscribe: true
        });

        const jwt = await token.toJwt();

        res.json({
            token: jwt,
            room: room
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Token generation failed"
        });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("ZN Live backend running on port 3000");
});0
