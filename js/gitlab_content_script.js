document.addEventListener("DOMContentLoaded", populateTwtButtons);
document.addEventListener('page:update', populateTwtButtons);

function populateTwtButtons(){
  attachToRepository();
  //attachToReleases();
  attachToIssue();
  attachToPullRequest();
}

function attachToRepository() {
  if(document.getElementsByClassName('project-home-panel').length > 0) {
    var repositoryInfo = collectRepositoryInfo();
    var info = {
      repository: repositoryInfo,
      title: 'Share Repository on Twitter',
      template_name: 'tweet_repository_template',
      url: repositoryInfo.url
    };
    var pageheadActions = document.getElementsByClassName('split-one count-buttons')[0];
    pageheadActions.insertAdjacentHTML('afterbegin', '<a class="tweet_btn tweet_repo btn" href="#">Tweet</a>');
    pageheadActions.querySelector('.tweet_repo').onclick = function (e) {
      openTweetWindow(e, info);
      return false;
    }
  }
}

function collectRepositoryInfo () {
  return {
    title: document.getElementsByClassName('project-item-select-holder')[0].getAttribute('href').substring(1),
    description: document.querySelector('meta[property="og:description"]').content,
    url: document.querySelector('meta[property="og:url"]').content
  }
}

function attachToIssue() {
  if(document.getElementsByClassName('issue-details').length > 0 &&
     document.getElementsByClassName('tweet_issue').length < 1) {
    var issueInfo = collectIssueInfo();
    var info = {
      repository: collectRepositoryInfo(),
      issue: issueInfo,
      title: 'Share Issue on Twitter',
      template_name: 'tweet_issue_template',
      url: issueInfo.url
    };
    var pageheadActions = document.getElementsByClassName('detail-page-header')[0];
    pageheadActions.insertAdjacentHTML('afterbegin', '<a class="tweet_btn tweet_issue btn" href="#">Tweet Issue</a>');
    pageheadActions.querySelector('.tweet_issue').onclick = function (e) {
      openTweetWindow(e, info);
      return false;
    }
  }
}

function collectIssueInfo() {
  return {
    title: document.querySelector('.issue-details .title').innerText,
    number: document.querySelector('.issuable-header .identifier').innerText,
    url: 'https://gitlab.com'+window.location.pathname//document.querySelector('meta[property="og:url"]').content
  }
}

function attachToPullRequest() {
  if(document.getElementsByClassName('merge-request').length > 0 &&
     document.getElementsByClassName('tweet_merge_request').length < 1) {
    var prInfo = collectPRInfo();
    var info = {
      repository: collectRepositoryInfo(),
      pr: prInfo,
      title: 'Share PR on Twitter',
      template_name: 'tweet_pr_template',
      url: prInfo.url
    };
    var pageheadActions = document.getElementsByClassName('detail-page-header')[0];
    pageheadActions.insertAdjacentHTML('afterbegin', '<a class="tweet_btn tweet_merge_request btn" href="#">Tweet MR</a>');
    pageheadActions.querySelector('.tweet_merge_request').onclick = function (e) {
      openTweetWindow(e, info);
      return false;
    }
  }
}

function collectPRInfo() {
  return {
    title: document.querySelector('.merge-request .title').innerText,
    number:  document.querySelector('.issuable-header .identifier').innerText,
    url: 'https://gitlab.com'+window.location.pathname//document.querySelector('meta[property="og:url"]').content
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
  var twtButton = editButton.insertAdjacentHTML('afterend', '<a class="tweet_btn tweet_release btn" href="#">Tweet</a>');
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