const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

var db = require('../../models/index');

const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // 회원가입된 이메일인지 확인
        const findUser = await db.user.findOne({ where: {email: email} });
        if (!findUser) {
            return res.status(404).send({message: "존재하지 않는 사용자입니다.\n회원가입을 해주세요."});
        }

        // 패스워드 일치 여부 확인
        const isPasswordValid = await bcrypt.compare(password, findUser.password);
        if (!isPasswordValid) {
            return res.status(401).send({message: "비밀번호가 일치하지 않습니다.\n다시 입력해주세요."});
        }
        
        
        // 토큰 생성하고 응답에 토큰 담아서 보내줌
        const secretKey = process.env.MY_SECRET;
        const token = jwt.sign({userId: findUser.user_id}, secretKey);
        return res.status(200).send({
            message: "로그인 되었습니다.",
            token: token
        });
    } catch(err) {
        res.status(500).send({
            message: "나중에 다시 시도해주세요.",
        });
    }
}

module.exports = login;

