/**
 * jetlagged is a jetpack extension allowing to contextually translate some selected 
 * text within any html page using the google translate API.
 *
 * Once installed, just select some text, right-click and translate it choosing the
 * target language using the "Translate" contextual menu.
 *
 * @author Nicolas Perriault <nperriault@gmail.com>
 */
jetpack.future.import("menu");
jetpack.future.import("selection");

jetpack.menu.context.page.add(function(target)({
  label: "Translate",
  icon:  "http://translate.google.com/favicon.ico",  
  menu:  new jetpack.Menu(langs),
  command: function(menuItem){
    if (!jetpack.selection.text || '' == jetpack.selection.text) {
      return jetpack.notifications.show('Empty selection');
    }
    var url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=' 
      + escape(jetpack.selection.text) + '&langpair=|' + menuItem.data;
    $.getJSON(url, function(result){
      if (result.responseStatus != 200) {
        jetpack.notifications.show('Error while trying to reach the google translation API (' + result.responseStatus + ')');
      }
      jetpack.selection.html = '<span style="background:yellow;color:black">' + result.responseData.translatedText + '</span>';
    });
  }
}));

var langs = [
  { label: 'arabic', data: 'ar' },
  { label: 'armenian', data: 'hy' },
  { label: 'bengali', data: 'bn' },
  { label: 'bulgarian', data: 'bg' },
  { label: 'chinese', data: 'zh' },
  { label: 'danish', data: 'da' },
  { label: 'dutch', data: 'nl'},  
  { label: 'english', data: 'en' },
  { label: 'filipino', data: 'tl' },
  { label: 'finnish', data: 'fi' },
  { label: 'french', data: 'fr' },
  { label: 'german', data: 'de' },
  { label: 'greek', data: 'el' },
  { label: 'hebrew', data: 'iw' },
  { label: 'hindi', data: 'hi' },
  { label: 'hungarian', data: 'hu' },
  { label: 'irish', data: 'ga' },
  { label: 'italian', data: 'it' },
  { label: 'japanese', data: 'ja' },
  { label: 'norwegian', data: 'no' },
  { label: 'polish', data: 'pl' },
  { label: 'portuguese', data: 'pt-pt' },
  { label: 'romanian', data: 'ro' },
  { label: 'russian', data: 'ru' },
  { label: 'serbian', data: 'sr' },
  { label: 'slovak', data: 'sk' },
  { label: 'slovenian', data: 'sl' },
  { label: 'spanish', data: 'es' },
  { label: 'swedish', data: 'sv' },
  { label: 'tamil', data: 'ta' },
  { label: 'thai', data: 'th' },
  { label: 'turkish', data: 'tr' },
  { label: 'ukrainian', data: 'uk' },
  { label: 'vietnamese', data: 'vi' },
];