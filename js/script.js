// js/script.js

document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const birthDate = document.getElementById('birthDate').value.trim();
    
    const validationResult = validateUserData({ name, email, phone, birthDate });
    const messageDiv = document.getElementById('message');
    
    if (validationResult.isValid) {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, birthDate })
            });

            const result = await response.json();
            if (response.ok) {
                messageDiv.className = 'success';
                messageDiv.textContent = result.message;
            } else {
                messageDiv.className = 'error';
                messageDiv.textContent = result.error;
            }
        } catch (error) {
            messageDiv.className = 'error';
            messageDiv.textContent = 'Erro ao conectar com o servidor.';
        }
    } else {
        messageDiv.className = 'error';
        messageDiv.innerHTML = '<strong>Erros encontrados:</strong><ul>';
        for (let field in validationResult.errors) {
            messageDiv.innerHTML += `<li>${validationResult.errors[field]}</li>`;
        }
        messageDiv.innerHTML += '</ul>';
    }
});

function validateUserData(userData) {
    const errors = {};
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,11}$/;
    const today = new Date();
    const birthDate = new Date(userData.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Validação do nome
    if (!nameRegex.test(userData.name)) {
        errors.name = 'O nome deve conter pelo menos 3 caracteres e não pode conter números ou caracteres especiais.';
    }
    
    // Validação do e-mail
    if (!emailRegex.test(userData.email)) {
        errors.email = 'O e-mail não é válido.';
    }
    
    // Validação do telefone
    if (!phoneRegex.test(userData.phone)) {
        errors.phone = 'O telefone deve conter 10 ou 11 dígitos numéricos.';
    }
    
    // Validação da data de nascimento
    if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        errors.birthDate = 'O usuário deve ter pelo menos 18 anos.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}
