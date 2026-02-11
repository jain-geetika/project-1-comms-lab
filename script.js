let timer;// timer variable 
function parseTime12(t) {
    let [time, period] = t.split(" ");
    let [h, m, s] = time.split(":").map(Number);

    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    //converting string to number, timestamp so that we can easily compare the times
    return h * 3600 + m * 60 + s;
}
function start() {
    let text = document.getElementById("clock").innerText.trim();
    // in the html finding the dom element, where we have the clock id. 
    //inner text is returning the content of clock (3:59:30 PM)
    // trim: remove the start and ending spaces (spaces from 3:59:30 PM)

    // Split time and AM/PM
    let [time, period] = text.split(" ");// split into ["03:59:30","PM"] 0th index is time variable, period is first index
    let [h, m, s] = time.split(":").map(Number);// splitting time into making the array of h m s from [03, 59, 00], we;re converting string to integer

    clearInterval(timer);
    //clearing the timer

    timer = setInterval(() => {
        //set interval has two arguement, given function and time interval, here the given function adds one second to the timer
        // to autocall self function according to given itnerval
        s++;

        if (s === 60) {
            s = 0;
            m++;
        }

        if (m === 60) {
            m = 0;
            h++;//increment hr 
        }

        if (h === 12) {
            period = period === "AM" ? "PM" : "AM";// just added for flexibility
        }

        if (h === 13) {
            h = 1;
        }

        const newTime =
            `${String(h).padStart(2, "0")}:` +//adds zero before the number if it is a single digit
            `${String(m).padStart(2, "0")}:` +
            `${String(s).padStart(2, "0")} ` +
            period;

        document.getElementById("clock").innerText = newTime;
        const now = parseTime12(newTime);
        const start = parseTime12("04:00:00 PM");// time is a string, to increment it you must convert to integer
        const end = parseTime12("04:00:05 PM");

        const enrollDiv = document.getElementById("enroll");

        if (now >= start && now <= end) {// only active between 4:00:00pm and 4:00:05pm
            enrollDiv.classList.remove("disabled");
            enrollDiv.classList.add("active");
        } else {
            enrollDiv.classList.add("disabled");
            enrollDiv.classList.remove("active");
        }
        if (now === end) {
            enrollDiv.classList.add("time-over");
            document.getElementsByClassName("time-over")[0]
                .addEventListener("click", function (e) {
                    e.preventDefault();
                    if (confirm("Sorry, you were too late! \nClick OK to reload.")) {
                        location.reload();
                    }
                });
        }
        //stop at 04:00:05
        if (s === 5) {
            clearInterval(timer);
        }


    }, 1000);// this means, after 1000 millisecond function will be called 

}

start()