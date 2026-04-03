const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// servir le frontend
app.use(express.static(path.join(__dirname, "public")));

// servir les images
app.use("/uploads", express.static("uploads"));

// config upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// FAKE DB (temporaire)
let posts = [];

// upload
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Aucune image envoyée" });
    }

    const post = {
        caption: req.body.caption,
        image: req.file.filename
    };

    posts.unshift(post);
    res.json(post);
});

// récupérer posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// ✅ Fallback compatible Express 5
app.use((req, res) => {
    res.status(404).send("Page non trouvée");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur lancé sur http://localhost:" + PORT);
});