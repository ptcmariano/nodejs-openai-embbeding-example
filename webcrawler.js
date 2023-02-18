const Crawler = require('crawler');

const domain = 'https://criancafelizdesorocaba.org.br/';

let pagesToSearch = [];

const c = new Crawler({
    rateLimit: 1000,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            //console.log(
                $("body").find("a[href^='" + domain + "']").each(function(i, link){
                    //console.log($(link).attr('href'), ' >>> link ', i);
                    const samelink = pagesToSearch.find(search => search == link);
                    if (!samelink) {
                        pagesToSearch.push($(link).attr('href'));
                    }
                    console.log(pagesToSearch)
                })
            //);
        }
        done();
    }
});

// Queue home page to get links to search
c.queue(domain);
// 