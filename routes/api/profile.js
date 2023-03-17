const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// // @route  POST api/profile
// // @desc   Test route
// // @access Public
// router.get('/', (req, res) => res.send('profile route'))

// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  POST api/profile
// @desc   Create or update a user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
      check('endDate', 'Endding date is required').not().isEmpty(),
      check('bio', 'bio is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      company,
      status,
      skills,
      bio,
      images,
      transDate,
      endDate,
      location,
    } = req.body

    console.log(
      'The profile:',
      company,
      status,
      skills,
      bio,
      images,
      transDate,
      endDate,
      location,
    )

    // Build profile object
    const profileFields = {}

    profileFields.user = req.user.id

    if (company) profileFields.company = company
    if (status) profileFields.status = status
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }
    if (bio) profileFields.bio = bio
    if (images) profileFields.images = images

    if (transDate) profileFields.transDate = transDate

    if (endDate) profileFields.endDate = endDate

    if (location) profileFields.location = location

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        )
        return res.json(profile)
      }

      // Create new profile
      profile = new Profile(profileFields)

      await profile.save()
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route  GET api/profile
// @desc   GET all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  GET api/profile/user/:user_id
// @desc   GET all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  GET api/profile/user/:user_id
// @desc   GET profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar'])

    if (!profile) return res.status(400).json({ msg: 'Profile not found' })

    res.json(profile)
  } catch (err) {
    console.error(err.message)

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route  DELETE api/profile
// @desc   Delete profile, user & posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove users posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })
    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
router.put(
  '/experience',
  [
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
      .notEmpty()
      .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, customer, description } = req.body

    const newExp = {
      title,
      customer,
      description,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id }) //from token

      profile.experience.unshift(newExp)
      await profile.save()

      res.json(profile)
    } catch (err) {
      if (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
      }
    }
  },
)

// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete experience from profile
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id)

    profile.experience.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// @route  POST api/profile/comment/:id
// @desc   Comment on a post
// @access Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      }

      post.comments.unshift(newComment)

      await post.save()

      res.json(post.comments)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route  DELETE api/profile/comment/:id/:comment_id
// @desc   Delete comment
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Pull out comment
    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id,
    )

    // Make sure comment exists
    if (!comment) {
      res.status(404).json({ msg: 'Comment does not exist' })
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'User not authorised' })
    }

    // Get the removed index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id)

    post.comments.splice(removeIndex, 1)

    await post.save()
    res.json(post.comments)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
