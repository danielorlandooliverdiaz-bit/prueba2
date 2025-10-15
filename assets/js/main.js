
$(document).ready(function () {
    // Function to show the target section and hide others
    function showSection(target) {
        // Do not do anything if target is null or undefined
        if(!target) return;
        $('main section').addClass('d-none');
        $(target).removeClass('d-none');
    }

    // Handle navigation clicks for all internal links
    $(document).on('click', 'a[href^="#"]', function (e) {
        const target = $(this).attr('href');
        if (target && target !== '#' && !$(this).data('bs-toggle')) {
            e.preventDefault();
            showSection(target);
            window.location.hash = target;
        }
    });

    // Show the initial section based on the URL hash
    if (window.location.hash) {
        showSection(window.location.hash);
    } else {
        showSection('#inicio');
    }

    // Contact form validation
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        const email = $('#email-contacto').val();
        if (validateEmail(email)) {
            // Show the confirmation modal
            var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {});
            myModal.show();
            // Clear the form
            $('#contact-form')[0].reset();
        } else {
            alert('Por favor, introduce un correo electrónico válido.');
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()[\.,;:\s@"]+(\.[^<>()[\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Project search
    $('#project-search').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase();
        $('#eventos .card').each(function () {
            const cardTitle = $(this).find('.card-title').text().toLowerCase();
            const cardText = $(this).find('.card-text').text().toLowerCase();
            if (cardTitle.includes(searchTerm) || cardText.includes(searchTerm)) {
                $(this).closest('.col-12').show();
            } else {
                $(this).closest('.col-12').hide();
            }
        });
    });
});

