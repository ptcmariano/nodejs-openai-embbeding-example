const Crawler = require('crawler');
const fs = require('fs');

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
            saveTextPage($('#content').text(),$('title').text())
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

const saveTextPage = (text, page) => {
    // Create a directory to store the text files
    if (!fs.existsSync("text/")) {
        fs.mkdirSync("text/");
    }
    const writeStream = fs.createWriteStream("text/"+page.slugify("_")+".txt");
    writeStream.write(remove_newlines(text));
    writeStream.end();
}

String.prototype.slugify = function (separator = "-") {
    return this
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, separator);
};

function remove_newlines(serie) {
    serie = serie.replace(/\\n/g, ' ');
    serie = serie.replace(/  /g, ' ');
    serie = serie.replace(/\t+/g, ' ');
    return serie;
}
