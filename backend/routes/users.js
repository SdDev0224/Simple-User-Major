var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.User.create({
    firstname: 'dummy',
    lastname: 'dummy',
    birthday: '1900-1-1'
  }).then(function() {
    res.json({
      'success':true
    });
  });
});

router.post('/update', function(req, res) {
  models.User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    },
    { where: { id: req.body.userid } 
  }).then((result) => {
    res.json({
      'success':true
    });
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.json({
      'success':true
    });
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.create({
    title: 'dummy task',
    overview: 'This is a dummy task',
    UserId: req.params.user_id
  }).then(function() {
    res.json({
      'success':true
    });
  });
});

router.post('/:user_id/tasks/update', function (req, res) {
  models.Task.update({
    title: req.body.title,
    overview: req.body.overview
  },{ where: { id: req.body.taskid } 
  }).then(function() {
    res.json({
      'success':true
    });
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    res.json({
      'success':true
    });
  });
});


module.exports = router;
