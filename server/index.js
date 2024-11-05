// import all necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
app.set('view engine', 'ejs');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// use to get the css
app.use(express.static('public'));

// set up cors for switching between servers
app.use(cors()); 
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
  app.use(cors(corsOptions));

// store created/existing posts
const mockPost = {
    index: 1,
    postTitle: "My First Blog",
    postAuthor: "Meaghan Freund",
    postContent: "This is my first post!!!",
    date: new Date("2024-11-04T10:00:00Z"),
};

// store posts in a list, including mock post
let existingPosts = [];
existingPosts.push(mockPost);

let users = [];

// show the main page with existing posts as JSON
app.get('/api', (req, res) => {
    res.json({ existingPosts: existingPosts });
});

// display the signup page
app.post('/api/signup', (req, res) => {
    const { name, password } = req.body;

    // check if the user is in the list already
    const existingUser = users.find(user => user.name === name);
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists, insert a new username!' });
    }

    // add the new user to the list
    users.push({ name, password });
    res.status(201).json({ message: 'Account created!' });
});

// handling the sign in page
app.post('/api/signin', (req, res) => {
    const { name, password } = req.body;

    // fetch the user from the username
    const user = users.find(user => user.name === name);

    // check if there is a matching username and password
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Account verified! Welcome!' });
});

// create a new post
app.post('/api/createPost', (req, res) => {
    const {postTitle, postAuthor, postContent} = req.body;
    // all elements of a post
    const post = {
        index: existingPosts.length + 1,
        postTitle: postTitle,
        postAuthor: postAuthor,
        postContent: postContent,
        date: new Date(),
    };
    // add post to array of existing posts
    existingPosts.push(post);
    res.json(post);
});

// get the post desired to edit
app.get('/api/editPost/:index', async (req, res) => {
    const postId = req.params.id;
    try {
      // find the post from the ID
      const post = await Post.findById(postId);

      // if the post doesnt exist
      if (!post) {
        return res.status(404).json({ message: 'Error: Post not found' });
      }
      // return the post
      res.json(post);

    // show in the case of an internal error
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// save the edits for the post for the main page
app.post('/api/editPost/:index', (req, res) => {
    // retrieve the index for the edited posts
    const editedPostIndex = existingPosts.findIndex(editedPost => editedPost.index == req.params.index);
    if (editedPostIndex !== -1) {
        // update the post with all elements
        existingPosts[editedPostIndex] = {
            index: existingPosts[editedPostIndex].index,
            postTitle: req.body.postTitle,
            postAuthor: req.body.postAuthor,
            postContent: req.body.postContent,
            date: existingPosts[editedPostIndex].date,
        };
        res.json(existingPosts[editedPostIndex]);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// delete given post at given index
app.post('/deletePost', (req, res) => {
    // get the index and remove from the post list
    const postIndex = existingPosts.findIndex(deletePost => deletePost.index == req.body.index);
    if (postIndex !== -1) {
        // take out the given post
        existingPosts.splice(postIndex, 1);
        res.json({ message: 'Post deleted successfully' }); 
    // otherwise, the post already doesnt exist
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});


// basic run server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
});
