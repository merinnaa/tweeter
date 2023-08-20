/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

//const { text } = require("body-parser");

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function (tweets) {
    // loops through tweets
    let container = $('#tweets-container').empty();
    // const $tweetArticle = $("<article>").addClass("tweet-container");
    // const $tweetContent = $("<p>").addClass("tweet-content").text(tweets.content);
    // $tweetArticle.append($tweetContent);
    tweets.forEach((tweet) => {

      // calls createTweetElement for each tweet
      const $tweetElement = createTweetElement(tweet);
      // const tweetTime = (tweet.created_at).fromNow();
      // const $timestamp = $tweetElement.find('.timeago');
      // $timestamp.text(timeago.format(tweets.created_at));

      // takes return value and appends it to the tweets container
      container.prepend($tweetElement);
    });

  };

  const createTweetElement = function (tweet) {

  
    
    let $tweet = `<article class="tweet-container">
  <header class="tweet-header">
    <div class="user-info">
      <img src="${tweet.user.avatars}" alt="User Avatar">
      <h3 class="username">${tweet.user.name}</h3>
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

    return $tweet;
  };

  $("form").on("submit", function (event) {
    event.preventDefault();
    // Get the tweet content from the form
    const tweetContent = $(this).find("textarea[name='text']").val();
    const $errorMessage = $(".error-message"); // Select the error message element

    // Hide the error message before validation
    $errorMessage.hide();
    // Perform validation checks
    if (!tweetContent || tweetContent.trim() === "") {
      // Display an error message if tweet content is empty
      // alert("Tweet content cannot be empty.");
      $errorMessage.text("Tweet content cannot be empty.").slideDown();
      return; // Stop further execution
    }

    if (tweetContent.length > 140) {
      // Display an error message if tweet content exceeds the character limit
      //alert("Tweet content is too long. Maximum 140 characters allowed.");
      $errorMessage.text("Tweet content is too long. Maximum 140 characters allowed.").slideDown();

      return; // Stop further execution
    }
    const dataForm = $(this).serialize();
    $.post('/tweets', dataForm)
      .then((response) => {
        loadTweets();
        // Call loadTweets to fetch updated tweets from the server
        loadTweets();
        // Clear the form
        $(this)[0].reset();
        // Handle success response from the server
        console.log('success:', response);
      });
  });

  const loadTweets = function () {
    $.get('/tweets')
      .then((response) => {
        //$('tweetContent').empty();
        //$tweetContent.val('');
        // Call renderTweets with the received JSON response
        renderTweets(response);
        $('#tweets-container').prepend(createTweetElement(response[response.length - 1]));
      });

  };

  loadTweets();
  renderTweets(data);
});