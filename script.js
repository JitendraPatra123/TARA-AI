const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Speak Function
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

// Greeting Based on Time
function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Sir...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Sir...");
    } else {
        speak("Good Evening Sir...");
    }
}

// On Load
window.addEventListener('load', () => {
    wishMe();
});

// Voice Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Command-Handler Array
const commands = [
    {
    condition: msg => msg.includes('hey') || msg.includes('hello'),
    action: () => {
        speak("Hello Sir, How Can I Help You?");
        wishMe();
    }
},
    {
        condition: msg => msg.includes("open google"),
        action: () => {
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        }
    },
    {
        condition: msg => msg.includes("open youtube"),
        action: () => {
            window.open("https://youtube.com", "_blank");
            speak("Opening YouTube...");
        }
    },
    {
        condition: msg => msg.includes("tell something about me"),
        action: () => speak("Your Name is Jitendra")
    },
    {
        condition: msg => msg.includes("open whatsapp"),
        action: () => {
            window.open("https://whatsapp.com", "_blank");
            speak("Opening WhatsApp...");
        }
    },
    {
        condition: msg => msg.includes("open facebook"),
        action: () => {
            window.open("https://facebook.com", "_blank");
            speak("Opening Facebook...");
        }
    },
    {
        condition: msg => msg.includes("open github"),
        action: () => {
            window.open("https://github.com", "_blank");
            speak("Opening GitHub...");
        }
    },
    {
        condition: msg => msg.includes("open linkedin"),
        action: () => {
            window.open("https://linkedin.com", "_blank");
            speak("Opening LinkedIn...");
        }
    },
    {
        condition: msg => msg.includes("play") && msg.includes("on youtube"),
        action: (msg) => {
            const query = msg.replace("play", "").replace("on youtube", "").trim();
            window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
            speak(`Searching for ${query} on YouTube...`);
        }
    },
    {
        condition: msg => msg.includes("weather"),
        action: () => {
            window.open("https://www.google.com/search?q=weather", "_blank");
            speak("Here is the weather forecast.");
        }
    },
    {
        condition: msg => msg.includes("wikipedia"),
        action: (msg) => {
            const topic = msg.replace("wikipedia", "").trim();
            window.open(`https://en.wikipedia.org/wiki/${topic}`, "_blank");
            speak(`This is what I found on Wikipedia regarding ${topic}`);
        }
    },
    {
        condition: msg => msg.includes("time"),
        action: () => {
            const time = new Date().toLocaleTimeString();
            speak("The current time is " + time);
        }
    },
    {
        condition: msg => msg.includes("date"),
        action: () => {
            const date = new Date().toLocaleDateString();
            speak("Today's date is " + date);
        }
    },
    {
        condition: msg => msg.includes("calculator"),
        action: () => {
            window.open("Calculator:///");
            speak("Opening Calculator");
        }
    },
    {
        condition: msg => msg.includes("scroll down"),
        action: () => {
            window.scrollBy(0, 500);
            speak("Scrolling down...");
        }
    },
    {
        condition: msg => msg.includes("scroll up"),
        action: () => {
            window.scrollBy(0, -500);
            speak("Scrolling up...");
        }
    },
    {
        condition: msg => msg.includes("greet me"),
        action: () => {
            const hour = new Date().getHours();
            const greet =
                hour < 12 ? "Good morning" :
                hour < 18 ? "Good afternoon" :
                "Good evening";
            speak(`${greet}, Jitendra!`);
        }
    },
    {
        condition: msg => msg.includes("tell me a joke"),
        action: () => {
            const jokes = [
                "Why don’t scientists trust atoms? Because they make up everything!",
                "I told my computer I needed a break, and it said 'No problem — I'll go to sleep!'",
                "Why do JavaScript developers wear glasses? Because they don't C#."
            ];
            const joke = jokes[Math.floor(Math.random() * jokes.length)];
            speak(joke);
        }
    },
    {
        condition: msg => msg.includes("motivate me"),
        action: () => {
            const quotes = [
                "Believe in yourself and all that you are.",
                "Success is not final, failure is not fatal: it is the courage to continue that counts.",
                "Your limitation—it's only your imagination."
            ];
            const quote = quotes[Math.floor(Math.random() * quotes.length)];
            speak(quote);
        }
    },
    {
        condition: msg => msg.includes("set timer for"),
        action: (msg) => {
            const mins = parseInt(msg.match(/\d+/)?.[0] || 0);
            if (mins > 0) {
                speak(`Setting a timer for ${mins} minutes`);
                setTimeout(() => {
                    speak("Time's up!");
                    alert("Timer Finished!");
                }, mins * 60000);
            } else {
                speak("Sorry, I couldn't understand the time duration.");
            }
        }
    },
    {
        condition: msg => msg.includes('what is') || msg.includes('who is') || msg.includes('what are'),
        action: (msg) => {
            window.open(`https://www.google.com/search?q=${msg.replace(" ", "+")}`, "_blank");
            speak("This is what I found on the internet regarding " + msg);
        }
    },
    {
        condition: () => true, // fallback command
        action: (msg) => {
            window.open(`https://www.google.com/search?q=${msg.replace(" ", "+")}`, "_blank");
            speak("I found some information for " + msg + " on Google");
        }
    }
];

// Command Processor
function takeCommand(message) {
    for (const cmd of commands) {
        if (cmd.condition(message)) {
            cmd.action(message);
            break;
        }
    }
}
