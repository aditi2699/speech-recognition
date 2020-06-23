window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start");
const end_button = document.getElementById("end");

let p =document.createElement("p");
transcript_element.appendChild(p);

recognition.addEventListener("result",(e) =>{
    const transcript = Array.from(e.results)
    .map(results => results[0])
    .map(results => results.transcript);
    
    p.textContent = transcript;
    if (e.results[0].isFinal) { 


        p = document.createElement("p");
        p.textContent = transcript;
        transcript_element.appendChild(p);
        p.textContent ="";
    
        if (transcript.includes("weather")) {
            console.log("Weather");

            let command = document.createElement("p");
            command.classList.add("command");
            command.textContent = "getting weather...."
            
            transcript_element.appendChild(command);
        }
    }
});

recognition.addEventListener("end", () => { 
    end_button.disabled = true;
    talk_button.disabled = false;
 });

talk_button.addEventListener("click",() => { 
    end_button.disabled = false;
    talk_button.disabled = true;

    recognition.start();
 });
//recognition.start();
end_button.addEventListener("click", () => { 
    end_button.disabled = true;
    talk_button.disabled = false;
    recognition.stop();
});
