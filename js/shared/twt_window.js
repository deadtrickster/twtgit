function constructTwtText(info, template_name, callback) {
  var getParam = {};
  getParam[template_name] = twtGitDefaults.templates[template_name];
  chrome.storage.sync.get(getParam, function(items) {
    var template = Handlebars.compile(items[template_name]);
    callback(template(info));
  });
}

function constructTwtUrl(text, url) {
  return 'https://twitter.com/intent/tweet?text=' + encodeURI(text) + '&tw_p=tweetbutton&url=' + encodeURI(url) + '&via=twtGit';
}

function openTweetWindow(e, info) {
  var mouseX=e.pageX - 300;
  var mouseY=e.pageY - 150;
  constructTwtText(info, info.template_name, function(twtText) {
    window.open(constructTwtUrl(twtText, info.url), info.title,'width=600, height=300, top=' + mouseY + ', left=' + mouseX);
  });
}