const express = require('express');
const router = express.Router();
const exerciseGET = require('../../controllers/exercise/exerciseGET');
const exercisePOST = require('../../controllers/exercise/exercisePOST');
const recentExerciseGET = require('../../controllers/exercise/recentExerciseGET');  // 추가된 부분


router.get('/', function(_req, res, _next) {
    res.render('exercise/exercise');
  });

// 운동 기록 저장
router.post('/save', exercisePOST);

// 특정 날짜의 운동 기록 조회
router.get('/:date', exerciseGET);

// 운동 기록 삭제
//router.delete('/:id', exerciseGET.deleteExercise);

// 최근 5일간의 운동 기록 조회 (새로 추가된 부분)
router.get('/recent', recentExerciseGET);

module.exports = router;