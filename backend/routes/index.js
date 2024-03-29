var models  = require('../models');
var express = require('express');
var router  = express.Router();
var Sequelize = require('sequelize');

router.get('/', function(req,res,next) {
  models.User.findAll({
    include: [ models.Task ],
    attributes: { include: [[Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('Tasks.id'))), 'task_count']]},
    group: ['User.id']
  }).then(function(users) {
    res.json({
      title: 'React-Express example',
      users: users
    });
  });
});

router.get('/:userid', function(req,res,next){
  models.Task.findAll({
    where: {
      userid: req.params.userid
    }
  }).then(function(tasks) {
    res.json({
      title: 'React-Express example',
      tasks: tasks
    });
  });
});

router.post('/', function(req, res) {
  const user = models.User;
  const task = models.Task;
  user.findAll({
    include: [{model: major}],
    where:  {
      '$or': {
          '$User.firstname$' : {
            like: '%' + req.body.search + '%'
          },
          '$User.lastname$' : {
            like: '%' + req.body.search + '%'
          },
          '$Tasks.title$': {
            like: '%' + req.body.search + '%'
          }
        }
    }
  }).then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    });
  });
});

module.exports = router;
