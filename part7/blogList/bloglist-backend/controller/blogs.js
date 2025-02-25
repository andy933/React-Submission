const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");
const usersRouter = require("express").Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name id");
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  if (request.params.id.length !== 24) {
    return response.status(400).json({ error: "invalid id" }).end();
  }
  const blog = await Blog.findById(request.params.id).populate(
    "user",
    "username name id",
  );
  blog ? response.json(blog) : response.status(404).end();
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { title, url, likes, author } = request.body;

  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  });

  if (!(blog.title && blog.author && blog.url)) {
    return response
      .status(400)
      .json({ error: "title, author, and url are required" })
      .end();
  }
  if (!blog.likes) {
    blog.likes = 0;
  }
  await blog.populate("user", "username name id");
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.post("/:id", async (request, response) => {
  const comments = request.body.comments;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments } },
    { new: true },
  );

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.status(201).json(updatedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  const userId = request.user._id.toString();

  if (blog.user.toString() === userId) {
    const filterUserBlogs = request.user.blogs.filter(
      (b) => b._id.toString() !== id,
    );
    request.user.blogs = filterUserBlogs;
    await request.user.save();

    // findidupdate will fail, so i use .save() to update
    // const newUser = {...request.user, blogs: filterUserBlogs}
    //const updateUser = await User.findByIdAndUpdate(userId, newUser, {new: true})
    //await updateUser.save()

    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes, comments } = request.body;

  const blog = { title, author, url, likes, comments };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
