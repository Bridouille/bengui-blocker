$(document).ready(function () {
  $('#submit-add').on('click', function (e) {
    var username = $('#username-add').val()

    if (username.length < 3 || !/^[0-9a-zA-Z\.]+$/.test(username)) {
      return ($('#username-add').focus())
    }

    usernames.addUsername(username, function () {
      $('#username-add').val('')
      $('#blocked-persons').append($('<li/>', {
        'class': 'list-group-item',
        'text': username
      })
        .append($('<span/>', {
          'class': 'badge',
          'text': 'X'
        })))
    })
  })

  $('#blocked-persons').click(function (e) {
    if ($(e.target).is($('.badge'))) {
      var username = $(e.target).parent().text().slice(0, -1)

      usernames.removeUsername(username, function () {
        $(e.target).parent().fadeOut(400, function () {
          $(this).remove()
        })
      })
    }
  })

  $('#post-enabled').on('change', function () {
    usernames.setPostsState($(this).is(':checked'))
  })

  $('#comment-enabled').on('change', function () {
    usernames.setCommentsState($(this).is(':checked'))
  })

  $('#messenger-enabled').on('change', function () {
    usernames.setMessengerState($(this).is(':checked'))
  })

  var usernames = new updateOptions()

  usernames.init()
})
