import express from "express";
const app = express();
// middlewares
app.use(express.json());
// app.get("/open-ai-chatbot", (req, res, next) => {
//     return res.send("Hello, World!");
// });
// connection and listeners
app.listen(5000, () => console.log("Server is running on port 5000"));
//# sourceMappingURL=App.js.map