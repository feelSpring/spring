const { getExerciseByDate } = require('../../models/exerciseQuery');
const authenticateToken = require("../../authenticateToken");

module.exports =async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const userID = await authenticateToken(token);

        const {date} = req.params;
        const result = await getExerciseByDate(userID, date)

        res.status(200).json(result);
     
    } catch (error) {
        res.status(500).json({ message: '운동 기록 삭제 중 오류 발생', error });
    }
}

