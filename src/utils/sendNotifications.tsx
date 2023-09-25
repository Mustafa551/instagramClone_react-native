// export const sendNotification = async (token: any) => {
//   //   try {
//   //     var axios = require('axios');
//   //     var data = JSON.stringify({
//   //       data: {},
//   //       notification: {
//   //         body: 'click to open check Post',
//   //         title: 'New Post Added',
//   //       },
//   //       to: token,
//   //     });
//   //     var config = {
//   //       method: 'post',
//   //       url: 'https://fcm.googleapis.com/fcm/send',
//   //       headers: {
//   //         Authorization:
//   //           'AAAA4jrbQ3U:APA91bH7RUxUneXCfuKmhsm3iq2EvQnl79Y5Dk_o_rA5YH-gwo17pZQGD1sFk9dtj7S-4z5odP9vBAUV0_xSiy7MwA9zAPaKJl4W0HztX4dBFHDbBVu-GXDploUD1Pa-qXk_sT6yIipR',
//   //         'Content-Type': 'application/json',
//   //       },
//   //       data: data,
//   //     };
//   //     axios(config)
//   //       .then(function (response) {
//   //         console.log('>>>>>>>>>>>>', JSON.stringify(response.data));
//   //       })
//   //       .catch(function (error) {
//   //         console.log(error);
//   //       });
//   //   } catch (error) {
//   //     console.log(error);
//   //   }

//   var data = JSON.stringify({
//     data: {},
//     notification: {
//       body: 'click to open check Post',
//       title: 'New Post Added',
//     },
//     to: token,
//   });
//   let URL = 'https://fcm.googleapis.com/fcm/send';
//   let options = {
//     method: 'POST',
//     headers: {
//       Authorization:
//         'AAAA4jrbQ3U:APA91bH7RUxUneXCfuKmhsm3iq2EvQnl79Y5Dk_o_rA5YH-gwo17pZQGD1sFk9dtj7S-4z5odP9vBAUV0_xSiy7MwA9zAPaKJl4W0HztX4dBFHDbBVu-GXDploUD1Pa-qXk_sT6yIipR',
//       'Content-Type': 'application/json',
//     },
//     body: data,
//   };
//   let response = await fetch(URL, options);
//   console.log(JSON.stringify(response));
// };

export const send = () => {
  var axios = require('axios');
  var data = JSON.stringify({
    data: {},
    notification: {
      body: 'click to open check Post',
      title: 'New Post Added',
    },
    to: 'fdWcw7u4QNKDTrj8mhyqd9:APA91bEm3AoJt6pZEqyt5AiwN7zt2zQ4MOXr47hDfVCGUh7W7hpUq-yamGYaLSNjATJCx8fDkzjAxLLyrAP4D-vwk3XL9i-CffcvriJ3_dWlPYtTN5HQG2l9i0p-QmYvOneisNGFtKfc',
  });
  var config = {
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      Authorization:
        'AAAA4jrbQ3U:APA91bH7RUxUneXCfuKmhsm3iq2EvQnl79Y5Dk_o_rA5YH-gwo17pZQGD1sFk9dtj7S-4z5odP9vBAUV0_xSiy7MwA9zAPaKJl4W0HztX4dBFHDbBVu-GXDploUD1Pa-qXk_sT6yIipR',
      'Content-Type': 'application/json',
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
