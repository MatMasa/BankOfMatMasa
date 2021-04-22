const newsArticle = require("../models/news");
getPostData = body => {
    return {
        heading: body.heading,
        content: body.content,
    };
};

module.exports = {
    create: (req, res) => {
        const newPost = new newsArticle(getPostData(req.body));
        newPost.save()
            .then(() => {
                req.flash("success_msg", "Posted!");
                res.redirect('/')
            })
            .catch(err => console.log(err))
    },

    fetchAll: async (req, res) => {
        try {
            const allNews = await newsArticle.find().sort('-published').limit(10) // Get all news, sort by newest first and limit output to 10
            return allNews
        } catch (err) {
            console.log(error.message);
            return [];
        }

    },

    fetchById: async (req, res) => {
        try {
            const newsById = await newsArticle.findById(req.params.id)
            res.json(newsById)
        } catch (err) {
            res.render('error', {
                code: err
            })
        }
    },



}