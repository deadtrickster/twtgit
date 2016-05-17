// Saves options to chrome.storage
function save_options() {
  var tweet_repository_template = document.getElementById('tweet_repository_template').value;
  var tweet_issue_template = document.getElementById('tweet_issue_template').value;
  var tweet_pr_template = document.getElementById('tweet_pr_template').value;
  var tweet_release_template = document.getElementById('tweet_release_template').value;
  chrome.storage.sync.set({
    tweet_repository_template: tweet_repository_template,
    tweet_issue_template: tweet_issue_template,
    tweet_pr_template: tweet_pr_template,
    tweet_release_template: tweet_release_template
  }, function() {
       // Update status to let user know options were saved.
       var status = document.getElementById('status');
       status.textContent = 'Options saved.';
       setTimeout(function() {
         status.textContent = '';
       }, 750);
     });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    tweet_repository_template: twtGitDefaults.templates.tweet_repository_template,
    tweet_issue_template: twtGitDefaults.templates.tweet_issue_template,
    tweet_pr_template: twtGitDefaults.templates.tweet_pr_template,
    tweet_release_template: twtGitDefaults.templates.tweet_release_template
  }, function(items) {
       document.getElementById('tweet_repository_template').value = items.tweet_repository_template;
       document.getElementById('tweet_issue_template').value = items.tweet_issue_template;
       document.getElementById('tweet_pr_template').value = items.tweet_pr_template;
       document.getElementById('tweet_release_template').value = items.tweet_release_template;
     });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);