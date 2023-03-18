
// Dashboard Routes
// This is a set of routes that will be used to render the dashboard pages.
// All of these routes will be protected by the withAuth middleware function.

const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// TODO - create logic for the GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
        },
      });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("admin-all-posts", { layout: "dashboard", posts });
  } catch (err) {
    res.status(500).json(err);
  }

  // TODO - retrieve all posts from the database for the logged in user
  // render the dashboard template with the posts retrieved from the database
  //default layout is set to main.handlebars, layout need to be changed to dashboard to use dashboard.handlebars
  res.render("admin-all-posts", { layout: "dashboard" });
  // refer to admin-all-posts.handlebars write the code to display the posts
});

// TODO - create logic for the GET route for /new that renders the new post page
// It should display a form for creating a new post
router.get("/new", withAuth, async (req, res) => {
  try {
    res.render("admin-new-post", { layout: "dashboard" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO - create logic for the GET route for /edit/:id that renders the edit post page
// It should display a form for editing an existing post

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render("admin-edit-post", { layout: "dashboard", post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

