# HKB-14

## TEAM소개
- [![title](https://img.shields.io/badge/DEVLOPER-이관형-123456)](https://github.com/wudys)
- [![title](https://img.shields.io/badge/DEVLOPER-김유영-123456)](https://github.com/yuda1124)

## 프로젝트 소개
- 우아한가계부 만들기

## ERD
![](https://i.imgur.com/tTcGrUy.png)

## Ground Rule
[Ground Rule](https://github.com/woowa-techcamp-2020/hkb-14/wiki/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C%EB%A3%B0)을 확인해주세요.

## Getting Started
1. 프로젝트를 clone 합니다.
```
$ git clone https://github.com/woowa-techcamp-2020/hkb-14.git
$ cd hkb-14
```
2. 패키지를 설치합니다.
```
➜  hkb-14 (develop)
$ yarn
$ cd client
➜  client (develop)
$ yarn
$ cd ../server
➜  server (develop)
$ yarn
```

3. sample.env를 복사해 .env 파일을 만든 뒤 설정합니다.
현재 프로젝트는 TEST_DB를 사용하고 있지 않으므로 DB와 PORT만 설정하면 됩니다.
```
➜  server (develop)
$ mv ./sample.env ./.env
###
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

DB_TEST_HOST=
DB_TEST_PORT=
DB_TEST_USER=
DB_TEST_PASSWORD=
DB_TEST_NAME=

PORT=
```

4. Server를 실행합니다.
```
hkb-14 (develop)
$ yarn start
```

## Feature
- 내역 
![](https://i.imgur.com/sy3dwcn.png)

- 달력
![](https://i.imgur.com/cZxERq5.png)

- 통계
    - 꺾은선 그래프
    ![](https://i.imgur.com/vWniP5F.png)

    - 파이차트
    ![](https://i.imgur.com/XPkgKzs.png)
    
    - 막대그래프
    ![](https://i.imgur.com/XHvOKDj.png)
