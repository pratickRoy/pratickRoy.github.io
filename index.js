$(function() {
    window.location.replace("http://pratickroy.github.io/webapp");
});

function legacy_js() {

    var $content = $('#praticr-posts');
    var data = {
        rss_url: 'https://medium.com/feed/@pratickRoy'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
        if (response.status == 'ok') {
            var output = '';
            response.items.sort(function(a, b) {
                return a.categories.indexOf("android") == -1 ? 1 : -1;
            });
            $.each(response.items, function (k, item) {

                // Dont show posts without differnt Title
                if(item.title.substr(0, item.title.length -1) == ($(item.description).eq(0).text().substr(0, item.title.length -1))) {
                    return true;
                }
                // Dont show posts without categories
                if(item.categories.length == 0) {
                    return true;
                }
                var date = $.format.date(item.pubDate, "dd");
                var textDescription = $(item.description).filter("p:first").html();
                if(textDescription.length > 300) {
                    textDescription = textDescription.substr(0, 300)
                }

                output += '<li class="praticr-post">';
                output += '<div class="praticr-post praticr-centered col-sm-10 col-md-8">'
                output += '<h4><a class="praticr-post-title post-link" href="'+ item.link + '">' + item.title + '</a></h4>'
                output += '<h4 class="date praticr-post-meta">' + date + ordinal_suffix_of(date) + $.format.date(item.pubDate, " MMMM, yyyy") + "</h4>";
                output += '<p>' + textDescription + '...</p>';
                output += '<a class="praticr-button" href="'+ item.link +'">Read More</a>'
                output += '</div>'
                output += '</li>';
            });
            $content.html(output);
        }
    });
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st".sup();
    }
    if (j == 2 && k != 12) {
        return "nd".sup();
    }
    if (j == 3 && k != 13) {
        return "rd".sup();
    }
    return "th".sup();
}
