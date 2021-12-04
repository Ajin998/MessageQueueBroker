const broker = require("amqplib/callback_api");

broker.connect((err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;

    //To listern the queue the name should be the same
    const SUPERADMIN_BOX = "SUPERADMIN";
    channel.assertQueue(SUPERADMIN_BOX);
    //4. Receive the message
    channel.consume(
      SUPERADMIN_BOX,
      (msg) => {
        console.log(`Message received from queue:- "${msg.content.toString()}"`);
      },
      { noAck: true }
    );
  });
});
