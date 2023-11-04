//로그인 페이지 js

const loginBtn = document.getElementById('loginBtn');
const email = document.getElementById('email');
const password = document.getElementById('password');


//로그인 버튼을 눌렀을 때 백엔드로 입력값 보내기(아직은 console만)
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const checkValue = logininputCheck();
  if(checkValue === 0){
    // console.log(
    //   `
    //   email: ${email.value}
    //   password: ${password.value}
    //   `
    // )
    const data = {
      email: email.value,
      password: password.value,
    }

    fetch(URL_PATH.BACK_URL + '/api/auth/sign-in',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(async (response) => {
      const res = await response.json();
      console.log('response: ', res);
      if(response.status === 200){
        console.log('성공');
        window.localStorage.setItem('Token', res.data);
        location.href = '../mainpage/index.html';
      }else if(response.status === 401){
        const loginController = document.getElementById('loginAlarm');
        loginController.innerHTML = '이메일이나 비밀번호가 틀렸습니다';
        loginController.className='alarmon';
      }
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }
});

const logininputCheck = () => {
  const emailController = document.getElementById('emailAlarm');
  const passwordController = document.getElementById('passwordAlarm');

  emailController.className='alarmoff';
  passwordController.className='alarmoff';

  let toggle = 0;

  if(email.value == '') {
    emailController.innerHTML = '이메일을 입력해주세요';
    emailController.className = 'alarmon';
    toggle = 1;
  }
  if(password.value == '') {
    passwordController.innerHTML = '비밀번호를 입력해주세요';
    passwordController.className = 'alarmon';
    toggle = 1;
  }

  if(toggle === 1) { return 1; }
  else return 0;
}


//이메일
email.oninput = (e) => {
  const emailController = document.getElementById('emailAlarm');
  emailController.className='alarmoff';
  
  if(email.value == '') {
    emailController.innerHTML = '이메일을 입력해주세요';
    emailController.className = 'alarmon';
  }
}


//비밀번호
password.oninput = () => {
  const passwordController = document.getElementById('passwordAlarm');
  passwordController.className='alarmoff';

  if(password.value == '') {
    passwordController.innerHTML = '비밀번호를 입력해주세요';
    passwordController.className = 'alarmon';
  }
}