/**
 * ========================================
 * Red Rush - Main JavaScript
 * Versão 2.0 - Otimizado e Funcional
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
    });

    // ========================================
    // NAVEGAÇÃO - MENU HAMBURGUER
    // ========================================
    function initNavigation() {
        const burguer = document.getElementById('burguer');
        const navs = document.querySelector('.navs');

        if (burguer && navs) {
            burguer.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMenu(navs);
            });

            burguer.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMenu(navs);
                }
            });

            // Fecha menu ao clicar fora
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && 
                    !navs.contains(e.target) && 
                    !burguer.contains(e.target)) {
                    navs.classList.remove('open');
                    burguer.textContent = 'menu';
                }
            });

            // Fecha menu em resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768 && navs.classList.contains('open')) {
                    navs.classList.remove('open');
                    burguer.textContent = 'menu';
                }
            });
        }
    }

    function toggleMenu(navs) {
        const burguer = document.getElementById('burguer');
        navs.classList.toggle('open');
        burguer.textContent = navs.classList.contains('open') ? 'close' : 'menu';
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
                    alert('Login realizado com sucesso!');
                    // Redirecionar para home
                    window.location.href = 'home.html';
                }
            });
        }

        // Register Form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateRegisterForm(this)) {
                    alert('Cadastro realizado com sucesso!');
                    // Redirecionar para login
                    window.location.href = 'login.html';
                }
            });
        }

        // Sensor Form
        const sensorForm = document.getElementById('sensorForm');
        if (sensorForm) {
            sensorForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateSensorForm(this)) {
                    alert('Sensor adicionado com sucesso!');
                    this.reset();
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
            showError(fullname, 'Por favor, insira seu nome completo.');
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

        // Validate phone
        if (!phone.value || phone.value.trim().length < 10) {
            showError(phone, 'Por favor, insira um número de telefone válido.');
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
        const local = form.querySelector('#local');
        let isValid = true;

        if (!nome.value || nome.value.trim().length < 2) {
            showError(nome, 'Por favor, insira um nome para o sensor.');
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

    // ========================================
    // BUSCA DE USUÁRIOS
    // ========================================
    function initSearch() {
        const searchInput = document.getElementById('searchUser');
        const searchBtn = document.getElementById('searchBtn');
        const listItems = document.querySelectorAll('.list-group-item');

        function filterUsers(query) {
            const searchTerm = query.toLowerCase().trim();
            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (searchTerm === '' || text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
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
                if (confirm('ATENÇÃO: Isso acionará os freios de emergência. Continuar?')) {
                    this.textContent = '⚠️ FREIOS ACIONADOS!';
                    this.classList.remove('btn-primary');
                    this.classList.add('btn-danger');
                    this.disabled = true;
                    
                    // Simula um alerta
                    setTimeout(() => {
                        alert('🚨 Freios de emergência acionados com sucesso!');
                    }, 500);
                }
            });
        }
    }

    // ========================================
    // ANIMAÇÕES DE ENTRADA
    // ========================================
    // Adiciona classe fade-in a elementos ao entrar na viewport
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

    // Inicia fade-in com pequeno delay para garantir que o DOM esteja pronto
    setTimeout(initFadeIn, 100);

    // ========================================
    // CONSOLE LOG - INFORMATIVO
    // ========================================
    console.log('%c Red Rush v2.0 ', 'background: #920404; color: #fff8ef; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('🚂 Sistema de monitoramento de trens carregado com sucesso!');

})();