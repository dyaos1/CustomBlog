커스텀 블로그
==========
### 1

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

### 2

> 
> commit message: 

2. 내용
> - pug 템플릿 추가
> 
> - post 와 create router 분리
> - update 추가
> - router.get(path, function) 말고 router.route(path).get(getfunction).post(postfunction) 식으로 만들어보기

3. 주의사항
> () => () 와 () => {}의 차이
> 