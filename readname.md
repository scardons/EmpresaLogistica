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
* Creamos una tabla en la bd usuario
* Creamos un modelo con la consulta usuario
* creamos el controlador usuario
* creamos en login en el conrolador, modelo, router con .env y token 
* npm install dotenv
*creamos el perfil en el controlador con el middleware router
* instale docker luego lo configure con redis
* se creo en la carpeta utils redisCliente y se organizo el index.ts
* Para crear pruebas unitarias instalamos jest y pusimos una carpeta de test en la parte de afuera de src para mantener separado las pruebas del codigo de produccion
* Realizamos test de login y de register y sale todo OK
* pasamos de mvc a clean architecture luego testeamos