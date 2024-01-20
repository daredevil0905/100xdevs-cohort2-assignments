const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db")
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username
    const password = req.headers.password

    await Admin.create({ username, password })

    res.status(200).send("Admin created successfully")
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({ title, description, imageLink, price })

    res.status(200).json({
      msg: 'Course created successfully',
      courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({})

    res.status(200).json({
      courses: courses
    })
});

module.exports = router;