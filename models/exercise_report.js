const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const ExerciseReport = sequelize.define('exercise_report', {
        // 새로 추가한거
        exercise_report_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
        exercise_date: {
            type: Sequelize.DATEONLY,
            allowNull: true, //true일땐 datagrip에 찍혔음
        },
        start_exercise_time: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        end_exercise_time: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        exercise_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        exercise_rate: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comments: {
            type: Sequelize.STRING, //TEXT에서 STRING으로 바꿈
            allowNull: true,
        },
        // 흠 원래 없었음
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
        
    }, {
        // tableName: 'exercise_reports',
        // timestamps: true, // timestamps를 true로 설정하여 createdAt 및 updatedAt을 자동 관리
        // createdAt: 'created_at', // createdAt 컬럼의 이름을 'created_at'으로 설정 (선택적)
        // // exercise_rate: 'exercise_rate', // 흠...ㅇ거해도 추가안됨
        // updatedAt: 'updated_at', // updatedAt 컬럼의 이름을 'updated_at'으로 설정 (선택적)
        timestamps: false
    });

    return ExerciseReport;
};