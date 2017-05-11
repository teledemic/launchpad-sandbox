import * as midi from "midi";
import * as webaudio from "web-audio-engine";
import * as Speaker from "speaker";
const AudioContext = webaudio.StreamAudioContext;

let input = new midi.input();

// console.log(input.getPortName(0));

input.on("message", (delta, message) => {
  console.log('m:' + message + ' d:' + delta);
});

let context = new AudioContext();

const osc = context.createOscillator();
const amp = context.createGain();

osc.type = "square";
osc.frequency.setValueAtTime(987.7666, 0);
osc.frequency.setValueAtTime(1318.5102, 0.075);
osc.start(0);
osc.stop(2);
osc.connect(amp);
osc.onended = () => {
  console.log("test");
  context.close().then(() => {
    process.exit(0);
  });
};

amp.gain.setValueAtTime(0.25, 0);
amp.gain.setValueAtTime(0.25, 0.075);
amp.gain.linearRampToValueAtTime(0, 2);
amp.connect(context.destination);

context.pipe(new Speaker());
context.resume();