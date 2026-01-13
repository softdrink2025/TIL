## 2026/01/13
- tailwindcss 설치하기
  - npm install -D tailwindcss@3 postcss autoprefixer
  - npx tailwindcss init -p

```jsx
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- tawilwind.config.js의 content에 적용할 파일 경로 추가

```css
@tailwindcss base;
@tailwind components;
@tailwind utilities;
```
- src 폴더의 index.css 수정

## 할일관리 만들기
- tw-todos 폴더 참고
- npm install lucide-react
  - 아이콘 세트. 리액트 컴포넌트 형태로 사용. svg기반