const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://WebProjectDB:45654654@alicewebprojectteam8.pqahg4p.mongodb.net/')
    .then(() => console.log('connected'))
    .catch(() => console.log('failed'));

// view 엔진을 ejs를 쓰겠다는 설정
app.set("view engine", "ejs");
app.use(express.json({ extended: false }));

// 페이지 로딩 함수
app.get("/", function (req, res) {
    //console.log(res);
    res.render("index", {}); // views 폴더 밑에 있는 파일을 참조함
});

// 회원가입 페이지 router 이동
app.use('/sign-up', require('./routes/sign-up'));


// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function () {
    console.log("server running");
});