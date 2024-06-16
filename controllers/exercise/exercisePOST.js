const db = require('../../models/index');

// 운동 기록 저장
const saveExercise = async (req, res) => {
    try {
        const { evaluation, exercise_date, start_exercise_time, end_exercise_time, exercise_type, comments, user_id } = req.body;
        
        console.log(evaluation);

        console.log(exercise_date);
        console.log(start_exercise_time);
        console.log(end_exercise_time);
        console.log(exercise_type);
        console.log(comments);
        //const duration = (new Date(endTime) - new Date(startTime)) / 60000; // 시간 차이(분 단위) 계산
        console.log("저장요청");
        
        const userID = 1;

        const report = await db.exerciseReport.create({
            exercise_rate : evaluation, 
            exercise_date : exercise_date,
            start_exercise_time: start_exercise_time,
            end_exercise_time: end_exercise_time,
            exercise_type: exercise_type,
            comments: comments,
            user_id: userID 
        }); 

        // 저장된 데이터 반환
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: '운동 기록 저장 중 오류 발생', error });
    }
}

module.exports = saveExercise;

