# Estudio VMC Subastas — la misma herramienta, dentro de un contenedor.
#
# Nada del código cambia aquí: `estudio.py` toma host, puerto y clave del
# entorno y el resto corre igual que en el escritorio. Lo que resuelve esta
# imagen es que el render necesita un Chromium de verdad, y eso pide un
# contenedor y no una función serverless.
#
#   docker build -t estudio .
#   docker run -p 7860:7860 -e ESTUDIO_CLAVE=loquesea estudio
#
# Node de base y python encima: node trae la mitad pesada (Remotion), y python
# aquí es solo el intérprete de la stdlib, sin un paquete que instalar.
FROM node:20-bookworm-slim

# Las librerías de sistema que Chromium necesita para arrancar headless. Sin
# ellas el navegador falla al abrir y el render muere sin decir por qué.
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 \
      ca-certificates fonts-liberation \
      libnss3 libnspr4 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 \
      libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
      libxrandr2 libgbm1 libasound2 libpango-1.0-0 libcairo2 \
    && rm -rf /var/lib/apt/lists/*

# La imagen de node ya trae el usuario `node` con UID 1000, que es justo el que
# espera Hugging Face. La app escribe (fotos, renders) dentro de su propio
# directorio, así que el dueño de los archivos tiene que ser ese mismo usuario.
USER node
WORKDIR /home/node/app

# Las dependencias antes que el código: mientras package-lock.json no cambie,
# reconstruir tras editar estudio.py no vuelve a bajar los 630 MB.
COPY --chown=node:node social-content/package.json social-content/package-lock.json ./social-content/
RUN cd social-content && npm ci

# Chromium horneado en la imagen. Si no, el primer render de cada arranque en
# frío se pone a descargar 150 MB y parece que la herramienta se colgó.
RUN cd social-content && npx remotion browser ensure

COPY --chown=node:node . .

# Los directorios de trabajo, creados de antemano: en el contenedor no existen
# porque están en .dockerignore, y son efímeros a propósito — el carrusel se
# baja en ZIP, así que no hace falta disco que sobreviva al reinicio.
RUN mkdir -p Posts Materiales social-content/public/autos

ENV ESTUDIO_HOST=0.0.0.0 \
    PORT=7860 \
    PYTHONUNBUFFERED=1

EXPOSE 7860
CMD ["python3", "estudio.py"]
