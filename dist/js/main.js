const synth = window.speechSynthesis;

//DOM elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body")

console.log(synth)
//init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices)

    //loop through voices  and create option for each
    voices.forEach((voice) => {
        //create option element
        const option = document.createElement("option");
        //fill option with voice and language
        option.textContent = `${voice.name} ( ${voice.lang} )`;

        //set needed option attributes 
        option.setAttribute("data-lang", voice.lang)
        option.setAttribute("data-name", voice.name)
        voiceSelect.appendChild(option);
    })
}
getVoices()
//in firefox , this doesn't exist
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}


//speak 
const speak = () => {

    //add background image
    body.style.background = `#141414 url(dist/img/wave.gif)`
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = "100% 100%"
    //check if speaking
    if (synth.speaking) {
        return console.error("Already speaking")
    }
    if (textInput !== "") {
        //get speak text
        let speakText = new SpeechSynthesisUtterance(textInput.value);
        //speak  end
        speakText.onend = e => {
            console.log("Done speaking");
            body.style.background = ``
        }

        //if theres speak error
        speakText.onerror = e => {
            console.lerror("Something went wrong")
        }

        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        console.log("Selected", selectedVoice)

        //loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //speak
        synth.speak(speakText)
    }
}

//EVent listeners
textForm.addEventListener("submit", e => {
    e.preventDefault();
    speak();
    textInput.getBoundingClientRect()
})

//set rate and pitch values

rate.addEventListener("change", e => rateValue.textContent = rate.value);

pitch.addEventListener("change", e => pitchValue.textContent = pitch.value);

//voice select change
voiceSelect.addEventListener("change", e => speak())