const router = require("express").Router();
const { controller } = require("../controller");

const {
  createPost,
  getPost,
  searchPosts
} = require("../../service/post/index");

router.post("/create", (req, res) => {
  controller(res)(createPost)({
    uid: req.uid,
    content: req.body.content,
    image: req.body.image
  });
});

router.post("/get_posts", (req, res) =>
  controller(res)(getPost)(req.body["ids"])
);

router.get("/search/:query", (req, res) =>
  controller(res)(searchPosts)(req.params["query"])
);

module.exports.postController = () => router;
