// const { getRecentExercises } = require('../../models/exerciseQuery');
// const authenticateToken = require("../../authenticateToken");

// module.exports = async (req, res) => {
//     try {
//         const authHeader = req.headers.authorization;
//         const token = authHeader.split(' ')[1];
//         const userID = await authenticateToken(token);

//         const today = new Date();
//         const endDate = today.toISOString().split('T')[0];
//         const startDate = new Date();
//         startDate.setDate(today.getDate() - 4);
//         const startDateString = startDate.toISOString().split('T')[0];

//         const result = await getRecentExercises(userID, startDateString, endDate);

//         res.status(200).json(result);

//     } catch (error) {
//         res.status(500).json({ message: '최근 운동 기록 조회 중 오류 발생', error });
//     }
// }

const { getRecentExercises } = require('../../models/exerciseQuery');
const authenticateToken = require("../../authenticateToken");

module.exports = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const userID = await authenticateToken(token);

        // 최근 5일간의 운동 데이터 조회
        const result = await getRecentExercises(userID);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recent exercise data', error });
    }
}
