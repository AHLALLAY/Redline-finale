document.getElementById('stuffLoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Activation du statut de chargement
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="animate-pulse">Connexion en cours...</span>';
    
    try {
        const credentials = {
            email: form.email.value.trim(),
            password: form.password.value
        };
        
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Email ou mot de passe incorrect');
        }
        
        // Stockage des données
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirection selon le rôle
        redirectByRole(data.user.roles);
        
    } catch (error) {
        console.error('Erreur:', error);
        showFlashMessage(error.message, 'error');
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

function redirectByRole(role) {
    let redirectPath = '/';
    const basePath = window.location.origin;
    
    switch(role) {
        case 'Enseignant':
            redirectPath = '/dashboard/enseignant';
            break;
        case 'Secrétaire':
            redirectPath = '/dashboard/secretaire';
            break;
        case 'Comptable':
            redirectPath = `${basePath}/Projet/Frontend/views/Personnel/Comptable/dashboard_comptable.html`;
            break;
        default:
            redirectPath = '/dashboard';
    }
    
    showFlashMessage(`Connexion réussie! Redirection vers l'espace ${role}...`, 'success');
    
    setTimeout(() => {
        window.location.href = redirectPath;
    }, 1500);
}

function showFlashMessage(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
        type === 'error' 
            ? 'bg-red-100 text-red-800 border-l-4 border-red-500' 
            : 'bg-green-100 text-green-800 border-l-4 border-green-500'
    }`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}