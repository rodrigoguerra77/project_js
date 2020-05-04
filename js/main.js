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

            let publishedAt = new Date(article.publishedAt);

            let post = `<article class="post">
                            <h2>${article.title}</h2>
                            <span class="date">${publishedAt.getFullYear()}/${publishedAt.getMonth()+1}/${publishedAt.getDate()} ${publishedAt.getHours()}:${publishedAt.getMinutes()}:${publishedAt.getSeconds()}</span>
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

});