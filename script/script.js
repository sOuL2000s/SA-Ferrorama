/**
 * ========================================
 * Red Rush - Main JavaScript
 * Versão 2.1 - Hamburger Menu Fix
 * ========================================
 */

(function() {
    'use strict';

    // ========================================
    // DOM READY
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initForms();
        initSearch();
        initEmergencyButton();
        initFadeIn();
    });

    // ========================================
    // NAVEGAÇÃO - MENU HAMBURGUER
    // ========================================
    function initNavigation() {
        const burguer = document.getElementById('burguer');
        const navs = document.querySelector('.navs');

        if (burguer && navs) {
            // Click event
            burguer.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMenu(navs, burguer);
            });

            // Keyboard support (Enter/Space)
            burguer.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMenu(navs, burguer);
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && 
                    navs.classList.contains('open') &&
                    !navs.contains(e.target) && 
                    !burguer.contains(e.target)) {
                    closeMenu(navs, burguer);
                }
            });

            // Close menu on window resize to desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768 && navs.classList.contains('open')) {
                    closeMenu(navs, burguer);
                }
            });

            // Close menu on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navs.classList.contains('open')) {
                    closeMenu(navs, burguer);
                }
            });
        }
    }

    function toggleMenu(navs, burguer) {
        navs.classList.toggle('open');
        burguer.textContent = navs.classList.contains('open') ? 'close' : 'menu';
        
        // Update aria-expanded for accessibility
        const isOpen = navs.classList.contains('open');
        burguer.setAttribute('aria-expanded', isOpen);
    }

    function closeMenu(navs, burguer) {
        navs.classList.remove('open');
        burguer.textContent = 'menu';
        burguer.setAttribute('aria-expanded', 'false');
    }

    // ========================================
    // FORMULÁRIOS - VALIDAÇÃO
    // ========================================
    function initForms() {
        // Login Form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateLoginForm(this)) {
                    showSuccessMessage('Login realizado com sucesso!');
                    setTimeout(function() {
                        window.location.href = 'home.html';
                    }, 1500);
                }
            });
        }

        // Register Form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateRegisterForm(this)) {
                    showSuccessMessage('Cadastro realizado com sucesso!');
                    setTimeout(function() {
                        window.location.href = 'login.html';
                    }, 1500);
                }
            });
        }

        // Sensor Form
        const sensorForm = document.getElementById('sensorForm');
        if (sensorForm) {
            sensorForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateSensorForm(this)) {
                    showSuccessMessage('Sensor adicionado com sucesso!');
                    this.reset();
                    // Clear any error states
                    this.querySelectorAll('.invalid').forEach(el => {
                        el.classList.remove('invalid');
                    });
                    this.querySelectorAll('.invalid-feedback.show').forEach(el => {
                        el.classList.remove('show');
                    });
                }
            });
        }
    }

    // ========================================
    // VALIDAÇÕES DE FORMULÁRIOS
    // ========================================
    function validateLoginForm(form) {
        const email = form.querySelector('#email');
        const password = form.querySelector('#password');
        let isValid = true;

        // Validate email
        if (!email.value || !isValidEmail(email.value)) {
            showError(email, 'Por favor, insira um email válido.');
            isValid = false;
        } else {
            clearError(email);
        }

        // Validate password
        if (!password.value || password.value.length < 6) {
            showError(password, 'A senha deve ter pelo menos 6 caracteres.');
            isValid = false;
        } else {
            clearError(password);
        }

        return isValid;
    }

    function validateRegisterForm(form) {
        const fullname = form.querySelector('#fullname');
        const username = form.querySelector('#username');
        const country = form.querySelector('#country');
        const email = form.querySelector('#email');
        const phone = form.querySelector('#phone');
        const password = form.querySelector('#password');
        const confirmPassword = form.querySelector('#confirm_password');
        let isValid = true;

        // Validate fullname
        if (!fullname.value || fullname.value.trim().length < 3) {
            showError(fullname, 'Por favor, insira seu nome completo (mínimo 3 caracteres).');
            isValid = false;
        } else {
            clearError(fullname);
        }

        // Validate username
        if (!username.value || username.value.trim().length < 3) {
            showError(username, 'O nome de usuário deve ter pelo menos 3 caracteres.');
            isValid = false;
        } else {
            clearError(username);
        }

        // Validate country
        if (!country.value || country.value.trim().length < 2) {
            showError(country, 'Por favor, informe seu país.');
            isValid = false;
        } else {
            clearError(country);
        }

        // Validate email
        if (!email.value || !isValidEmail(email.value)) {
            showError(email, 'Por favor, insira um email válido.');
            isValid = false;
        } else {
            clearError(email);
        }

        // Validate phone (at least 10 digits)
        const phoneClean = phone.value.replace(/\D/g, '');
        if (!phone.value || phoneClean.length < 10) {
            showError(phone, 'Por favor, insira um número de telefone válido (mínimo 10 dígitos).');
            isValid = false;
        } else {
            clearError(phone);
        }

        // Validate password
        if (!password.value || password.value.length < 6) {
            showError(password, 'A senha deve ter pelo menos 6 caracteres.');
            isValid = false;
        } else {
            clearError(password);
        }

        // Validate confirm password
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'As senhas não coincidem.');
            isValid = false;
        } else {
            clearError(confirmPassword);
        }

        return isValid;
    }

    function validateSensorForm(form) {
        const nome = form.querySelector('#nome');
        const tipo = form.querySelector('#sel');
        let isValid = true;

        if (!nome.value || nome.value.trim().length < 2) {
            showError(nome, 'Por favor, insira um nome para o sensor (mínimo 2 caracteres).');
            isValid = false;
        } else {
            clearError(nome);
        }

        if (!tipo.value || tipo.value === '') {
            showError(tipo, 'Por favor, selecione um tipo de sensor.');
            isValid = false;
        } else {
            clearError(tipo);
        }

        return isValid;
    }

    // ========================================
    // UTILITÁRIOS DE VALIDAÇÃO
    // ========================================
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        input.classList.add('invalid');
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.classList.add('show');
        }
    }

    function clearError(input) {
        input.classList.remove('invalid');
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.classList.remove('show');
        }
    }

    function showSuccessMessage(message) {
        // Create a custom success alert
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #28a745;
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 1.2rem;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            animation: slideDown 0.5s ease-out;
        `;
        alertDiv.textContent = '✅ ' + message;
        document.body.appendChild(alertDiv);

        // Remove after 3 seconds
        setTimeout(function() {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.5s';
            setTimeout(function() {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 500);
        }, 3000);
    }

    // ========================================
    // BUSCA DE USUÁRIOS
    // ========================================
    function initSearch() {
        const searchInput = document.getElementById('searchUser');
        const searchBtn = document.getElementById('searchBtn');
        const listItems = document.querySelectorAll('.list-group-item');

        function filterUsers(query) {
            const searchTerm = query.toLowerCase().trim();
            let foundCount = 0;
            
            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (searchTerm === '' || text.includes(searchTerm)) {
                    item.style.display = '';
                    foundCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide "no results" message
            const noResults = document.getElementById('noResults');
            if (searchTerm !== '' && foundCount === 0) {
                if (!noResults) {
                    const msg = document.createElement('p');
                    msg.id = 'noResults';
                    msg.style.cssText = 'text-align: center; padding: 20px; color: #666; font-size: 1.2rem;';
                    msg.textContent = '🔍 Nenhum usuário encontrado para "' + searchTerm + '"';
                    const container = document.querySelector('.lista1');
                    if (container) {
                        container.appendChild(msg);
                    }
                } else {
                    noResults.textContent = '🔍 Nenhum usuário encontrado para "' + searchTerm + '"';
                    noResults.style.display = 'block';
                }
            } else if (noResults) {
                noResults.style.display = 'none';
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                filterUsers(this.value);
            });

            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    filterUsers(this.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                if (searchInput) {
                    filterUsers(searchInput.value);
                }
            });
        }
    }

    // ========================================
    // BOTÃO DE EMERGÊNCIA
    // ========================================
    function initEmergencyButton() {
        const emergencyBtn = document.getElementById('emergencyBtn');
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', function() {
                if (confirm('⚠️ ATENÇÃO: Isso acionará os freios de emergência. Continuar?')) {
                    this.textContent = '⚠️ FREIOS ACIONADOS!';
                    this.classList.remove('btn-primary');
                    this.classList.add('btn-danger');
                    this.disabled = true;
                    
                    // Visual feedback - flash red
                    this.style.transition = 'background-color 0.3s';
                    this.style.backgroundColor = '#dc3545';
                    
                    // Show success message
                    showSuccessMessage('🚨 Freios de emergência acionados com sucesso!');
                    
                    // Reset after 5 seconds (optional)
                    setTimeout(() => {
                        this.textContent = 'Freios de Emergência';
                        this.classList.remove('btn-danger');
                        this.classList.add('btn-primary');
                        this.disabled = false;
                        this.style.backgroundColor = '';
                    }, 5000);
                }
            });
        }
    }

    // ========================================
    // ANIMAÇÕES DE ENTRADA
    // ========================================
    function initFadeIn() {
        const elements = document.querySelectorAll('.feature-card, .sensor-card');
        if (elements.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(el => observer.observe(el));
        }
    }

    // ========================================
    // CONSOLE LOG - INFORMATIVO
    // ========================================
    console.log('%c Red Rush v2.1 ', 'background: #920404; color: #fff8ef; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('🚂 Sistema de monitoramento de trens carregado com sucesso!');
    console.log('📱 Menu hamburguer funcional');
    console.log('✅ Validações de formulário ativas');

})();