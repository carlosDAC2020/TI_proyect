
# Proyecto de Microservicios: Despliegue Automatizado con CI/CD

Este documento describe la arquitectura y el proceso de despliegue automatizado (CI/CD) para una aplicación basada en microservicios. El flujo de trabajo utiliza GitHub Actions para orquestar la construcción de imágenes, el aprovisionamiento de infraestructura en AWS con Terraform y la configuración y despliegue de servicios con Ansible.


![A brief description of the image](/imgs/Diagrama%20en%20blanco.png)

## Arquitectura del Proyecto
La aplicación se compone de tres servicios principales:

*   **Manager Server**: Un servicio de gestión desarrollado con **Django**.
*   **APIs**: Un servicio de API (posiblemente FastAPI o similar) para la lógica de negocio principal.
*   **Client**: Una aplicación de frontend desarrollada con **Angular**.

Estos servicios se comunican con una base de datos **PostgreSQL** gestionada a través de **Amazon RDS**.

## Flujo de Despliegue (CI/CD)

El proceso completo está automatizado y orquestado por **GitHub Actions**. A continuación, se detalla cada fase del pipeline.

### Fase 1: Integración Continua (CI) - Construcción de Imágenes

1.  **Disparador (Trigger)**: El flujo de trabajo de GitHub Actions se inicia automáticamente tras un `push` o `merge` a la rama principal del repositorio.
2.  **Construcción de Imágenes Docker**:
    *   GitHub Actions toma el código fuente de cada uno de los tres servicios (Manager Server, APIs, Client).
    *   Utilizando los `Dockerfile` presentes en cada directorio de servicio, se construyen las imágenes de Docker correspondientes.
3.  **Publicación en Docker Hub**:
    *   Una vez construidas, las imágenes se etiquetan y se suben (`push`) a un repositorio de **Docker Hub**. Esto las hace accesibles para la fase de despliegue.

### Fase 2: Infraestructura como Código (IaC) - Aprovisionamiento con Terraform

1.  **Aprovisionamiento de Recursos**:
    *   El pipeline de GitHub Actions invoca a **Terraform** para crear y gestionar la infraestructura necesaria en **Amazon Web Services (AWS)**.
    *   Terraform lee los archivos de configuración (`.tf`) para aprovisionar los siguientes recursos:
        *   Varias **Instancias EC2 T2** que servirán como nodos para alojar los contenedores.
        *   Grupos de seguridad para controlar el tráfico de red hacia las instancias.
        *   Una instancia de base de datos **RDS con PostgreSQL**.
        *   Un **Usuario IAM** con los permisos necesarios para que los servicios interactúen de forma segura.
2.  **Generación de Inventario para Ansible**:
    *   Una vez que las instancias EC2 están activas, Terraform exporta sus direcciones IP públicas y la ruta de la clave SSH necesaria para el acceso.
    *   Esta información se guarda en un archivo de `inventory`, que será el insumo principal para la siguiente fase con Ansible.

### Fase 3: Gestión de Configuración y Despliegue (CD) - Despliegue con Ansible

1.  **Configuración de Servidores**:
    *   **Ansible** utiliza el archivo `inventory` generado por Terraform para conectarse a cada una de las instancias EC2 recién creadas.
2.  **Despliegue de Contenedores**:
    *   El playbook de Ansible ejecuta una serie de tareas en los servidores remotos:
        *   Instala Docker en cada instancia si no está presente.
        *   Se autentica contra Docker Hub.
        *   Descarga (`pull`) las imágenes de Docker correspondientes desde Docker Hub a su instancia EC2 designada.
        *   Inicia los contenedores a partir de las imágenes descargadas, desplegando así el `Manager Server`, `API RSS` y el `Client` en sus respectivas máquinas virtuales.

### Gestión de Secretos

La información sensible, como las credenciales de AWS (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`), el usuario y token de Docker Hub, y las contraseñas de la base de datos, se almacena de forma segura en **GitHub Secrets**. El pipeline de GitHub Actions inyecta estos secretos como variables de entorno en los pasos que lo requieren (Terraform y Ansible), evitando exponerlos directamente en el código.

## Pila de Tecnologías

*   **Orquestación CI/CD**: GitHub Actions
*   **Contenedores**: Docker, Docker Hub
*   **Infraestructura como Código**: Terraform
*   **Gestión de Configuración**: Ansible
*   **Plataforma Cloud**: Amazon Web Services (AWS)
    *   **Cómputo**: EC2 T2 Instances
    *   **Base de Datos**: RDS PostgreSQL
    *   **Seguridad**: IAM, Security Groups
*   **Aplicación**:
    *   **Backend**: Django, Python (FastAPI/otro)
    *   **Frontend**: Angular