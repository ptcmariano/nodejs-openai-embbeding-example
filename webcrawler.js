const Crawler = require('crawler');

const domain = 'https://criancafelizdesorocaba.org.br/';

let pagesToSearch = [];

const c = new Crawler({
    rateLimit: 1000,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            $("body").find("a[href^='" + domain + "']").each(function(i, link){
                const samelink = pagesToSearch.find(search => search == $(link).attr('href'));
                console.log($(link).attr('href'), samelink)
                if (!samelink) {
                    pagesToSearch.push($(link).attr('href'));
                }
                // todo: fill pages read
            });
        }
        done();
    }
});

c.queue(domain);
// todo: function to get more pages to read