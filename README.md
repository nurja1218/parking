# 주차장 관리 API

이 문서는 주차장 관리 API에 대한 설명을 제공합니다. 이 API는 NestJS와 TypeORM을 활용하여 개발되었습니다.

## 목차

1. [설치 및 실행 방법](#설치-및-실행-방법)
2. [주요 기능](#주요-기능)
3. [API Endpoints](#api-endpoints)
4. [에러 처리](#에러-처리)

## 설치 및 실행 방법

### 프로젝트 클론하기

```bash
git clone [Your-Repository-URL]
```

### 의존성 설치하기

```bash
cd [Your-Project-Directory]
yarn install
```

### 환경 설정 파일 수정하기

환경 설정 파일(`.env` 또는 `environment.ts` 등)을 수정하여 데이터베이스 연결과 관련된 설정들을 완료합니다.

### 프로젝트 실행하기

```bash
yarn start
```

## 주요 기능

- **주차장 조회**: 등록된 모든 주차장의 정보를 조회합니다.
- **주차장 상세 조회**: 주차장의 ID를 통해 특정 주차장의 상세 정보를 조회합니다.
- **주차장 생성**: 새로운 주차장을 생성합니다.

## API Endpoints

- **GET** `/v1/parking`: 모든 주차장 정보 조회
- **GET** `/v1/parking/:id`: 특정 주차장 상세 정보 조회
- **POST** `/v1/parking`: 주차장 생성
  ...

## 응답 예시

### 주차장 조회 (GET `/v1/parking`)

```json
[
{
"id": "1",
"name": "주차장1",
"location": "서울시 강남구",
"totalSpaces": 100,
"availableSpaces": 80
},
...
]
```

### 주차장 상세 조회 (GET `/v1/parking/:id`)

```json
{
  "id": "1",
  "name": "주차장1",
  "location": "서울시 강남구",
  "totalSpaces": 100,
  "availableSpaces": 80
}
```

### 주차장 생성 (POST `/v1/parking`)

요청 본문:

```json
{
  "name": "주차장2",
  "location": "서울시 서초구",
  "totalSpaces": 120
}
```

응답:

```json
{
  "id": "2",
  "name": "주차장2",
  "location": "서울시 서초구",
  "totalSpaces": 120,
  "availableSpaces": 120
}
```

## 에러 처리

주어진 요구 사항을 만족하지 않거나 예상하지 못한 오류가 발생할 경우, 에러 메시지와 함께 적절한 HTTP 상태 코드가 반환됩니다.
