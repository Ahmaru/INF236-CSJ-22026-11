# INF236-CSJ-22026-11

Este es el repositorio del grupo 11, cuyos integrantes son:

* Ahmaru Huidobro Garcia - 202330540-5
* Jorge Padilla Roco - 202330547-2
* Damián Rios Marquez - 202473604-3
* Vicente Morales Galdames - 202411543-k
* *Ayudante*: Matias Barrera

# Wiki (Caso: DEFIDER)
Puede acceder a la Wiki mediante el enlace siguiente
[enlace](https://gitlab.inf.utfsm.cl/inf236-2026-2/inf236-csj-22026-11/-/wikis/home)

# Pasos para levantar el proyecto:

## Software necesario y sus versiones

*Para este caso hicimos el levantamiento inicial en una maquina Linux con OS Fedora 43*

* Docker version 29.6.2 build 1.fc43
* Docker Compose version 5.3.1
* Git 2.55.0
* node v24.20.0
* npm version 11.19.0

### Comandos Utilizados en orden para levantar el proyecto:

##### Pasos para instalar git
```bash
$ sudo dnf install git
```

##### Pasos para instalar docker y docker compose
```bash
$ sudo dnf install docker-cli <opcional> -> containerd
$ sudo dnf install docker-compose
```

##### Pasos para instalar node.js
```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
```
```bash
# en lugar de reiniciar la shell:
$ \. "$HOME/.nvm/nvm.sh"
```
```bash
# Descarga e instala Node.js:
$ nvm install 24
```
```bash
# Verifica la versión de Node.js y npm:
$ node -v
$ npm -v
```
##### Pasos para obtener el proyecto base y levantarlo
```bash
$ git clone https://github.com/MatiasBV/analisis-y-diseno-de-software.git
$ cd analisis-y-diseno-de-software/mi-proyecto-node-docker/
$ sudo docker compose up --build
```
en ese paso tuve un leve detalle por el sistema operativo pero se soluciona agregando un :z al final de la linea 16 del archivo *docker-compose.yml*.  
Luego cerramos el levantamiento
```bash
sudo docker compose down
```
