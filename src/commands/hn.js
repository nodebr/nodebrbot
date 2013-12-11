/*
 * Apresenta uma notícia da home do Hacker News
 * https://news.ycombinator.com/
 *
 * !hn top    - apresenta a notícia com mais pontos
 * !hn random - apresenta uma notícia aleatória
 *
 * TODO: Utilizar alguma API (mesmo que não oficial)
 * do Hacker News para evitar fazer scraping
 */

var scrap = require('scrap');

var hn = function(bot, data, nick, args, end) {

  var param = args[0];

  if (args.length > 1 || (param !== 'top' && param !== 'random')) {
    bot.message('Comando inválido. Exemplos: !hn top | !hn random');
    return false;
  }

  scrap('https://news.ycombinator.com', function(err, $) {
    if (err) {
      bot.message('Erro ao requisitar Hacker News');
      return false;
    }

    var news = {};
    var currentItem = {};

    $('tr').each(function() {
      if (currentItem.done) {
        news[currentItem.points] = currentItem;
        currentItem = {};
      }

      if ($(this).find('td.title a').length == 1) {
        currentItem.title = $(this).find('td.title a').text();
        currentItem.url = $(this).find('td.title a').attr('href');
      }

      if ($(this).find('td.subtext').length == 1) {
        var subtext = $(this).find('td.subtext').text().split(' ');
        currentItem.points = parseInt(subtext[0]);
        if (!isNaN(subtext[subtext.length - 2])) {
          currentItem.comments = parseInt(subtext[subtext.length - 2]);
        } else {
          currentItem.comments = 0;
        }
        currentItem.done = true;
      }
    });

    function printItem(item) {
      bot.message(item.title);
      bot.message('Link: ' + item.url);
      bot.message('Pontos: ' + item.points + ' | Comentários: ' + item.comments);
      end();
    }

    var keyPoints = Object.keys(news);

    if (param === 'top') {
      var topItemKey = keyPoints[keyPoints.length - 1];
      var topItem = news[topItemKey];
      printItem(topItem);
    } else {
      var randomKey = keyPoints[Math.floor(Math.random() * keyPoints.length)];
      var randomItem = news[randomKey];
      printItem(randomItem);
    }
  });

};

exports.run = hn;