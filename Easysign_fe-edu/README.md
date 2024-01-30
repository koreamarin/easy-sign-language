## src 내부 폴더구조

```
└─ src
 ├─ components
 ├─ assets
 ├─ hooks (= hoc)
 ├─ pages
 ├─ constants
 ├─ config
 ├─ styles
 ├─ services (= api)
 ├─ utils
 ├─ contexts (or store)
 ├─ App.js
 └─ index.js
```

- **components**
  재사용 가능한 컴포넌트들이 위치하는 폴더입니다.
  컴포넌트는 매우 많아질 수 있기 때문에 이 폴더 내부에서 하위폴더로 추가로 분류하는 경우가 많습니다.
- **assets**
  이미지 혹은 폰트와 같은 파일들이 저장되는 폴더입니다.
  이미지와 같은 파일들을 public에 직접 넣는 경우도 있는데 **둘의 차이는 컴파일시에 필요한지 여부**입니다.
  파비콘과 같이 `index.html`내부에서 직접 사용하여 컴파일 단계에서 필요하지 않은 파일들은 public에
  반면, 컴포넌트 내부에서 사용하는 이미지 파일인 경우 이 assets 폴더에 위치시켜야 합니다.
- **hooks (= hoc)**
  커스텀 훅이 위치하는 폴더입니다.
- **pages**
  react router등을 이용하여 라우팅을 적용할 때 페이지 컴포넌트를 이 폴더에 위치시킵니다.
- **constants**
  공통적으로 사용되는 상수들을 정의한 파일들이 위치하는 폴더입니다.
- **config**
  config 파일이 많지 않은 경우 보통 최상위에 위치시켜놓지만 여러개의 config 파일이 있을 경우 폴더로 분리하기도 합니다.
- **styles**
  css 파일들이 포함되는 폴더입니다.
- **services (= api)**
  보통 api관련 로직의 모듈 파일이 위치하며 auth와 같이 인증과 관련된 파일이 포함되기도 합니다.
- **utils**
  정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더입니다.
- **contexts**
  contextAPI를 사용할 때 관련 파일들이 위치하는곳으로 상태관리를 위해 contextAPI 대신 redux를 사용 할 경우 폴더 이름을 `store`로 사용하기도 합니다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/07f0fd8d-9bba-4cb3-973b-67f26ef2e0da/87d26f17-67de-4845-890b-838e3a98ac4b/Untitled.png)

# 커밋컨벤션

## HEADER Type의 종류

- Feat : 새로운 기능 추가한 경우
- Fix : 버그를 고친경우
- Docs : 문서를 수정한 경우
- Style : 코드 포맷 변경, 세미콜론 누락,
  코드 변경이 없는 경우
- Refactor : 프로덕션 코드 리펙토링
- Test : 테스트 코드, 리펙토링 테스트 코드 추가
- Chore : 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우
- Design : CSS 등 사용자가 UI디자인을 변경했을 때
- Rename : 파일명(or 폴더명)을 수정한 경우
- Remove : 파일을 삭제하는 작업만 수행한 경우
- Comment : 필요한 주석 추가 및 변경
- !BREAKING CHANGE : 커다란 API 변경의 경우
- !HOTFIX : 급하게 치명적인 버그를 고쳐야하는 경우

## Body

- 본문은 한 줄 당 72자 내로 작성한다.
- 본문 내용은 양에 구애받지 않고 최대한 상세히 작성한다.
- 본문 내용은 어떻게 변경했는지보다 **무엇을 변경했는지** 또는 **왜 변경했는지**를 설명한다.

# Footer

### 이슈 트래커 유형의 종류

- Fixex : 이슈 수정중 (아직 해결되지 않은 경우)
- Resolves : 이슈를 해결했을 때 사용
- Ref : 참고할 이슈가 있을 때 사용
- Related to : 해당 커밋에 관련된 이슈번호(아직 해결되지 않은경우)

# Commit Message 예시

```
Feat: "Add login API"        // 타입: 제목

로그인 API 개발               // 본문

Resolves: #123              // 꼬리말 => 이슈 123을 해결했으며,
Ref: #456                                 이슈 456 를 참고해야하며,
Related to: #48, #45         현재 커밋에서 아직 이슈 48 과 45 가 해결되지 않았다.
```
