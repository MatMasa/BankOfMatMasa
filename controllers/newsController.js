import newsArticle, { find, findById, findByIdAndDelete } from "../models/news";
getPostData = body => {
    return {
        heading: body.heading,
        content: body.content,
    };
};

export function create(req, res) {
    const newPost = new newsArticle(getPostData(req.body));
    newPost.save()
        .then(() => {
            req.flash("success_msg", "Posted!");
            res.redirect('/');
        })
        .catch(err => console.log(err));
}
export async function fetchAll(req, res) {
    try {
        const allNews = await find().sort('-published'); // Get all news, sort by newest first and limit output to 10
        return allNews;
    } catch (err) {
        console.log(error.message);
        return [];
    }

}
export async function getNewsManagement(req, res) {
    try {
        const allNews = await find();
        res.render('newsManagement', {
            allNews
        });
    } catch (err) {
        res.render('error', {
            code: err
        });
    }
}
export async function fetchById(req, res) {
    try {
        const newsById = await findById(req.params.id);
        res.json(newsById);
    } catch (err) {
        res.render('error', {
            code: err
        });
    }
}
export function deletePost(req, res, next) {
    findByIdAndDelete(req.params.id)
        .then(() => {
            req.flash("success_msg", "Post Deleted!");
            res.redirect('back');
            next();
        })
        .catch(error => {
            req.flash("error_msg", "Failed to delete post:" + error.message);
            console.log(`Failed to delete post: ${error.message}`);
            next();
        });
}