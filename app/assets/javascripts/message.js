$(document).on('turbolinks:load', function() {
  const buildHTML = function (message) {
    const image = message.image ? `<img class="lower-message__image" src="${message.image}">` : "" ;
    const html = `<div class="message" data-message_id="${message.id}">
                    <div class="upper-message">
                      <p class="upper-message__user-name">${message.user_name}</p>
                      <p class="upper-message__date">${message.created_at}</p>
                    </div>
                    <div class="lower-message">
                    <p class="lower-message__content">${message.content}</p>
                    ${image}
                    </div>
                  </div>`
    return html;
  }

//   var reloadMessages = function() {
//     if (window.location.href.match(/\/groups\/\d+\/messages/)){
//       var latestId = $('.message:last').data("message_id");
//       const groupId  = $('.header-left__title').data('group_id');
//       // var group_id = $('.header-left__title').data("group_id");
//       $.ajax({
//         url: `/groups/${groupId}/api/messages`,
//         type: 'get',
//         dataType: 'json',
//         data: {latest_id: latestId, group_id: groupId}
//       })
//       .done(function(newMessages) {
//         $.each(newMessages, function(message) { 
//           $('.messages').append(buildHTML(message));
//         });
//         $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
//       })
//       .fail(function() {
//         alert('自動更新に失敗しました');
//       });
//     };
//   };
// setInterval(reloadMessages, 5000);

  function reloadMessages() {
    const latestId = $('.message:last').data('message_id') || 0;
    $.ajax({
      url: `/groups/${groupId}/api/messages`,
      data: {
        latest_id: latestId,
        group_id:  groupId
      },
      dataType: 'json'
    })
    .done(function(newMessages) {
      if (newMessages.length != 0) {
        $.each(newMessages, function(i, message) {
          $('.messages').append(buildHTML(message));
        });
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight
        }, 200);
      }
    })
    
    .fail(function() {
      alert('自動更新に失敗しました')
    })
  }

  let timerId
  // turbolinks:visitイベントでclearIntervalを発火させる
  document.addEventListener("turbolinks:visit", function(){
    clearInterval(timerId);
  });
  const path = location.pathname ;

  document.addEventListener("turbolinks:visit", function(){
    clearInterval(timerId);
  });

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      if (message.content == "" && message.image == null) {
        alert('メッセージを入力して下さい');
      } else {
        $('#new_message')[0].reset();
        $('.messages').append(buildHTML(message));
        $('.messages').animate({
          scrollTop: $('.messages')[0].scrollHeight
        }, 200);

      }
    })
    .fail(function() {
      alert("通信に失敗しました");
    })
    .always(function() {
      $("#new-message__submit-btn").prop('disabled', false);
    });
  });

  // var reloadMessages = function() {
  //   if (window.location.href.match(/\/groups\/\d+\/messages/)){
  //     var last_message_id = $('.message:last').data("message_id");
  //     var group_id = $('.header-left__title').data("group_id");
  //     var url = `/groups/${group_id}/api/messages`;
  //     $.ajax({
  //       url: url,
  //       type: 'get',
  //       dataType: 'json',
  //       data: {last_id: last_message_id}
  //     })
  //     .done(function(messages) {
  //       var insertHTML = '';
  //       messages.forEach(function (message) {
  //         insertHTML = buildHTML(message); 
  //         $('.messages').append(insertHTML);
  //       })
  //       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  //     })
  //     .fail(function() {
  //       alert('自動更新に失敗しました');
  //     });
    // };
  // };
// setInterval(reloadMessages, 5000);

  if (path == `/groups/${groupId}/api/messages`) {
    timerId = setInterval(reloadMessages, 5000);
  }

//   // if (path == `/groups/${groupId}/messages`) {
//   timerId = setInterval(reloadMessages, 200000);
// // }
});
