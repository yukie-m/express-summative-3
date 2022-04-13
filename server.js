const express = require('express');

const cors = require('cors');

const Events = require('./models/events');
const Comments = require('./models/comments');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// leave until later

require('./connection');

app.use(cors());

// app to use api routes

const router = express.Router();

app.use('/api', router);

////////////////////////ALL ROUTES

router.get('/view-events', function (req, res) {
	Events.find().then((response) => {
		res.json(response);
	});
});

router.get('/view-event-by-id/:id', function (req, res) {
	Events.findOne({ _id: req.params.id })
		// .populate("comments")
		.then((response) => {
			res.json(response);
		});
});
router.get('/view-event-by-category/:category', function (req, res) {
	console.log('>>>>>>>>> ', req.params.category);

	Events.find()
		.where('category')
		.equals(req.params.category)
		.then((response) => {
			res.json(response);
		});
});

// add like
router.patch('/add-like/:id', function (req, res) {
	let action = req.body.action;
	let counter = action == 'up' ? 1 : -1;

	Events.findByIdAndUpdate(req.params.id, { $inc: { likes: counter } }, { new: true })
		.then((response) => {
			console.log(response);
			res.json(response);
		})
		.catch((error) => {
			res.json({ success: false, error: error });
		});
});

router.delete('/delete-event-by-id/:id', function (req, res) {
	Events.deleteOne({ _id: req.params.id })
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			// if nothing deleted update the app/user
			return res.json({ deletedCount: 0 });
		});
});

// CREATE new event
router.post('/create-event', function (req, res) {
	var newEvent = new Events();
	var theFormData = req.body;
	console.log('>>> ', theFormData);

	Object.assign(newEvent, theFormData);

	newEvent
		.save()
		.then((response) => {
			return res.json(response);
		})
		.catch((err) => {
			// if there was an error return it to the app/user
			return res.json({ error: true, error_type: err });
		});
});

// CREATE new comment
router.post('/create-comment/:id', function (req, res) {
	let comment = new Comments();
	let formData = req.body;
	console.log('>>> ', formData);

	Object.assign(comment, formData);

	Events.updateOne(
		{ _id: req.params.id },
		{
			$push: { comments: comment },
			$currentDate: { lastModified: true },
		}
	)
		.then((response) => {
			return res.json(response);
		})
		.catch((err) => {
			// if there was an error return it to the app/user
			return res.json({ error: true, error_type: err });
		});
});

// end CREATE new writer

router.get('/view-event-by-name/:name', function (req, res) {
	console.log(req.params.name);

	Events.findOne({ name: req.params.name }).then((response) => {
		res.json(response);
	});
});

// update
// find an existing event using _id - then merge with form data
router.put('/update-event/:id', (req, res) => {
	Events.findOne({ _id: req.params.id }, function (err, objFromMongoDB) {
		var data = req.body;

		if (err) {
			return res.json({ result: false });
		}

		Object.assign(objFromMongoDB, data);
		objFromMongoDB.save().then((response) => {
			res.json({
				result: response,
			});
		});
	});
});

//end update

// catch bad endpoints on the api route only
router.get('/*', (req, res) => {
	return res.json({ result: 'hey, no hacking please....' });
});

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Phew!, listening on port ${PORT}`);
});
