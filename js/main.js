$(document).ready(function(){
    
    // Slider
    $('.bxslider').bxSlider({
        mode: 'fade',
        captions: true,
        pager: false,
        slideWidth: 1200,
        auto: true,
        responsive: true
    });

    // Posts
    var posts = $('#posts');
    var loading = $('.main-loader');

    fetch('http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f6aac9d7150c454a98aa2d2949d39181')
        .then(articles => articles.json())
        .then(response => {

            listArticles(response.articles);

        }).catch(error => {
            console.log(error);

            let errorMessage = `<div class="error-message">
                                    <span class="error-text">Ha ocurrido un error, los artículos no se pudieron cargar.</span>
                                </div>`;
            
            posts.append(errorMessage);

            loading.hide();
        });

    function listArticles(articles) {

        articles.map((article, i) => {

            let publishedAt = moment(article.publishedAt);

            let post = `<article class="post">
                            <h2>${article.title}</h2>
                            <span class="date">${publishedAt.format("MMMM D YYYY")}</span>
                            <p>
                                ${article.description}
                            </p>
                            <a href="${article.url}" class="button-more">Leer más</a>
                        </article>
                        <hr>`;

            posts.append(post);

            loading.hide();
        });

    }

    // Themes
    var theme = $("#theme");

    $("#to-blue").click(function() {
        theme.attr("href", "css/blue.css");
    });

    $("#to-red").click(function() {
        theme.attr("href", "css/red.css");
    });

    $("#to-green").click(function() {
        theme.attr("href", "css/green.css");
    });

    // Scroll up
    $('.up').click(function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 500);

        return false;
    });

    // Login False
    var form = $("#login form");

    form.submit(function() {
        let name = $("#name").val();
        let email = $("#email").val();
        let password = $("#password").val();

        let user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));
    });

    var user = JSON.parse(localStorage.getItem("user"));

    if(user != null && user != "undefined"){
        let about = $("#about p");
        about.html("<br><strong>Bienvenido, " + user.name + "</strong>");
        about.append("<br><a href='#' id='logout'>Cerrar Sesión</a>")
        form.parent().hide();

        $("#logout").click(function() {
            localStorage.removeItem("user");
            location.reload();
        });
    }

});