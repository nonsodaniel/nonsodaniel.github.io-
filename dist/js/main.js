const synth = window.speechSynthesis;

//DOM elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

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


