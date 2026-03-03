/* =========================================================
   GENERIS WEBINAR — Form Validation (Vanilla JS)
   
   Lógica:
   - Validación on-submit
   - Campos obligatorios: fullName, email, specialty, privacy
   - Validación de formato de email
   - Success State visual tras inscripción correcta
========================================================= */

( function () {
    "use strict";

    /* Referencias al DOM */
    const form = document.getElementById("form");
    const formSurface = document.querySelector(".form-surface");

    /* Template del Success State (se inyecta en el DOM al enviar form) */
    const successTemplate = `
        <div class="success-state is visible" role="alert" aria-live="asertive">
            <div class="success-state__icon" aria-hidden="true">
                <span class="material-symbols-outlined">check_circle</span>
            </div>
            <p class="success-state__title">¡Inscripción confirmada!</p>
            <p class="success-state__text">
                Hemos registrado su solicitud. Recibirá un email con el enlace de acceso al webinar.
            </p>
        </div>
    `;

    /* Validadores */

    /**
     * Comprueba que el valor no está vacío
     * @param {string} value
     * @returns {boolean} 
     */
    function isRequired(value) {
        return value.trim().length > 0;
    }

    /**
     * Valida el formato del email con expresión regular estándar
     * @param {string} value
     * @returns {boolean} 
     */
    function isValidEmail(value) { 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim());
    }

    /* Helpers de UI para mostrar o limpiar errores */

    /**
     * Marca un campo como inválido y muestra el mensaje de error
     * @param {HTMLElement} field - el input o select
     * @param {string} errorId - el id del párrafo de error
     * @param {string} message - el mensaje de error a mostrar
     */
    function showError(field, errorId, message) {
        field.classList.add("is-invalid");
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", errorId);

        const errorEl = document.getElementById(errorId);
        if (errorEl) errorEl.textContent = message;
    }

    /**
     * Limpia el estado de error del campo
     * @param {HTMLElement} field
     * @param {string} errorId
     */
    function clearError(field, errorId) {ç
        field.classList.remove("is-invalid");
        field.removeAttribute("aria-invalid");

        const errorEl = document.getElementById(errorId);
        if (errorEl) errorEl.textContent= "";
    }

    /* Lógica principal de validación */

    /**
     * Valida los campos del formulario
     * Devuelve true si todos son válidos
     * @returns {boolean}
     */
    function validateForm() {
        let isValid = true;

        /* Nombre y apellidos */
        const fullName = document.getElementById("fullName");
        clearError(fullName, "error-fullName");
        if (!isRequired(fullName.value)) {
            showError(fullName, "error-fullName", "El nombre y apellido(s) son obligatorios.");
            isValid = false;
        }

        /* Email */
        const email = document.getElementById("email");
        clearError(email, "error-email");
        if (!isRequired(email.value)) {
            showError(email, "error-email", "El email es obligatorio.");
            isValid = false;
        } else if (!isValidEmail(email.value)){
            showError(email, "error-email", "Introduzca un email con formato válido (ej: luciagalan@hospitalgeneral.com).");
            isValid = false;
        }

        /* Especialidad médica */
        const specialty = document.getElementById("specialty");
        clearError(specialty, "error-specialty");
        if (!isRequired(specialty.value)) {
            showError(specialty, "error-specialty", "Debe seleccionar una especialidad.");
            isValid = false;
        }

        /* Política de privadad */
        const privacy = document.getElementById("privacy");
        const privacyError = document.getElementById("error-privacy");
        privacyError.textContent = "";
        if (!privacy.checked) {
            privacyError.textContent = "Debe aceptar la política de privacidad para continuar.";
            isValid = false;
        }

        return isValid;
    }

    /* Inline validation: limpia errores al corregir el campo */
    function attachInlineCleanup() {
        const fields = [
            { el: document.getElementById("fullName"), errorId: "error-fullName" },
            { el: document.getElementById("email"), errorId: "error-email" },
            { el: document.getElementById("specialty"), errorId: "error-specialty" },
        ];

        fields.forEach(({el, errorId}) =>{
            el.addEventListener("input", () => {
                if (el.classList.contains("is-invalid")) {
                    clearError(el, errorId);
                }
            });
        });

        /* Checkbox de privacidad */
        const privacy = document.getElementById("privacy");
        privacy.addEventListener("change", () => {
            const privacyError = document.getElementById("error-privacy");
            if (privacy.checked) privacyError.textContent = "";
        });
    }

    /* Mostrar el Success State */
    function showSuccessState() {
        /* Oculta el form */
        form.style.display = "none";

        /* Inyecta el bloque de éxito en el mismo contenedor */
        formSurface.insertAdjacentHTML("beforeend", successTemplate);

        /* Hace scroll suave al mensaje para que el usuario lo vea */
        const successEl = formSurface.querySelector(".success-state");
        if (successEl) {
            successEl.scrollIntoView({ behavior: "smooth", block: "center"});
        }
    }

    /* Manejador del submit */
    function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            /* Enfoca el primer campo inválido para accesibilidad */
            const firstInvalid = form.querySelector(".is-invalid");
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        /* Simulación de envío exitoso. Aquí iría la llamada a backend real */
        showSuccessState();
    }

    /* Inicialización */
    function init() {
        if (!form) return; /* salida segura si el form no existe */

        form.addEventListener("submit", handleSubmit);
        attachInlineCleanup();
    }

    init();

})();