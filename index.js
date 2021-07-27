require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const BlogSchema = require('./models/models');
const blogModel = mongoose.model('blogs', BlogSchema);

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log(err));

// Create a DB example
// const Blogs = mongoose.model('blogs', { title: String });
// const july = new Blogs({ title: 'MERN' });
// july.save().then((res) => {
//   console.log(res);
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // get anything, load index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.post('/newBlog', (req, res) => {
  let blog = new blogModel(req.body);
  blog.save((err, blogModel) => {
    if (err) {
      res.send(err);
    } else {
      res.json(blog);
    }
  });
});

let getAllBlogs = (req, res) => {
  blogModel.find({}, (err, blogs) => {
    if (err) {
      res.send(err);
    } else {
      res.json(blogs);
    }
  });
};

app.get('/allBlogs', getAllBlogs);

let getBlogID = (req, res) => {
  blogModel.findById(req.params.blogId, (err, blog) => {
    if (err) {
      res.send(err);
    } else {
      res.json(blog);
    }
  });
};
app.get('/blog/:blogId', getBlogID);

let updateBlog = (req, res) => {
  blogModel.findOneAndUpdate(
    { _id: req.params.blogId },
    req.body,
    { new: true },
    (err, updateBlog) => {
      if (err) {
        res.send(err);
      } else {
        res.json(updateBlog);
      }
    }
  );
};

app.put('/blog/:blogId', updateBlog);

let deleteBlog = (req, res) => {
  blogModel.deleteOne({ _id: req.params.blogId }, (err, blog) => {
    if (err) {
      res.send(err);
    } else {
      console.log(blog);
      res.json({ message: `Blog Deleted Successfully` });
    }
  });
};

app.delete('/blog/:blogId', deleteBlog);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// prod false bcz  it will not run build script if its in prod, once its done it will be in prod

// login heroku , create new app
