const express = require('express');
const router = express.Router();
const authMiddle = require("../middlewares/auth");
const feedModel = require('../models/feeds');
const userModel = require('../models/users');
const multer = require('multer');
const path = require('path');

let stroage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/image');
  },
  filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    callback(null, basename + "-" + Date.now() + extension);
  }
});
let upload = multer({ storage: stroage }).fields([{ name: 'picture', maxCount: 1 }]);

// 전체 피드 조회 (내꺼 + 친구꺼)
router.get('/', authMiddle, function (req, res, next) {
  const id = req.decodedToken.sub;

  feedModel.getFeeds(id)
    .then((result) => {
      console.log(result[0]);
      if (result) {
        res.json({ message: 'ok', data: result });
      } else {
        res.status(500).json({
          error: { message: 'fail' }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: { message: err.message }
      });
    })
});

router.get('/writer/:id', (req, res, next) => {
  const id = req.params.id;

  feedModel.getFeed(id)
    .then((result) => {
      console.log(result[0]);
      if (result) {
        res.json({ message: 'ok', data: result });
      } else {
        res.status(500).json({
          error: { message: 'fail' }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: { message: err.message }
      });
    })
})

router.post('/', [authMiddle, upload], (req, res, next) => {
  const id = req.decodedToken.sub;
  const fileName = req.files['picture'][0].filename;

  const feed = {
    writer: id,
    comment: req.body.comment,
    picture: fileName
  };
  console.log(feed);

  feedModel.addFeed(feed)
    .then((result) => {
      if (result.affectedRows === 1) {
        res.json({
          message: "ok"
        })
      }
      else {
        res.status(500).json({ message: 'fail' })
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: { message: err.message }
      });
    });
});

router.post('/:id/like', authMiddle, (req, res, next) => {
  const userId = req.decodedToken.sub;
  const feedId = req.params.id;
  console.log('userId: ',userId);
  console.log('feedId: ',feedId);
  //getFeedId 해서 feedId가 있는지 없는지 판단해야함.

  feedModel.getLike(userId, feedId)
    .then((result) => {
      console.log('result.length',result.length);
      if (result.length == 1) {
        const likeId = result[0].id
        let datas = {
          likeId : likeId,
          modify : '-'
        }

        userModel.modifyFeedPoint(datas)
        .then((result) => {
          if(result.affectedRows > 0)
          {
            feedModel.deleteLike(likeId)
              .then((result) => {
                if(result){
                  res.json({
                    message: "ok, like canceled"
                  })
                }else{
                  res.status(403).json({ 
                    message: "error",
                  })
                }
              })
          }
          else{
            res.status(403).json({ 
              message: "likeId is not defined",
            })
          }
        }).catch((err) => {
          res.status(500).json({
            error: { message: err.message }
          });
        })    
        

      } else {
        feedModel.addLike(userId, feedId)
          .then(() => {
            let datas = {
              sender: userId,
              feedId: feedId,
              modify: '+',
            }
            console.log('datas: ',datas);
            userModel.modifyFeedPoint(datas)
            .then((result) => {
              if(result.affectedRows > 0)
              {
                res.json({
                  message: "ok, like"
                })
              }
              else{
                res.status(403).json({ 
                  message: "feedId is not defined",
                })
              }
            })
          })
          .catch((err) => {
            res.status(500).json({
              error: { message: err.message }
            });
          })
      }

    })
    .catch((err) => {
      res.status(500).json({
        error: { message: err.message }
      });
    });
});

router.delete('/:id', authMiddle, (req, res, next) => {
  const userId = req.decodedToken.sub;
  const FeedId = req.params.id;

  feedModel.deleteFeed(userId, FeedId)
    .then(() => {
      res.json({
        message: "ok, feed deleted"
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: { message: err.message }
      })
    })
})

module.exports = router;