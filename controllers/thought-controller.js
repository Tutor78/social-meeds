const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // get one thought by it's id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is no thought with that id!' });
                    return;
                }

                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
            })
            .catch(err => res.json(err));
    },

    // update thought
    updateThough({ params, body }, res) {
        Though.findOnAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            .then(dbThoughData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is no thought with that id!' });
                    return;
                }

                res.json(dbThoughData);
            })
            .catch(err => res.status(400).json(err));
    },
    
    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is no thought with that id!' });
                    return;
                }

                res.json(true);
            })
            .catch(err => ers.status(400).json(err));
    }
}