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

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

$(document).ready(function() {

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

  const renderTweets = function(tweets) {
    // loops through tweets
    let container = $('#tweets-container').empty();
    tweets.forEach((tweet) => {

      // calls createTweetElement for each tweet
      const $tweetElement = createTweetElement(tweet);
      // const tweetTime = (tweet.created_at).fromNow();


      // takes return value and appends it to the tweets container
      container.prepend($tweetElement);
    });

  };

  const createTweetElement = function(tweet) {

    const ago = timeago.format();
    let $tweet = `<article class="tweet-container">
  <header class="tweet-header">
    <div class="user-info">
      <img src="${tweet.user.avatars}" alt="User Avatar">
      <h3 class="username">${tweet.user.name}</h3>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <div class="tweet-content">
    <p>${tweet.content.text}</p>
  </div>
  <footer class="tweet-footer">
  <span>${ago}</span>
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

  $("form").on("submit", function(event) {
    event.preventDefault();
    const dataForm = $(this).serialize();
    $.post('/tweets', dataForm)
      .then((response) => {
        // Handle success response from the server
        console.log('success:', response);
      });
  });

  const loadTweets = function() {
    $.get('/tweets')
      .then((response) => {
        // Call renderTweets with the received JSON response
        renderTweets(response);
      });


  };
  loadTweets();
  renderTweets(data);
});