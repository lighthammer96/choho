# entorno
el proyecto se desarrollo en laravel 8, con xampp 3.2.4, php 7.4.7
# pasos para leventar el proyecto
1) clonar el proyecto git clone https://github.com/lighthammer96/choho.git
2) crear una base de datos en mysql segun los datos del archivo .env del proyecto laravel 
que se encuentra en la raiz del proyecto

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=choho_bd
DB_USERNAME=choho_user
DB_PASSWORD=choho@1235

IMPORTANTE solo crear la base de datos con nombre choho_bd, si desea puede crear las credenciales
o solo poner el usuario por defecto root y dejar la contraseña vacia

3) ubicarse en la raiz del proyecto y ejecutar los siguientes comandos secuencialmente

php artisan migrate
php artisan db:seed

los comandos anteriores crearan las tablas y algunos datos de prueba.

Datos de Referencia:

el endpoint del api se encuentra en la siguiente ruta: api/obtener_resultado



