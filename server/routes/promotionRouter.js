const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
 
router.use(bodyParser.json());

const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');
const cors = require('./cors');

router.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors,(req,res,next) => {
      Promotion.find(req.query)
      .then((promotions) => {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json(promotions);
      }, (error) => { next( error )})
      .catch((error) => next(error))
  })
  .post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Promotion.create(req.body)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (error) => { next( error )})
    .catch((error) => next(error))
  })
  .put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
  })
  .delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Promotion.remvoe({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (error) => { next( error )})
    .catch((error) => next(error))
  });


router.route('/:promotionsId')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors,(req,res,next) => {
      Promotion.findById(req.params.promotionsId)
      .then((promotion) => {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json(promotion);
      }, (error) => {next(eror)})
      .catch((error) => next(error))
  })
  .post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promotionsId);
  })
  .put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionsId,{
      $set : req.body
    },{ new : true})
      .then((promotion) => {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json(promotion);
      }, (error) => {next(eror)})
      .catch((error) => next(error))
  })
  .delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Promotion.findByIdAndRemove(req.params.promotionsId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (error) => {next(eror)})
    .catch((error) => next(error))
  });


module.exports = router;