
// Import required packages
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");  // for database connectivity

// Create server
const app = express();

// Middleware
app.use(cors()); // allows frontend to talk to backend
app.use(express.json()); // parses JSON data


// ----------------------- Connect DB ----------------------
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// ------------- Create Schema (Structure) ------------
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    status: {
        type: String,
        enum: ["read", "unread"],
        default: "unread"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Message", messageSchema);

// this how data will be sorted into this schema
// {
//   "name": "Gulnaaz",
//   "email": "test@gmail.com",
//   "subject": "Hello",
//   "message": "Nice portfolio",
//   "createdAt": "2026-03-25T10:30:00Z"
// }



const rateLimit = require("express-rate-limit");

// Create limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 requests per IP
    message: {
        success: false,
        message: "Too many requests, please try again later."
    }
});

// Apply to your route
app.use("/send", limiter);

// Route to send email and insert data inot DB
app.post("/send", async (req, res) => {


    function sanitize(input) {
        if (!input) return "";
        return input.replace(/<[^>]*>?/gm, "").trim();
    }

    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const subject = sanitize(req.body.subject);
    const message = sanitize(req.body.message);
    const company = sanitize(req.body.company);

    if (company) {
        return res.json({ success: false });
    }

    // Save to database
    await Message.create({
        name,
        email,
        subject,
        message
    });
    // console.log("Saved to DB");

    try {
        // Setup transporter (email sender)
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
                // use app password 
                // app name is 'Portfolio App'
                // do not use your real password
            }

        });

        // Email structure
        let mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ success: true });

    } catch (error) {
        console.log(error);
        // res.json({ success: false });
        res.json({
            success: false,
            message: "Failed to send email. Please try again."
        });

    }
});


// ---------------- Route to get all messages ----------------
app.get("/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: messages
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to fetch messages"
        });
    }
});


// ---------------- Route to delete message by ID ------------------
app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deletedMessage = await Message.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message: "Message deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error deleting message"
        });
    }
});


// -------------------   Delete all messages   -----------------
app.delete("/delete-all", async (req, res) => {
    try {
        const result = await Message.deleteMany({});

        res.json({
            success: true,
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error deleting all messages"
        });
    }
});


// --------------------- Toggle read/unread status -----------------
app.put("/toggle/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const message = await Message.findById(id);

        if (!message) {
            return res.json({
                success: false,
                message: "Message not found"
            });
        }

        // Toggle logic
        message.status = message.status === "read" ? "unread" : "read";

        await message.save();

        res.json({
            success: true,
            newStatus: message.status
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error updating status"
        });
    }
});


// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});