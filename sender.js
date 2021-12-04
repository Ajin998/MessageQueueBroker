const broker = require("amqplib/callback_api");

//1. Create a connection
broker.connect("amqp://localhost", (err, connection) => {
  if (err) throw ("Failed to connect rabbitMQ", err);
  //2. Create a channel.
  connection.createChannel((err, channel) => {
    if (err) throw ("Failed to create channel", err);
    //3. Assert Queue
    const ADMIN_BOX = "ADMIN";
    const message = "Organization created in admin panel";
    channel.assertQueue(ADMIN_BOX);
    //3. Send to queue.
    channel.sendToQueue(ADMIN_BOX, Buffer.from(message));
    console.log(`Message:- "${message}" \nsent to queue.`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 1000);
  });
});
