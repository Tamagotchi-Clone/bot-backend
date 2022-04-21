const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["en"] });

async function trainChatBotIA() {
  return new Promise(async (resolve, reject) => {
    manager.addDocument("en", "Hungry?", "greetings.feed");
    manager.addDocument("en", "Snack?", "greetings.feed");
    manager.addDocument("en", "Do you want to eat?", "greetings.feed");
    manager.addDocument("en", "Do you want a snack?", "greetings.feed");
    manager.addDocument("en", "Are you hungry?", "greetings.feed");
    manager.addDocument("en", "Do you want breakfast?", "greetings.feed");
    manager.addDocument("en", "Do you want dinner?", "greetings.feed");
    manager.addDocument("en", "Do you want lunch?", "greetings.feed");
    manager.addDocument("en", "Do you want food?", "greetings.feed");
    manager.addDocument("en", "Food?", "greetings.feed");
    manager.addDocument("en", "Play time?", "greetings.play");
    manager.addDocument("en", "Do you want to play?", "greetings.play");
    manager.addDocument("en", "Do you want to play a game?", "greetings.play");
    manager.addDocument("en", "Do you want to play with me?", "greetings.play");
    manager.addDocument("en", "Are you bored?", "greetings.play");
    manager.addDocument("en", "Play?", "greetings.play");
    manager.addDocument("en", "Let's Play!", "greetings.play");
    manager.addDocument("en", "Do you want a bath?", "greetings.clean");
    manager.addDocument("en", "Bath time?", "greetings.clean");
    manager.addDocument("en", "Are you dirty?", "greetings.clean");
    manager.addDocument("en", "Clean?", "greetings.clean");
    manager.addDocument("en", "Do you want to be clean?", "greetings.clean");
    manager.addDocument("en", "Can I give you a bath?", "greetings.clean");
    manager.addDocument("en", "Can I clean you?", "greetings.clean");
    manager.addDocument("en", "Bubble bath?", "greetings.clean");
    manager.addDocument("en", "Wash?", "greetings.clean");
    manager.addDocument("en", "Are we friends?", "greetings.friend");
    manager.addDocument("en", "Will you be my friend?", "greetings.friend");
    manager.addDocument("en", "Want to be friends?", "greetings.friend");
    manager.addDocument(
      "en",
      "Do you want to be my friend?",
      "greetings.friend"
    );
    manager.addDocument("en", "Do you like me?", "greetings.friend");
    manager.addDocument("en", "Who is your best friend?", "greetings.friend");
    manager.addDocument("en", "Will you be my friend?", "greetings.friend");
    manager.addDocument("en", "Friends?", "greetings.friend");
    manager.addDocument("en", "I love you", "greetings.love");
    manager.addDocument("en", "I luv you", "greetings.love");
    manager.addDocument("en", "I luv u", "greetings.love");
    manager.addDocument("en", "Love", "greetings.love");
    manager.addDocument("en", "I will always love you", "greetings.love");

    manager.addAnswer("en", "greetings.feed", "hungry!");
    manager.addAnswer("en", "greetings.feed", "snack?");
    manager.addAnswer("en", "greetings.feed", "I could go for a bite");
    manager.addAnswer("en", "greetings.feed", "can I have a little treat?");
    manager.addAnswer("en", "greetings.feed", "I'm starving!");
    manager.addAnswer("en", "greetings.feed", "My tummy is hungry…");
    manager.addAnswer("en", "greetings.feed", "yumyumyum!");
    manager.addAnswer("en", "greetings.feed", "more snacks plz!");
    manager.addAnswer("en", "greetings.feed", "what's cooking?");
    manager.addAnswer("en", "greetings.play", "Can we play a game?");
    manager.addAnswer("en", "greetings.play", "I'm bored! Play with me!");
    manager.addAnswer("en", "greetings.play", "Time to play!");
    manager.addAnswer(
      "en",
      "greetings.play",
      "I need attention, let's play a game!"
    );
    manager.addAnswer(
      "en",
      "greetings.play",
      "What to do…? Oh! I know! Let's PLAY!"
    );
    manager.addAnswer("en", "greetings.play", "Hide and seek?");
    manager.addAnswer(
      "en",
      "greetings.clean",
      "I don't want to be stinky, bath time?"
    );
    manager.addAnswer("en", "greetings.clean", "Bubble bath?");
    manager.addAnswer(
      "en",
      "greetings.clean",
      "I would like to splash in the bath please!"
    );
    manager.addAnswer("en", "greetings.clean", "Bath time!");
    manager.addAnswer("en", "greetings.clean", "Time to wash up");
    manager.addAnswer(
      "en",
      "greetings.clean",
      "Can I bring my rubber duck in the bath?"
    );
    manager.addAnswer("en", "greetings.clean", "Time to get clean!");
    manager.addAnswer("en", "greetings.clean", "Scrub a dub dub!");
    manager.addAnswer("en", "greetings.friend", "You're my best friend!");
    manager.addAnswer("en", "greetings.friend", "I am so glad we are friends!");
    manager.addAnswer("en", "greetings.friend", "BFF? 4ever?");
    manager.addAnswer(
      "en",
      "greetings.friend",
      "I love having a friend like you"
    );
    manager.addAnswer("en", "greetings.friend", "You're my favorite friend!");
    manager.addAnswer(
      "en",
      "greetings.friend",
      "I hope we stay friends for a long time"
    );
    manager.addAnswer("en", "greetings.love", "I love you!");
    manager.addAnswer("en", "greetings.love", "I love playing with you!");
    manager.addAnswer("en", "greetings.love", "I love hanging out with you!");
    manager.addAnswer("en", "greetings.love", "I love spending time together!");

    await manager.train();
    manager.save();
    console.log("AI has been trained");
    resolve(true);
  });
}
async function generateResponseAI(qsm) {
  return new Promise(async (resolve, reject) => {
    response = await manager.process("en", qsm);
    resolve(response);
  });
}
const connectWebSocket = (io) => {
  io.on("connection", function (socket) {
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("New user joined!");
    });
    socket.on("new-msg", async function (data) {
      let response = await generateResponseAI(data.msg);
      io.to(data.room).emit(
        "send-msg-response",
        response.answer !== undefined
          ? response.answer
          : "beep b00p? 01110111 01101000 01100001 01110100 00111111"
      );
    });
  });
};
module.exports = {
  connectWebSocket,
  trainChatBotIA,
};
