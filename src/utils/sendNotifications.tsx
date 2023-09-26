export const sendNotification = async (
  token: string,
  title?: string,
  body?: string,
) => {
  var data = JSON.stringify({
    data: {},
    notification: {
      body: body,
      title: title,
      icon: 'ic_launcher',
    },
    to: token,
  });
  let URL = 'https://fcm.googleapis.com/fcm/send';
  let options = {
    method: 'POST',
    headers: {
      Authorization:
        'key=AAAA4jrbQ3U:APA91bH7RUxUneXCfuKmhsm3iq2EvQnl79Y5Dk_o_rA5YH-gwo17pZQGD1sFk9dtj7S-4z5odP9vBAUV0_xSiy7MwA9zAPaKJl4W0HztX4dBFHDbBVu-GXDploUD1Pa-qXk_sT6yIipR',
      'Content-Type': 'application/json',
    },
    body: data,
  };
  let response = await fetch(URL, options);
  console.log(JSON.stringify(response));
};
