---
title: 'Rollup.js + Typescript + Storybook으로 디자인 시스템 구축하기'
categories:
    - Frontend
last_modified_at: 2021-01-02T05:40:00
toc: true
path: '/Frontend/Rollup-Typescript-Storybook-Design-System'

---

# Rollup.js + Typescript + Storybook으로 디자인 시스템 구축하기

>  본 포스트는 다음 포스트들을 참고하여 작성되었습니다. 자세하거나 추가적인 지식을 얻고자 하는 분은 다음 포스트를 함께 보시는 것을 추천드립니다.
>
> - [Ideveloper님의 Rollup.js + Typescript + Storybook으로 구축하는 디자인 시스템](https://ideveloper2.dev/blog/2020-05-17--rollup-ts-%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%A7%8C%EB%93%A4%EA%B8%B0/)
> - [velopert님의 Rollup을 사용하여 디자인 시스템 번들 후, npm 라이브러리로 배포하기](https://velog.io/@velopert/bundle-with-rollup-and-publish-to-npm)
> - [iamchanii님의 @canifish/ui 패키지 코드](https://github.com/hyp3rflow/canifish/tree/develop/packages/ui)



## 들어가며

2021년에 여러 프론트엔드 프로젝트를 진행할 기회를 얻게 되었습니다. 대표적으로는 교내 웹 동아리 KWEB, 정보보안 동아리 KUICS의 게시판의 개발을 맡아 진행하게 되었습니다. 간단한 블로그나 프로젝트, 그리고 포트폴리오 및 면접 과제들을 위한 개발을 해오면서 디자인 시스템에 대한 중요성을 깨닫게 되었고, 디자인 시스템을 만들어 앞으로의 프로젝트에 이를 적용해보고자 Rollup.js와 Storybook으로 디자인 시스템을 구축하고자 하였습니다.

여러 플러그인과 번들러 설정을 진행하면서 시중에 나와있는 포스트들과 다른 점을 발견하였고, 이런 점을 보완하고자 포스트를 적어 기록을 해두고자 합니다.

본 게시글을 토대로 만든 디자인 시스템 레포지토리는 [hyp3r-ui](https://github.com/hyp3rflow/hyp3r-ui)입니다.



## Babel 설치

```bash
yarn add -D babel babel-preset-react-app babel-plugin-styled-components
```

- babel: ES6+ 이상의 ECMAScript 문법을 이전 자바스크립트 문법으로 transplie 해줍니다.
- babel-preset-react-app: React-app에 맞는 변환 규칙(preset)을 사용할 수 있습니다.
- babel-plugin-styled-components: SSR, minify 등 styled-components를 위한 다양한 기능을 제공하는 플러그인입니다.

## .babelrc.json 설정

프로젝트의 root에 ```.babelrc.json```을 만들고 다음과 같이 설정해주세요.

```json
{
  "presets": [["react-app", { "flow": false, "typescript": true }]],
  "plugins": ["babel-plugin-styled-components"]
}
```

react-app preset을 적용하고, typescript를 사용함을 알려줍니다.
또한, babel-plugin-styled-components를 적용해줍니다.

## tsconfig.json 설정

프로젝트의 root에 ```tsconfig.json```을 만들고 다음과 같이 설정해주세요.
```tsc --init```을 통해서 tsconfig를 만들고 수정을 해도 됩니다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "jsx": "react",

    "declaration": true,
    "declarationDir": "./dist/types",

    "strict": true,

    "moduleResolution": "node",            /* Specify module resolution */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- declaration: d.ts 파일을 만듭니다.
- declarationDir: 해당 폴더에 d.ts를 만들도록 합니다.
- moduleResolution: module을 import하거나 export할 때, 어떤 방식으로 처리할 것인가 설정합니다.

## Rollup Setting

Rollup에 필요한 패키지들을 설치합니다.

```bash
yarn add -D rollup @rollup/plugin-babel @rollup/plugin-node-resolve @rollup/plugin-typescript
```

> [rollup-plugin-babel](https://www.npmjs.com/package/rollup-plugin-babel), [rollup-plugin-node-resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve), [rollup-plugin-typescript2](https://www.npmjs.com/package/rollup-plugin-typescript2) 패키지는 deprecated 되었습니다. 이제는 [@rollup/plugin](https://github.com/rollup/plugins) monorepo에서 관리됩니다.

- [@rollup/plugin-babel](https://www.npmjs.com/package/@rollup/plugin-babel): Rollup에서 Babel을 쉽게 사용할 수 있도록 해주는 플러그인입니다.
- [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve): node_modules의 third-party 모듈을 사용할 수 있도록 해주는 플러그인입니다.
- [@rollup/plugin-typescript](https://www.npmjs.com/package/@rollup/plugin-typescript): typescript를 지원합니다.

## peerDependency 설정하기

```bash
yarn add --peer react react-dom styled-components
```

react와 react-dom은 devDependency에 설치되어 있을텐데, 지워주시고 다시 peer로 add 해주세요.
그럼 이렇게 peerDependencies 값이 채워지게 됩니다.

```json
"peerDependencies": {
  "react": "^17.0.1",
  "react-dom": "^17.0.1",
  "styled-components": "^5.2.1"
}
```

## package.json 수정하기

ESModule로 빌드한 결과물이 저장할 경로를 지정해줍니다.
rollup.config.js를 설정할 때, 이 값을 참조하여 설정해줄 것입니다.

```json
{
  "name": "@hyp3r-ui/board",
  "version": "1.0.0",
  "module": "dist/index.es.js"
  ...
}
```

빌드를 한 결과물을 dist/ 폴더에 저장할 것이며, entry point는 ./index.es.js가 되도록 설정할 것입니다.

## rollup.config.js 작성하기

프로젝트의 root에 rollup.config.js를 생성해주세요.

```rollup.config.js```

```javascript
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

process.env.BABEL_ENV = 'production';

export default {
  input: './src/index.ts',
  external: ['styled-components', 'react', 'react-dom'],
  plugins: [
    typescript({ typescript: require('typescript') }),
    resolve({ extensions }),
    babel({
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
  ],
  output: [{ file: pkg.module, format: 'es' }],
};
```

rollup 플러그인들을 불러오고, 방금 전에 수정한 package.json의 module 값을 불러올 수 있도록 pkg라는 이름으로 import 합니다.

external 옵션에 패키지 이름을 전달하면 peer dependency에 있는 패키지를 같이 번들하지 않도록 설정할 수 있습니다. rollup-plugin-peer-deps-external을 사용해도 됩니다. [styled-component는 꼭 external option에 제공해야 합니다!](https://styled-components.com/docs/faqs#with-rollupjs)

output 옵션에서는 ESModule 형태로 번들링한 파일을 package.json의 module에 지정한 경로에 저장하도록 합니다.

## build!

root 폴더에 src 폴더를 추가하고, src 폴더에 index.ts를 추가해주세요.

```src/index.ts```

```typescript
export { Button as default } from './components/Button';
```

```components/Button.tsx```

```tsx
import React from 'react';
import styled from 'styled-components';

export const Button = () => {
  return <StyledButton>hi</StyledButton>;
};

interface styledButtonProps {
  width?: string;
  height?: string;
  bgColor?: string;
  color?: string;
}

const StyledButton = styled.button<styledButtonProps>`
  width: ${p => p.width || '200px'};
  height: ${p => p.height || '80px'};
  border-radius: 50%;
  background-color: ${p => p.bgColor || 'orange'};
  color: ${p => p.color || 'white'};
`;
```

간단하게 Button component도 만들어줍니다.

다음에 ```yarn rollup -c```를 이용해 컴파일해주면 dist 폴더에 파일이 생기는 것을 볼 수 있습니다.

```package.json```의 script에 다음과 같이 추가하여 *.d.ts를 만드는 명령어를 작성해줍니다.

```json
"types": "dist/types/index.d.ts",
"scripts": {
    "build:types": "tsc --emitDeclarationOnly"
}
```

"types"를 적어두면 이 패키지를 설치해서 사용할 때 TypeScript 컴파일러에서 자동으로 경로에 선언된 타입을 참고하게 됩니다.

## Storybook 설정

```.storybook/main.js```를 만들고 스토리북을 설정해주세요.

```javascript
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
```

```package.json```의 script에 다음과 같이 추가하여 storybook의 명령어를 추가해줍니다.

```json
"scripts": {
    "storybook": "start-storybook -p 9009 -s public"
}
```

```yarn storybook```을 통해 storybook을 열어주세용.

