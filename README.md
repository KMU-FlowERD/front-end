## 🔉 프로젝트 소개 

### 📜 FlowERD란?
**사용자 친화적인 UI의 ERD 다이어그램 생성 도구로, 설계 도구의 진입장벽을 낮추고 팀 단위 설계 작업의 효율을 높이기 위해 개발된 웹 기반 서비스.**

## 👩🏻‍💻 팀원 소개
<table>
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/dbtkdfhr">
              <img src="https://github.com/dbtkdfhr.png" width="100">
              <br />
              <b>유상록(dbtkdfhr)</b>
            </a> 
            <br/>
            ****1630
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/cjeongmin">
              <img src="https://github.com/cjeongmin.png" width="100">
              <br />
              <b>최정민(cjeongmin)</b>
            </a> 
            <br/>
            ****1679
        </td>
        <td style="min-width: 150px;">
          <a href="https://github.com/minseokey">
            <img src="https://github.com/minseokey.png" width="100">
            <br />
            <b>이민석(minseokey)</b>
          </a> 
          <br/>
            ****1637
        </td>
    </tr>
    <tr align="center">
        <td>Frontend</td>
        <td>Frontend</td>
        <td>Backend</td>
    </tr>
</table>

## 🛠️ 기술 스택

FlowERD 프론트엔드는 유지 보수성과 확장성을 고려하여 아래와 같은 기술 스택으로 구성되어 있습니다.

### 🧩 프레임워크 & 언어
- **Next.js**  
  React 기반의 프레임워크로, 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)을 지원하여 성능과 SEO를 향상시킵니다.
- **TypeScript**  
  정적 타입을 지원하는 JavaScript의 상위 집합으로, 컴파일 타임 오류를 줄이고 안정적인 코드 작성을 돕습니다.

### 🎨 스타일링
- **Tailwind CSS**  
  유틸리티 퍼스트 CSS 프레임워크로, 클래스 기반의 빠르고 일관된 스타일링을 가능하게 합니다.

### 📦 상태 관리 & 데이터 페칭
 - **Zustand**  
  간결한 API와 직관적인 사용법을 제공하는 경량 상태 관리 라이브러리로, 전역 상태와 로컬 상태를 유연하게 관리할 수 있습니다.
- **React Query**  
  서버 상태를 효율적으로 관리하며, 데이터 캐싱, 자동 리페칭 등 API 요청 최적화 기능을 제공합니다.

### 🧹 코드 품질 도구
- **ESLint**  
  코드 스타일과 오류를 검사하고 자동 수정 가능한 린트 도구로, 코드 일관성을 유지합니다.
- **Prettier**  
  코드 자동 포맷터로, 팀원 간 통일된 코드 스타일을 유지할 수 있도록 도와줍니다.

### 🧪 테스트
- **Jest**  
  빠르고 유연한 JavaScript 테스팅 프레임워크로, 유닛 테스트 및 스냅샷 테스트를 지원합니다.
- **React Testing Library**  
  사용자 관점에서 React 컴포넌트를 테스트할 수 있게 해주는 도구로, 실제 사용 방식에 가까운 테스트 작성을 유도합니다.


### 🖥 Common

|역할|종류|
|-|-|
|협업 관리|<img alt="RED" src ="https://img.shields.io/badge/Notion-000000.svg?&style=for-the-badge&logo=Notion&logoColor=white"/>|
|디자인|<img alt="RED" src ="https://img.shields.io/badge/Figma-F24E1E.svg?&style=for-the-badge&logo=Figma&logoColor=white"/>|

<br/>

## 📂 폴더 구조
```
├── 📂__tests__ 🗂 프로젝트의 유닛 테스트 및 통합 테스트 코드를 모아두는 디렉토리

├── 📂app 🗂 라우팅과 페이지 레이아웃을 구성하는 디렉토리

├── 📂components 🗂 여러 페이지나 기능에서 재사용 가능한 UI 컴포넌트들을 모아두는 디렉토리

├── 📂features 🗂 특정 도메인이나 기능 단위로 구성된 모듈형 코드(예: 상태 관리, API 호출 등)를 정리하는 디렉토리

├── 📂page 🗂 app 디렉토리와 별도로 페이지 단위로 구성된 파일을 둘 때 사용하는 디렉토리

├── 📂providers 🗂 전역 상태, 테마, 인증 등 Context API 기반의 공급자(Provider) 컴포넌트를 정의한 디렉토리

├── 📂shared 🗂 여러 모듈에서 공통으로 사용하는 유틸, 타입, 상수 등을 모아둔 디렉토리
```


🛠️ 실행 방법
1. 의존성 설치
```
npm install
```

2. 개발 서버 실행
```
npm run dev
```

