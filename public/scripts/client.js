/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  const renderTweets = function (tweets) {

    // loops through tweets
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      createTweetElement(tweet);
    }
  };




  const createTweetElement = function (tweet) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    console.log("text");
    let $tweet = `<article class="tweet-container">
  <header class="tweet-header">
    <div class="tweet-avator-box">
      <img class="tweet-avator" src="${tweet.user.avatars}" alt="User Avatar">
      <h5 class="tweet-username">${tweet.user.name}</h5>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <div class="tweet-content">
  <!-- Apply XSS-escaped content to the <p> element -->
   <p>${escape(tweet.content.text)}</p>
  </div>
  <footer class="tweet-footer">
  <span class="timeago">${timeago.format(tweet.created_at)}</span>
    <div class="tweet-icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>
`;

    $('#tweets-container').prepend($tweet);
  };

  $("form").on("submit", function (event) {
    event.preventDefault();
    // Get the tweet content from the form
    const tweetContent = $("#tweet-text").val();
    const $errorMessage = $(".error-message"); // Select the error message element
    console.log(tweetContent);
    // Hide the error message before validation
    $errorMessage.hide();

    // Perform validation checks
    if (!tweetContent || tweetContent.trim() === "") {
      // Display an error message if tweet content is empty
      $errorMessage.text("Tweet content cannot be empty.").slideDown();
      return; // Stop further execution
    }

    if (tweetContent.length > 140) {
      // Display an error message if tweet content exceeds the character limit

      $errorMessage.text("Tweet content is too long. Maximum 140 characters allowed.").slideDown();

      return; // Stop further execution
    }
    
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
    }).then(loadTweets);
    $(this)[0].reset();
    // Reset the character counter
    $(this).find(".counter").text("140");
  });

  const loadTweets = function () {
    $("#tweet-text").val("");
    $.ajax('/tweets',
      { method: 'GET' }).then(renderTweets);
  };

  loadTweets();
});