const titleH1 = document.getElementById("titleH1");

        titleH1.addEventListener("mouseover", () => {
            titleH1.textContent = "Waiting..."
        });
        titleH1.addEventListener("mouseout", () => {
            titleH1.textContent = "Quiz.js"
        });
        document.getElementById('music').volume = 0.5;  // Set volume to 50%
        document.getElementById('music').currentTime = 30;  // Seek to 30 seconds into the audio

        setInterval(function() {
            let p = document.querySelector("p");
            let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.color = randomColor;
          }, 1000);


    const facts = [
        {
            "statement": "JavaScript was invented in 1995",
            "answer": "true",
            "explanation": "Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days."
        },
        {
            "statement": "Strings in JS are editable values",
            "answer": "false",
            "explanation": "In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings."
        },
        {
            "statement": "1 + 1 === 2",
            "answer": "true",
            "explanation": "The plus operator gives the sum of two numbers."
        },
        {
            "statement": "'1' + '1' === '2'",
            "answer": "false",
            "explanation": "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'."
        },
        {
            "statement": "typeof ['J', 'S'] === 'array'",
            "answer": "false",
            "explanation": "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.  "
        }
    ];

    function hide(element) {
        element.classList.add("hidden");
    }

    function show(element) {
        element.classList.remove("hidden");
    }

    function disable(button) {
        button.setAttribute("disabled", "");
    } 

    function enable(button) {
        button.removeAttribute("disabled");
    }


    let correct = 0;
    let completed = 0;
    
    let fact;


    const explanation =  document.getElementById("explanation");
    const nextButton = document.getElementById("next-question");
    const optionButtons = document.getElementById("options").children;

    function getNextFact() {
        fact = facts.shift(); // get the first fact in our array (shortening the array)

        // set the question text to the current fact's statement
        document.getElementById("statement").textContent = fact.statement;

        // hide any previous explanation
        hide(explanation);

        for (let option of optionButtons) {
            // clear any previous classes
            option.classList.remove("correct");
            option.classList.remove("incorrect");
            // make sure buttons are enabled
            enable(option);
        }

        // disable next-question button
        disable(nextButton);
        
    }

    nextButton.addEventListener("click", getNextFact);

    for (let option of optionButtons) {
        option.addEventListener("click", e => {
            // When this option is clicked...

            // disable all the option buttons
            for (let button of optionButtons) {
                disable(button); 
            }

            // enable the 'next question' button, if we still have facts left
            if (facts.length > 0) {
                enable(nextButton);
            } else {
                nextButton.textContent = "No more questions!"
            }

            const guess = e.target.value;
            if (guess === fact.answer) {
                // correct answer!
                e.target.classList.add("correct");
                correct += 1;
            } else {
                // wrong answer!
                e.target.classList.add("incorrect");
            }

            // display the explanation
            explanation.textContent = fact.explanation;
            show(explanation);
            
            // update the score
            completed += 1;
            document.getElementById("correct").textContent = correct;
            document.getElementById("completed").textContent = completed;

        })
    }

    getNextFact();

