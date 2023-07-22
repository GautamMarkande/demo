// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const speakButton = document.getElementById("speak-button");
  const textToRead = document.getElementById("text-to-read");
  const StopButton = document.getElementById("stop-button");
  const select = document.getElementById("voice");
  // Check if the browser supports speech synthesis
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;

    synth.onvoiceschanged = () => {
      // Get the list of available voices
      const voices = synth.getVoices();

      // Log information about each voice
      voices.forEach((voice) => {
        const option = document.createElement("option");
        option.innerText = `${voice.name}`;
        select.appendChild(option);
      });
    };

    //find value of Rate
    let RangeRate = document.getElementById("RateRange");
    let RateValue = document.getElementById("RateValue");

    RangeRate.addEventListener("input", () => {
      RateValue.innerText = RangeRate.value;
    });

    // find value of Pitch
    let RangePitch = document.getElementById("PithchRange");
    let PitchValue = document.getElementById("PitchValue");

    RangePitch.addEventListener("input", () => {
      PitchValue.innerText = RangePitch.value;
    });

    // Function to start the text-to-speech
    let selectedvoice = select.value;

    const speakText = () => {
      // console.log(select.value)
      synth.cancel();
      const text = new SpeechSynthesisUtterance(textToRead.value);
      const voices = synth.getVoices();
      const voice = voices.find((voice) => voice.name === select.value);
      console.log(voice);
      text.voice = voice;
      text.rate = RateValue.innerText;
      text.pitch = PitchValue.innerText;
      synth.speak(text);
    };

    // Event listener for the speak button
    speakButton.addEventListener("click", speakText);

    //stop button
    StopButton.addEventListener("click", () => {
      synth.pause();
    });
  } else {
    alert("Your browser does not support Text-to-Speech.");
  }
});
