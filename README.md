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
docker exec -it react npm install --save axios
```
**Nota:**
El comando anterior va a tomar algun tiempo, por favor sea paciente.
Este descarga y configurando minizinc, python3 y node en 2 contenedores para permitirle usar la aplicación


## Finalmente
Una vez iniciado el docker puede acceder a la aplicación a través del

`localhost:8000`

## Contenido de la carpeta

La carpeta contiene 3 subdirectorios principales, uno con el back de la aplicación, otro con el front llamado front-minizinc y un directorio ejemplos, con ejemplos para correr la aplicación, al mismo nivel del README.md encontrará el informe en pdf del projecto.
El directorio back contiene 2 subdirectorios, un directorio minizinc, con los modelos y un directorio upload donde en cada ejecución se guardarán los datos ingresados temp.dzn y la solución del mismo output.txt, si ejecutó el modelo. 
El directorio front-minizinc contiene la estructura normal de un proyecto en react, en donde se puede tener acceso al codigo de la aplicación desde src/App.js.

```
.
├── back
│   ├── api.py
│   ├── Dockerfile
│   ├── minizinc
│   │   ├── DesenfrenoDePasiones1.mzn
│   │   └── DesenfrenoDePasiones2.mzn
│   └── upload
│       ├── output.txt
│       └── temp.dzn
├── docker-compose.yml
├── ejemplos
│   ├── Desenfreno1.dzn
│   ├── Desenfreno2.dzn
│   ├── Med1-1.dzn
│   ├── Med1-2.dzn
│   ├── Med1-3.dzn
│   ├── Med1-4.dzn
│   ├── Med2-1.dzn
│   ├── Med2-2.dzn
│   ├── Med2-3.dzn
│   ├── Med2-4.dzn
│   ├── Med2-5.dzn
│   ├── Propia1-1.dzn
│   ├── Propia1-2.dzn
│   ├── Trivial1.dzn
│   └── Trivial2.dzn
├── front-minizinc
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.svg
│   │   ├── f.jpg
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── serviceWorker.js
│       └── setupTests.js
├── informe.pdf
└── README.md

```

Dato curioso, encontrará acceso al api a través del puerto `5000`.





