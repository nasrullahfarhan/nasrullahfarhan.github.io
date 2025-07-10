$(document).ready(function () {
    // Navbar Scroll Effect
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('bg-white shadow-md');
        } else {
            $('.navbar').removeClass('bg-white shadow-md');
        }
    });

    // Toggle Between Login and Signup Forms
    $('.toggle-form').click(function (e) {
        e.preventDefault();
        const $loginForm = $('#login-form').parent();
        const $signupForm = $('#signup-form-container');
        
        // Toggle visibility with animation
        if ($signupForm.hasClass('hidden')) {
            $loginForm.addClass('hidden').removeClass('animate__fadeIn');
            $signupForm.removeClass('hidden').addClass('animate__animated animate__fadeIn');
        } else {
            $signupForm.addClass('hidden').removeClass('animate__fadeIn');
            $loginForm.removeClass('hidden').addClass('animate__animated animate__fadeIn');
        }

        // Ensure only one form is visible on mobile
        if ($(window).width() <= 768) {
            $loginForm.toggleClass('hidden');
            $signupForm.toggleClass('hidden');
        }
    });

    // Password Visibility Toggle
    $('.toggle-password').click(function () {
        const $input = $(this).siblings('input');
        const type = $input.attr('type') === 'password' ? 'text' : 'password';
        $input.attr('type', type);
        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    // Login Form Validation
    $('#login-form').submit(function (e) {
        const username = $('#login-username').val().trim();
        const password = $('#login-password').val().trim();

        if (!username || !password) {
            e.preventDefault();
            alert('Please fill in both username and password.');
            return;
        }

        showLoading();
    });

    // Signup Form Validation
    $('#signup-form').submit(function (e) {
        const username = $('#signup-username').val().trim();
        const email = $('#signup-email').val().trim();
        const password = $('#signup-password').val().trim();
        const passwordConfirm = $('#signup-password-confirm').val().trim();

        if (!username || !email || !password || !passwordConfirm) {
            e.preventDefault();
            alert('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            e.preventDefault();
            alert('Password must be at least 8 characters long.');
            return;
        }

        if (password !== passwordConfirm) {
            e.preventDefault();
            alert('Passwords do not match.');
            return;
        }

        showLoading();
    });

    // Loading Animation
    function showLoading() {
        // Remove existing loading animation if any
        $('.loading').remove();

        const loading = $('<div class="loading"><div>Loading... <i class="fas fa-paw animate__animated animate__bounce animate__infinite"></i></div></div>');
        $('body').append(loading);
        loading.addClass('show');

        // Remove after 3 seconds or on form submission completion
        setTimeout(() => {
            loading.removeClass('show').remove();
        }, 3000);
    }
});
