# Prueba Técnica - Despliegue con Docker

Este proyecto utiliza Docker Compose para levantar una base de datos MySQL, el backend Node.js y (opcionalmente) el frontend.

## Requisitos

- [Docker](https://www.docker.com/products/docker-desktop) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

## Estructura del proyecto

```
test_app/
├── backend/
├── mysql/
│   └── init/
│       └── 01-init-data.sql
├── docker-compose.yml
```

## Pasos para desplegar

1. **Clona el repositorio y entra a la carpeta del proyecto:**

   ```bash
   git clone <URL-del-repositorio>
   cd test_app
   ```

2. **(Opcional) Ajusta las variables de entorno**  
   Si necesitas cambiar credenciales o puertos, edítalos en `docker-compose.yml`.

3. **Levanta los servicios con Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   Esto descargará las imágenes necesarias, construirá el backend y levantará los contenedores.

4. **Acceso a los servicios:**
   - **MySQL:** puerto `3307` en tu máquina local.
   - **Backend:** [http://localhost:3001](http://localhost:3001)

5. **(Opcional) Reiniciar la base de datos desde cero:**  
   Si quieres reiniciar la base de datos y cargar los datos de prueba nuevamente:

   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

## Notas

- Los scripts de inicialización de la base de datos están en `mysql/init/`.
- El backend se conecta automáticamente a la base de datos usando las variables de entorno definidas en `docker-compose.yml`.

---

¡Listo! Si tienes dudas, revisa los logs de los contenedores con:

```bash
docker-compose logs
```
