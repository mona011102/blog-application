import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = 3000;

let posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

app.post('/new-post', (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    res.render('post', { post: post });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

