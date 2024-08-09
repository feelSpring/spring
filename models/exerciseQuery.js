//시퀄라이즈 코드 작성
// models/exerciseModel.js
const db = require('./index');
const { Op } = require('sequelize'); // Sequelize Op 가져오기

const saveExercise = async (evaluation, exercise_date, start_time_hour, start_time_minute, end_time_hour, end_time_minute, exercise_type, comments, user_id) => {
    try {
        // 주어진 날짜와 사용자에 해당하는 데이터가 이미 존재하는지 확인
        const existingData = await db.exerciseReport.findOne({
            where: {
                exercise_date: exercise_date,

            }
        });

        if (existingData) {
            // 이미 존재하는 경우
            console.log('데이터가 이미 존재합니다:', existingData);
            return { error: '이미 같은 날짜의 데이터가 존재합니다.', data: existingData };
        }

        // 존재하지 않는 경우 새 데이터 생성
        const data = await db.exerciseReport.create({
            exercise_rate: evaluation,
            exercise_date: exercise_date,
            start_exercise_time: `${start_time_hour}:${start_time_minute}`,
            end_exercise_time: `${end_time_hour}:${end_time_minute}`,
            exercise_type: exercise_type,
            comments: comments,
            user_id: user_id,
        });

        console.log('새 데이터가 저장되었습니다:', data);
        return data;
    } catch (error) {
        console.error('Error in saveExercise:', error);
        throw error;
    }
};

const getExerciseByDate = async (userID, date) => {
    try {
        const data = await db.exerciseReport.findAll({
            where: {
                user_id: userID,
                exercise_date: date
            }
        });
        return data;
    } catch (error) {
        console.error('Error in getExerciseList:', error);
        throw error;
    }
};

const getExercise = async (exerciseID) => {
    try {
        const data = await db.exerciseReport.findOne({
            where: {
                exercise_report_id: exerciseID,
            }
        });
        return data;
    } catch (error) {
        console.error('Error in getExercise:', error);
        throw error;
    }
};
//추가한거--------------------------------------------------------------------
// const getRecentExercises = async (userID) => {
//     try {
//         const today = new Date();
//         const endDate = new Date(today);
//         const startDate = new Date(today);
//         startDate.setDate(today.getDate() - 4);

//         // 날짜 형식을 YYYY-MM-DD로 변환
//         const formattedStartDate = startDate.toISOString().split('T')[0];
//         const formattedEndDate = endDate.toISOString().split('T')[0];

//         const result = await db.exerciseReport.findAll({
//             where: {
//                 user_id: userID,
//                 exercise_date: {
//                     [Op.between]: [formattedStartDate, formattedEndDate]
//                 }
//             }
//         });
//         // 확인: 반환하는 데이터가 배열인지
//         console.log('Server Data:', result);

//         return result;
//     } catch (error) {
//         console.error('Error in getRecentExercises:', error);
//         throw error;
//     }
// };
const getRecentExercises = async (userID) => {
    try {
        console.log('Function getRecentExercises called'); // 함수 호출 로그
        console.log('UserID:', userID); // 사용자 ID 로그
        
        const today = new Date();
        const endDate = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 4);
        const startDateString = startDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

        console.log('Start Date:', startDateString, 'End Date:', endDate); // 날짜 로그
        const result = await db.exerciseReport.findAll({
            where: {
                user_id: userID,
                exercise_date: {
                    [Op.between]: [startDateString, endDate]
                }
            }
        });

        console.log('Server Data:', result); // 데이터 확인
        return result;
    } catch (error) {
        console.error('Error in getRecentExercises:', error);
        throw error;
    }
};
//----------------------------------------------------------------------------

module.exports = {
    saveExercise,
    getExerciseByDate,
    getExercise,
    getRecentExercises //
};
