// Navbar Scroll Effect
$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('bg-white shadow-md');
    } else {
        $('.navbar').removeClass('bg-white shadow-md');
    }
});

// Toggle Between Login and Signup Forms
$(document).ready(function () {
    $('.toggle-form').click(function (e) {
        e.preventDefault();
        $('#login-form').parent().toggleClass('hidden');
        $('#signup-form-container').toggleClass('hidden');
        // Add animation
        $('.auth-section form').removeClass('animate__fadeIn').addClass('animate__animated animate__fadeIn');
    });

    // Password Visibility Toggle
    $('.toggle-password').click(function () {
        const input = $(this).siblings('input');
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);
        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    // Login Form Validation
    $('#login-form').submit(function (e) {
        const username = $('#login-username').val().trim();
        const password = $('#login-password').val().trim();

        if (!username || !password) {
            e.preventDefault();
            alert('Please fill in all fields.');
            return;
        }

        // Show loading animation
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

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        // Password strength check
        if (password.length < 8) {
            e.preventDefault();
            alert('Password must be at least 8 characters long.');
            return;
        }

        // Password match check
        if (password !== passwordConfirm) {
            e.preventDefault();
            alert('Passwords do not match.');
            return;
        }

        // Show loading animation
        showLoading();
    });

    // Loading Animation
    function showLoading() {
        const loading = $('<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"><div class="text-white text-lg font-semibold">Loading... <i class="fas fa-paw animate__animated animate__bounce animate__infinite"></i></div></div>');
        $('body').append(loading);
        setTimeout(() => loading.remove(), 3000); // Remove after 3 seconds (adjust as needed)
    }
});
