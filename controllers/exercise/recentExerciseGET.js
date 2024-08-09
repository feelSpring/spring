const { getRecentExercises } = require('../../models/exerciseQuery');
const authenticateToken = require("../../authenticateToken");

module.exports = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const userID = await authenticateToken(token);

        console.log('User ID:', userID); // 사용자 ID 로그

        const today = new Date();
        const endDate = today.toISOString().split('T')[0];
        const startDate = new Date();
        startDate.setDate(today.getDate() - 4);
        const startDateString = startDate.toISOString().split('T')[0];

        const result = await getRecentExercises(userID, startDateString, endDate);
        console.log('Recent Exercises Data:', result); // 서버 데이터 로그

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: '최근 운동 기록 조회 중 오류 발생', error });
    }
}


