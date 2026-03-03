# Generis Webinar Landing

Landing page responsive para la inscripción a un webinar científico (dermatitis atópica).  
Incluye formulario con validación en JavaScript y estado de confirmación tras envío correcto.

## Demo
- GitHub Pages: https://beatrizgmdevux.github.io/generis-webinar-landing/

## Features
- Diseño responsive (mobile-first + desktop)
- Formulario con validación:
  - Nombre y apellidos (obligatorio)
  - Email (obligatorio + formato)
  - Especialidad (obligatorio)
  - Política de privacidad (obligatorio)
- Mensajes de error accesibles (`aria-live`) y foco en el primer campo inválido
- Success state tras envío correcto (simulado)

## Tecnologías
- HTML5 semántico
- CSS3 (tokens + componentes, mobile-first)
- Vanilla JavaScript (validación y estados UI)

## Estructura del proyecto
- `index.html` — Maquetación
- `styles.css` — Estilos
- `main.js` — Validación del formulario
- `/public` — Assets (logo e imágenes)

## Cómo ejecutarlo en local
Opción 1: abrir `index.html` directamente (modo estático).

Opción 2 (recomendada): servidor local
```bash
npx serve .