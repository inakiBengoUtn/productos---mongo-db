# productos---mongo-db

Trabajo practivo grupal
Integrantes:
- Iñaki Bengoechea - 421635

El proyecto se divide en dos archivos raiz, backend y frontend.

## Backend
EL backend esta echo en spring boot con una imagen de mongoDB ejecutada por docker.

Para que el backend funcione es necesario tener instalado docker y JDK21.
Sera necesario descargar la image de mongo:8
```` bash
docker pull mongo:8
````
Lugo se debe correr esta imagen
```` bash
docker run -d --name mongo-db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:8
````
Una vez ya este corriendo el contenedor de mongo se puede iniciar el backend.

(Recordar descargar las dependencias necesarias del pom.xml, si utilizas Intellij IDEA se hace aprentando el la V con un icono de recargar que aparece arriba a la derecha)

## Frontend