1.  npm init -y
2.  npm i @types/node typescript
3.  npm i -D ts-node
4.  git init
5.  .gitignore // creamos archivo .gitignore
6.  en gitignore sacamos la carpeta node_modules
7.  creamos la carpeta ./src
8.  npm i -g typescript
9.  tsc --init
10. editamos tsconfig generado en 9 y seteamos outDir:"dist" y rootDir: "./src"
11. tsc
12. agregamos carpeta dist a .gitignore
13. git add . y git commit -m "iniciando servidor web"
14. ir a package.json "script ": { "dev": "ts-node ./dist/app.ts", "start": "node ./dist/app.js", "build": "tsc" }
15. npm i express @types/express
16. git commit agregamos GET basico

npm run dev para levantar el servidor