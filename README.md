커스텀 블로그
==========
### 1 basic build

> branch: main
> commit message: first-commit

1. 설치
> npm init -y
> npm i express
> npm i nodemon

2. 내용
> param을 이용한 동적 라우팅
> 미들웨어와 next

3. 주의사항
> postman에서는 raw형태로 json타입을 POST해야 정상 작동함
> json 쓰려면 : app.use(express.json())

### 2 pug templates

1. 목표
> 템플릿 연결해보고, 기본적인 crud 구현
> branch: feature/pug-template
> commit message: pug 템플릿 써보기


2. 내용
> - pug 템플릿 추가
> 
> - post 와 create router 분리
> - update 추가
> - router.get(path, function) 말고 router.route(path).get(getfunction).post(postfunction) 식으로 만들어보기

3. 주의사항
> () => () 와 () => {}의 차이
> 

### 3 user추가
1. 목표
> user, reple 추가
> branch: 
> commit message: 

2. 내용
> - 라우터 분리
> - delete 추가
> - user, reple 추가

3. 주의사항
> express-session 사용
> 