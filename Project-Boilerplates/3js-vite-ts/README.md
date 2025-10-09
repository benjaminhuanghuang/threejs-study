# Three.js + TS + Vite

```sh
npm init -y

npm i three
npm i -D typescript ts-node vite @types/three
```

Note: Vite allows importing TS directly in

```js
<script type="module">.
```

Add script

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```
