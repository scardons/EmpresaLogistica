primero crea mi carpeta me posiciono en desktop
luego mkdir
luego npm init -y para crear el package.json
* luego instalmos el node_modules con el package-lock.json npm install express mysql2 zod bcrypt jsonwebtoken
* luego npm install -D typescript ts-node-dev @types/node @types/express @types/bcrypt @types/jsonwebtoken
* luego el tsconfig.json con npx tsc --init
* luego creamos la carpeta base src 
* Dentro de la caperpeta src mkdir config controllers middlewares models routes utils
* Vamos a crear la conexion a la bd en la carpeta config db.ts
* Creo el index.ts para que corra en el puerto 3000
* Package.json ponemos esto en script   "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
* Luego hacemos correr el puerto con npm run dev
