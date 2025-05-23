# --- Etapa de Construcción (Build Stage) ---
# Usamos una imagen Node.js para compilar la aplicación React
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de paquetes y las dependencias primero
# Esto permite que Docker cachee las capas si las dependencias no cambian
COPY package.json yarn.lock* package-lock.json* ./

# Instala las dependencias
# Usa yarn si tu proyecto lo usa, de lo contrario, npm install
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación React para producción
# Esto creará una carpeta 'build' (o 'dist' dependiendo de tu configuración)
RUN npm run build

# --- Etapa de Producción (Production Stage) ---
# Usamos una imagen de servidor web ligera (Nginx) para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos estáticos generados desde la etapa de construcción
# La carpeta 'build' es la salida por defecto de 'create-react-app'
COPY --from=build /app/build /usr/share/nginx/html

# Elimina la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu configuración personalizada de Nginx (crearemos este archivo a continuación)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80, que es el puerto por defecto de Nginx
EXPOSE 80

# Comando para iniciar Nginx cuando el contenedor se ejecute
CMD ["nginx", "-g", "daemon off;"]