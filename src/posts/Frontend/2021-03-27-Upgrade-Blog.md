---
title: 'Upgrade Blog'
categories:
    - Frontend
last_modified_at: 2021-03-28T01:44:00
toc: true
path: '/Frontend/Upgrade-Blog'

---

# Upgrade Blog

블로그를 업그레이드 할 때가 온 것 같다.

블로그를 처음 만들때는 9개월 전인 2020년 6월이고, 2020년쯤에 프론트엔드 직군으로 개발 및 진로 방향을 정했고 그때 당시에는 재학 중이였기 때문에 거의 시작한지 3개월 쯤 되는 정말 뉴비의 실력으로 만들었었다.

기술스택을 하나하나 살펴보며 장단점을 비교해 만들기에는 실력이 부족했고, 리액트 기반으로 정적 사이트를 생성할 수 있는 Gatsby를 이용해 소스코드를 참고할 수 있는 이찬희님의 imch.dev와 안희종님의 ahnheejong.name 블로그를 보아가며 하나하나 수정하는 방식으로 진행했다.

지금은 2021년 3월로, 프론트엔드를 공부한 지 1년이 조금 넘어가는 시점이고, 그동안 고려대학교 강의평가 KLUE에 프론트엔드 개발자로 일했으며 현재는 산타토익이라는 프로덕트로 유명한 뤼이드에 프론트엔드 개발자로 입사하여 일할 정도로 자기평가를 하자면 급속도의 성장을 이루어낸 것 같다.

따라서 이제는 나를 대표하는 목적으로 만든 블로그가 직접 짠 코드베이스를 바탕으로 해야할 것 같았고, 이리저리 살펴볼만한 실력도 갖추어 진 것 같아 블로그를 리뉴얼해보고자 한다.

## 1. Migrating Gatsby from v2 to v3

일단 현재는 배포 자체가 로컬에서 작업을 한 뒤 빌드를 하고, cli 환경에서 firebase deploy를 통해 수동 배포를 하는 상황이다. HellSolver나 뤼이드 코드베이스를 통해 Github Actions에 대한 이해를 넓혔고, push가 일어날 때마다 자동으로 배포가 진행되는 CI 환경이 구축되어 있으면 좋을 것 같다고 생각했다.

그러나 로컬 환경과 Github Actions에서의 환경이 달라서 생기는 문제인지는 명확하지 않지만, gatsby를 통해 빌드를 수행할 때마다 예상치 못한 에러를 맞았다. 그래서 열심히 에러를 구글링하였지만 마땅한 해답을 얻을 수가 없었다. 기존의 코드베이스에 대한 이해도 완벽하지 않았기 때문에, 일단 Gatsby를 최신버전인 v3로 마이그레이션 한 이후에 docs를 참고해가며 코드베이스를 갈아엎고 해당 에러가 나는 경우 수정을 진행해보기로 하였다.

다행히도 회사에서 emotion의 버전 업그레이드를 맡아 진행했던 덕분에 어느정도의 workflow를 구상할 수 있었고, 공식 문서를 통해 어떤 breaking changes가 있는지 먼저 확인해보기로 했다.

v3로 넘어오면서 생긴 breaking changes는 다음과 같았다.

- gatsby 관련 패키지들을 일괄 업데이트 해주어야 한다.
  - 다행히도 ```yarn upgrade-interactive --latest``` 명령어를 이용해 interactive한 방법으로 latest가 아닌 패키지들을 선택하여 업그레이드 할 수 있었다.
- Node.js 버전이 12.13.0 이상은 되어야 한다.
- gatsby에서 사용하는 webpack 버전이 v4에서 v5로 업그레이드 되었다.
- gatsby에서 사용하는 eslint 버전이 v6에서 v7로 업그레이드 되었다.

그렇게 breaking changes를 적용해도 

```shell
Error: Invalid or incomplete introspection result. Ensure that you are passing "data" property of introspection response and no "errors" was returned alongside: undefined.

  - gatsby-node.js:81 
    [blog]/[gatsby-plugin-generate-typings]/gatsby-node.js:81:54
```

이런 에러가 끊임 없이 나왔다... 처음에는 graphql을 handling 하는 쪽에서 introspection result를 잘못 들고오나 생각을 했는데 알고보니 저 하단에 적혀있는 ```gatsby-plugin-generate-typings```에서 생기는 문제였다.

그래서 저 플러그인을 관리하는 레포를 가니까.. omg.. 커밋이 10개 남짓 있는 관리가 안되고 있는 플러그인이였던 것이다. 따라서 타입젠을 해주는 플러그인을 ```gatsby-plugin-typegen```로 고치니 다행히 문제가 해결되었다.

그런데 Github Actions를 붙이니까 문제가 발생했다. gatsby는 webpack처럼 tsconfig-path를 불러와주어야 하기 때문에 이 부분이 설정이 잘못된 것 같아 커밋을 열몇개씩 하며 고치려고 매달렸는데 아무 소용이 없었다... 포기하던 찰나 에러를 다시 읽게 되었고 결국에는 깃에서 일어난 대소문자 이슈 때문인 것을 깨닫고 싹 옮겼다가 다시 add 하는 방법으로 rename을 하고 나니 배포가 완료되었다. :)

이렇게 이 단계에서 이루어낸 것은

- gatsby를 버전업했다!
- components 들을 relative path로 받아오던 것을 @src prefix로 받아오게끔 수정했다.
- 위의 문제를 해결하기 위해 custom webpack 설정을 해주었다.
- Github Actions를 이용해 master branch에 푸시가 일어난 경우 자동으로 firebase deploy가 진행되도록 추가했다.

## 2. eslint 달기

원래 있던 블로그들이 eslint나 prettier 같은 린트 툴을 안가지고 있어서 코드 스타일을 재정의할 겸 린트툴을 달았다. 기존에 KUICS 홈페이지 작업하면서 들고 있던 설정에 일하면서 좀 괜찮다 싶었던 eslint 플러그인이나 설정들 (특히 import 순서 관리하는 것... 되게 편하더라) 을 접목시켜 적용시켜 두었다. 

왜인지는 모르겠지만 기존에 propTypes를 달고 있기도 했고, 예전에 좋아했던 styled-components 뒤로 빼기 같은 악습이 아직 남아있어서 한번에 다 걷어내기로 마음먹고 걷어냈다.

