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
  label: "Translate to...",
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
        return jetpack.notifications.show('Error while trying to reach the google translation API (' + result.responseStatus + ')');
      }
      return jetpack.selection.html = '<span style="background:yellow;color:black">' + result.responseData.translatedText + '</span>';
    });
  }
}));

var langs = [
  { label: 'Arabic', data: 'ar' },
  { label: 'Armenian', data: 'hy' },
  { label: 'Bengali', data: 'bn' },
  { label: 'Bulgarian', data: 'bg' },
  { label: 'Chinese', data: 'zh' },
  { label: 'Danish', data: 'da' },
  { label: 'Dutch', data: 'nl'},  
  { label: 'English', data: 'en' },
  { label: 'Filipino', data: 'tl' },
  { label: 'Finnish', data: 'fi' },
  { label: 'French', data: 'fr' },
  { label: 'German', data: 'de' },
  { label: 'Greek', data: 'el' },
  { label: 'Hebrew', data: 'iw' },
  { label: 'Hindi', data: 'hi' },
  { label: 'Hungarian', data: 'hu' },
  { label: 'Irish', data: 'ga' },
  { label: 'Italian', data: 'it' },
  { label: 'Japanese', data: 'ja' },
  { label: 'Norwegian', data: 'no' },
  { label: 'Polish', data: 'pl' },
  { label: 'Portuguese', data: 'pt-pt' },
  { label: 'Romanian', data: 'ro' },
  { label: 'Russian', data: 'ru' },
  { label: 'Serbian', data: 'sr' },
  { label: 'Slovak', data: 'sk' },
  { label: 'Slovenian', data: 'sl' },
  { label: 'Spanish', data: 'es' },
  { label: 'Swedish', data: 'sv' },
  { label: 'Tamil', data: 'ta' },
  { label: 'Thai', data: 'th' },
  { label: 'Turkish', data: 'tr' },
  { label: 'Ukrainian', data: 'uk' },
  { label: 'Vietnamese', data: 'vi' },
];