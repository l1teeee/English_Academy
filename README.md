# English_Academy

English Academy es un aplicativo web desarrollado con Jquery, PHP, Ajax, html, css y bootstrap, para la academia de Ingles DB, donde se le permitirá al personal administrativo y de colecturía de la Academia
tener un mejor control y organización de todos los estudiantes que estan registrados dentro de la academia, está conformado por 4 modulos principales que poseen sus respectivos cruds y organización de estudiantes

ESTUDIANTES
Dentro del primero modulo que se tiene es el modulo de estudiantes, donde tanto personal de colecturía como administración podrá agregar, visualizar, editar y eliminar la información de los estudiantes, se debe de poseer
con anterioridad toda la información del postulante para poder ingresarlo, aunque existen algunos campos al momento de registrarlo que no son obligatorios, de lo contrario se podrá agregar el postulante sin ningún
problema, en la parte de editar la información se le podrá asignar al estudiante al modulo que este va a pertenecer, la información de un estudiantes en específico se podrá ver en una ventana modal, para eliminar
se necesita una confirmación para así poder realizar el proceso, con esto ya se puede pasar el siguiente modulo, los módulos.

MODULOS
Para la creación de módulos, solamente se necesita el nombre, el código de este se genera de manera automatica y de forma ascendente 1,2,3... según el programa que este modulo pertenece, infantil (MI) o juvenil (MJ),
al momento de crearlo se podrá agregar estudiantes a este modulo, solamente se puede modificar el nombre del módulo, de igual manera se puede eliminar con una confirmación, en esta parte también tenemos la documentación
en dado caso se tienen estudiantes dentro del modulo, se pueden genera ciertos documentos PDF con las información de todos los estudiantes, los PDF que se pueden generar son: "Presentación", verificación de pagos, 
asistencia y gradebook, el documento de presentación es el que se pone en las aulas para que los estudiantes sepan si van en ese aula o no, el documento de verificación de pagos es para colecturía, que es el que
usan para ver quien de los estudiantes ha pagado o no, para el documento de asistencia se solicita la fecha del primer sabado de clases del modulo actual, para generar un doc con 8 sabados que es lo que dura el modulo
para su respectiva asistencia, y el gradebook, están todas las evaluaciones que se les hacen a los estudiantes.

En este modulo se tiene la función de "avanzar modulo" que se utiliza cuando acaba los 8 sabado que es un modulo, así todos los estudiantes pasan al siguiente modulo que les corresponde, para así no tener que hacerlo
todo de manera manual por cada estudiante.

SECCIONES
Agregado a los modulos, tenemos las secciones, que es la división del modulo en secciones en forma ascendente, A, B, C... el mínimo de estudiantes dentro de una sección son 10, para que se puedan repartir equitativamente
de igual manera aunque se divida en un numero impar el programa los dividirá según el apellido, para una mejor organización, en esta parte, se puede modificar la información de cada sección se puede agregar el docente
que estará encargado de esa sección en específico y el aula que atenderá, además de eliminar las secciones y poder ver que estudiantes pertenecen a esta sección, además de poder quitar estudiantes de cierta sección
y movero a la sección que deseamos que esté este estudiante.

EGRESADOS
Y como último modulo se tienen a los estudiantes egresados que con la función anterior explicada de avanzar modulo, si los estudiantes que estan en el último modulo del programa infantil, no tienen donde avanzar, estos
pasan a estado egresado, para así administración les haga su respectiva entrevista para saber si quieren continuar con el proceso de la academia o no, para así en esta parte avalarlo de continuar, o simplmente pasa a
estado finalizado indicando que finalizó su proceso lectivo
