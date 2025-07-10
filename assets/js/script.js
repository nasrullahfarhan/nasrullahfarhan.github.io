// Function to get CSRF token from the cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

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

    // Login Form Validation and Submission
    $('#login-form').submit(function (e) {
        e.preventDefault(); // Prevent default form submission
        const username = $('#login-username').val().trim();
        const password = $('#login-password').val().trim();

        if (!username || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Show loading animation
        showLoading();

        // Submit form via AJAX
        $.ajax({
            url: 'https://dhakaknots.pythonanywhere.com/accounts/login/',
            type: 'POST',
            data: {
                username: username,
                password: password,
                csrfmiddlewaretoken: csrftoken
            },
            success: function (response) {
                // Remove loading animation
                $('.loading').remove();
                if (response.success) {
                    window.location.href = 'https://dhakaknots.pythonanywhere.com'; // Redirect to home on success
                } else {
                    alert(response.message || 'Login failed. Please try again.');
                }
            },
            error: function (xhr) {
                $('.loading').remove();
                alert('An error occurred. Please try again.');
                console.error(xhr);
            }
        });
    });

    // Signup Form Validation and Submission
    $('#signup-form').submit(function (e) {
        e.preventDefault(); // Prevent default form submission
        const username = $('#signup-username').val().trim();
        const email = $('#signup-email').val().trim();
        const password = $('#signup-password').val().trim();
        const passwordConfirm = $('#signup-password-confirm').val().trim();

        if (!username || !email || !password || !passwordConfirm) {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Password strength check
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        // Password match check
        if (password !== passwordConfirm) {
            alert('Passwords do not match.');
            return;
        }

        // Show loading animation
        showLoading();

        // Submit form via AJAX
        $.ajax({
            url: 'https://dhakaknots.pythonanywhere.com/accounts/signup/',
            type: 'POST',
            data: {
                username: username,
                email: email,
                password: password,
                password_confirm: passwordConfirm,
                csrfmiddlewaretoken: csrftoken
            },
            success: function (response) {
                $('.loading').remove();
                if (response.success) {
                    window.location.href = 'https://dhakaknots.pythonanywhere.com'; // Redirect to home on success
                } else {
                    alert(response.message || 'Signup failed. Please try again.');
                }
            },
            error: function (xhr) {
                $('.loading').remove();
                alert('An error occurred. Please try again.');
                console.error(xhr);
            }
        });
    });

    // Loading Animation
    function showLoading() {
        const loading = $('<div class="loading"><div class="text-white text-lg font-semibold">Loading... <i class="fas fa-paw animate__animated animate__bounce animate__infinite"></i></div></div>');
        $('body').append(loading);
        setTimeout(() => $('.loading').remove(), 3000); // Remove after 3 seconds
    }
});
