# DesenfrenoPasiones
CSP final project

## Estudiantes

Jaime Cuartas Granada
Emily Esmeralda Carvajal Camelo

## Instrucciones

Para poder ejecutar este proyecto es necesario tener en su computador docker y docker-compose
Si utiliza una distribución de linux (Ubuntu) puede utilizar

```
sudo apt-get install docker.io
sudo apt install docker-compose
```

## Ejecutar

Una vez clonado el repositorio en la carpeta raiz debe ejecutar

```
docker-compose up --build
```
**Nota:**
El comando anterior va a tomar algun tiempo, por favor sea paciente.
Este descarga y configurando minizinc, python3 y node en 2 contenedores para permitirle usar la aplicación


## Finalmente
Una vez iniciado el docker puede acceder a la aplicación a través del

`localhost:8000`

Dato curioso, encontrará acceso al api a través del puerto `5000`.



