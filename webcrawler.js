const Crawler = require('crawler');

const domain = 'https://criancafelizdesorocaba.org.br/';

let pagesToSearch = [];

const crawl = new Crawler({
    rateLimit: 1000,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            searchLinksToRead($);
            queuePagesToRead();
            // todo: get all content
        }
        done();
    }
});

crawl.queue(domain);

const searchLinksToRead = ($) => {
    try {
        $("body").find("a[href^='" + domain + "']").each(function(i, link){
            // no search pdf and mp4
            if ($(link).attr('href').indexOf('.mp4') > 0 || 
                $(link).attr('href').indexOf('.pdf') > 0) {
                return;
            }
            // find same link in pages to search
            const samelink = pagesToSearch.find(search => search.link == $(link).attr('href'));
            if (!samelink) {
                pagesToSearch.push({
                    'link': $(link).attr('href'),
                    read: false
                });
            }
        });
    } catch (error) {
        // ignore pages cant search
    }
}

const queuePagesToRead = () => {
    pagesToSearch.map((page,index) => {
        if (!page.read) {
            console.log('read page: '+page.link)
            pagesToSearch[index].read = true;
            crawl.queue(page.link);
        }
    });
}