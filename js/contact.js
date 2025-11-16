document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  if (!contactForm) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const inputs = [
    nameInput,
    emailInput,
    phoneInput,
    subjectInput,
    messageInput,
  ];

  const validators = {
    name(value) {
      if (!value.trim()) return "El nombre es obligatorio.";
      if (value.trim().length < 2)
        return "El nombre debe tener al menos 2 caracteres.";
      return null;
    },
    email(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "El email es obligatorio.";
      if (!emailPattern.test(value.trim())) return "El email no es válido.";
      return null;
    },
    phone(value) {
      const phonePattern = /^\+?[0-9\s\-()]{7,15}$/;

      if (!value.trim()) return null;

      if (!phonePattern.test(value.trim())) {
        return "El teléfono no es válido.";
      }

      return null;
    },
    subject(value) {
      if (!value.trim()) return "El asunto es obligatorio.";
      return null;
    },
    message(value) {
      if (!value.trim()) return "El mensaje es obligatorio.";
      if (value.trim().length < 10)
        return "El mensaje debe tener al menos 10 caracteres.";
      return null;
    },
  };

  const showError = (input, message) => {
    const group = input.closest(".form-group");
    if (!group) return;

    let errorEl = group.querySelector(`#${input.id}-error`);
    if (!errorEl) {
      errorEl = document.createElement("span");
      errorEl.id = `${input.id}-error`;
      errorEl.classList.add("error");
      group.appendChild(errorEl);
    }

    errorEl.textContent = message;
    input.classList.add("error");
  };

  const clearError = (input) => {
    const group = input.closest(".form-group");
    if (!group) return;

    const errorEl = group.querySelector(`#${input.id}-error`);
    if (errorEl) errorEl.textContent = "";

    input.classList.remove("error");
  };

  const validateField = (input, showErrors = true) => {
    const id = input.id;
    const value = input.value.trim();

    const validator = validators[id];
    if (!validator) return true;

    const errorMessage = validator(value);

    if (errorMessage) {
      if (showErrors) {
        showError(input, errorMessage);
      }
      return false;
    } else {
      if (showErrors) {
        clearError(input);
      }
      return true;
    }
  };

  const updateSubmitButton = () => {
    const formIsValid = inputs.every((input) => validateField(input, false));
    submitBtn.disabled = !formIsValid;
  };

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input, true);
      updateSubmitButton();
    });

    input.addEventListener("blur", () => {
      validateField(input, true);
      updateSubmitButton();
    });
  });
  updateSubmitButton();

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let formIsValid = true;

    inputs.forEach((input) => {
      const isValid = validateField(input, true);
      if (!isValid) formIsValid = false;
    });

    updateSubmitButton();

    if (formIsValid) {
      alert("¡Mensaje enviado exitosamente!");
      contactForm.reset();
      inputs.forEach((input) => clearError(input));
      updateSubmitButton();
    }
  });
});
