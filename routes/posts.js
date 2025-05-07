const express = require("express")
const router = express.Router()
const db = require("../db") // Assume this is your database connection

// Increment view count for a post
router.post("/:postId/increment-view", async (req, res) => {
    const { postId } = req.params
    try {
        await db.query("UPDATE posts SET views = views + 1 WHERE id = $1", [
            postId,
        ])
        res.status(200).send({ message: "View count incremented" })
    } catch (error) {
        console.error("Error incrementing view count:", error)
        res.status(500).send({ error: "Failed to increment view count" })
    }
})

module.exports = router
