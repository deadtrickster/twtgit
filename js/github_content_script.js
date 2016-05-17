document.addEventListener("DOMContentLoaded", populateTwtButtons);
document.addEventListener('pjax:complete', populateTwtButtons);

function populateTwtButtons(){
  attachToRepository();
  attachToReleases();
  attachToIssue();
  attachToPullRequest();
}

function attachToRepository() {
  var repositoryInfo = collectRepositoryInfo();
  var info = {
    repository: repositoryInfo,
    title: 'Share Repository on Twitter',
    template_name: 'tweet_repository_template',
    url: repositoryInfo.url
  };
  var pageheadActions = document.getElementsByClassName('pagehead-actions')[0];
  pageheadActions.insertAdjacentHTML('afterbegin', '<li><a class="tweet_btn tweet_repo btn btn-sm" href="#">Tweet</a></li>');
  pageheadActions.querySelector('.tweet_repo').onclick = function (e) {
    openTweetWindow(e, info);
    return false;
  }
}

function collectRepositoryInfo () {
  return {
    title: document.querySelector('meta[name="octolytics-dimension-repository_nwo"]').content,
    description: document.querySelector('meta[name="description"]').content,
    url: 'https://github.com/' + document.querySelector('meta[name="octolytics-dimension-repository_nwo"]').content
  }
}

function attachToIssue() {
  if(document.getElementById('show_issue')) {
    var issueInfo = collectIssueInfo();
    var info = {
      repository: collectRepositoryInfo(),
      issue: issueInfo,
      title: 'Share Issue on Twitter',
      template_name: 'tweet_issue_template',
      url: issueInfo.url
    };
    var pageheadActions = document.getElementsByClassName('gh-header-actions')[0];
    pageheadActions.insertAdjacentHTML('afterbegin', '<a class="tweet_btn tweet_issue btn btn-sm" href="#">Tweet Issue</a>');
    pageheadActions.querySelector('.tweet_issue').onclick = function (e) {
      openTweetWindow(e, info);
      return false;
    }
  }
}

function collectIssueInfo() {
  return {
    title: document.getElementsByClassName('js-issue-title')[0].innerText,
    number: document.getElementsByClassName('gh-header-number')[0].innerText,
    url: 'https://github.com'+window.location.pathname//document.querySelector('meta[property="og:url"]').content
  }
}

function attachToPullRequest() {
  if(document.getElementsByClassName('pull-request-tab-content').length > 0) {
    var prInfo = collectPRInfo();
    var info = {
      repository: collectRepositoryInfo(),
      pr: prInfo,
      title: 'Share PR on Twitter',
      template_name: 'tweet_pr_template',
      url: prInfo.url
    };
    var pageheadActions = document.getElementsByClassName('gh-header-actions')[0];
    pageheadActions.insertAdjacentHTML('afterbegin', '<a class="tweet_btn tweet_pull_request btn btn-sm" href="#">Tweet PR</a>');
    pageheadActions.querySelector('.tweet_pull_request').onclick = function (e) {
      openTweetWindow(e, info);
      return false;
    }
  }
}

function collectPRInfo() {
  return {
    title: document.getElementsByClassName('js-issue-title')[0].innerText,
    number: document.getElementsByClassName('gh-header-number')[0].innerText,
    url: 'https://github.com'+window.location.pathname//document.querySelector('meta[property="og:url"]').content
  }
}

function attachToReleases() {
  var releases = document.getElementsByClassName('release-body');
  for(var i = 0; i < releases.length; i++) {
    attachTweetRelease(releases[i]);
  }
}

function attachTweetRelease(release) {
  var repositoryInfo = collectRepositoryInfo();
  var releaseInfo = collectReleaseInfo(release);
  var info = {
    repository: repositoryInfo,
    release: releaseInfo,
    title: 'Share Release on Twitter',
    template_name: 'tweet_release_template',
    url: releaseInfo.url
  };
  var editButton = release.getElementsByClassName('release-edit')[0];
  var twtButton = editButton.insertAdjacentHTML('afterend', '<a class="tweet_btn tweet_release btn btn-sm" href="#">Tweet</a>');
  release.querySelector('.tweet_release').onclick = function (e) {
    openTweetWindow(e, info);
    return false;
  }
}

function collectReleaseInfo (release) {
  return {
    title: release.querySelector('.release-title > a').innerText,
    url: release.querySelector('.release-title > a').href
  }
}