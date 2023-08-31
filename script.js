// Get form and input elements
const form = document.querySelector('.registration-form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const dobInput = document.getElementById('dob');
const ageMessage = document.getElementById('age-message');

// Validation functions
function validateFullName() {
  const fullName = fullNameInput.value.trim();
  const isValid = /^[A-Za-z ]{3,}$/.test(fullName);
  setValidationStatus(fullNameInput, isValid);
  return isValid;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  setValidationStatus(emailInput, isValid);
  return isValid;
}

function validatePassword() {
  const password = passwordInput.value.trim();
  const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  setValidationStatus(passwordInput, isValid);
  return isValid;
}

function validateConfirmPassword() {
  const confirmPassword = confirmPasswordInput.value.trim();
  const password = passwordInput.value.trim();
  const isValid = confirmPassword === password;
  setValidationStatus(confirmPasswordInput, isValid);
  return isValid;
}

function validateAge() {
  const dob = dobInput.value;
  const userAge = calculateAge(dob);
  const isValid = userAge >= 18;
  setValidationStatus(dobInput, isValid);
  ageMessage.textContent = isValid ? '' : 'You must be at least 18 years old.';
  return isValid;
}

function calculateAge(date) {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }

  return age;
}

// Set validation status
function setValidationStatus(inputElement, isValid) {
  const statusElement = inputElement.nextElementSibling;
  statusElement.className = 'status';
  statusElement.classList.add(isValid ? 'valid' : 'invalid');
  statusElement.textContent = isValid ? '✅' : '❌';
}

// Real-time validation
fullNameInput.addEventListener('input', validateFullName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
dobInput.addEventListener('input', validateAge);

// Form submission validation
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const isValidFullName = validateFullName();
  const isValidEmail = validateEmail();
  const isValidPassword = validatePassword();
  const isValidConfirmPassword = validateConfirmPassword();
  const isValidAge = validateAge();

  if (isValidFullName && isValidEmail && isValidPassword && isValidConfirmPassword && isValidAge) {
    form.submit();
  }
});

