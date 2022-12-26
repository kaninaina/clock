let footer = document.querySelector(".footer ul");
let footerChildren = [...footer.children];
footerChildren.forEach((el) => {
    el.addEventListener("click", footerActive)
})
let setvalue;
function footerActive(e) {
    let elemnt = e.target.closest("li");
    footerChildren.forEach((el) => {
        el.classList.remove("active");
    })
    elemnt.classList.add("active");
    let target = elemnt.dataset.target;
    pageActiveSelection(target);
}
function pageActiveSelection(name) {
    let pageParent = document.querySelector(".space");
    let pageChildren = [...pageParent.children];
    pageChildren.forEach((el) => {
        el.classList.remove("active")
    });
    let activePage = pageChildren.find((el) => {
        let value = el.dataset.value;
        return value == name;
    });
    activePage.classList.add("active");
    document.querySelector("#title").innerHTML = name.toUpperCase();
}

let timerInput = [...document.querySelectorAll(".timerinput")];
timerInput.forEach((el) => {
    el.addEventListener("keyup", timerFunction);
})

function timerFunction(e) {
    let timerControl = document.querySelector(".timer-control");
    timerControl.querySelector(".play").classList.add("active");
    timerControl.querySelector(".play").classList.add("acti")
    let value = e.target.value;
    if (e.target.dataset.time == "sec" || e.target.dataset.time == "min") {
        if (e.target.value >= 60) {
            let pre = e.target.closest(".timer-hour").previousElementSibling.previousElementSibling.querySelector("input");
            if (e.target.value == 60) {
                pre.value = "1";
                e.target.value = 00;
            }
            let val = Number(e.target.value);
            let va1 = val % 60;
            let y = val / 60 + "";
            let z = y.split(".")[0];
            let min = va1 + "";
            e.target.value = min;
            pre.value = z
        }
    }
}

let timerControl = document.querySelector(".timer-control");
timerControl.querySelector(".play").addEventListener("click", timerLibrary);
let timerFlex = document.querySelector(".timer-flex");
let root = document.querySelector(":root");

function timerLibrary(e) {
    timerControl.querySelector(".play").classList.toggle("acti");
    if (e.target.getAttribute("name") == "play") {
        if (setvalue != undefined) {
            h();
            console.log(setvalue);
            return ""
        }
        timerFlex.classList.add("active");
        timerControl.querySelector(".delete").classList.add("active");
        timerControl.querySelector(".move").classList.add("active");
        let time = timerInput.map((el, i) => {
            let a = Number(el.value);
            let b = a * 60;
            let c=b*60;
            if (i==2) {
                return a
            }
            if(i==1){
                return b
            }
            if(i==0){
                return c
            }
        }).reduce((l, m) => { return l + m });

        let timer = time + "s";
        setvalue = Number(time);
        svgAnimation(time);
        root.style.setProperty("--svgtime", `${timer}`);
        document.querySelector(".timer-clock svg").classList.add("active");
        document.querySelector("#timeShow").innerHTML = time;
        h()
    }
    else {
        l()
    }
}
function svgAnimation() {
    if (setvalue < 1) {
        l();
        setvalue = undefined;
    }
    setvalue--
    document.querySelector("#timeShow").innerHTML = setvalue;

}
let setinter;
function h() {
    setinter = setInterval(svgAnimation, 1000);
    document.querySelector("#timeShow").classList.remove("active")
}
function l() {
    clearInterval(setinter);
    document.querySelector("#timeShow").classList.add("active")

}

timerControl.querySelector(".delete").addEventListener("click", (e) => {
    setvalue = undefined;
    console.log(setvalue);
    root.style.removeProperty("--svgtime");
    timerControl.querySelector(".play").classList.toggle("acti");
    document.querySelector(".timer-clock svg").classList.remove("active");
    timerControl.querySelector(".delete").classList.remove("active");
    timerControl.querySelector(".move").classList.remove("active");
    timerFlex.classList.remove("active");
});


let stopWatchControlPlay = document.querySelector(".stop-watch-play");
stopWatchControlPlay.addEventListener("click", stopWatchPlay);
let stopWatchLap = document.querySelector(".stop-watch-share");
stopWatchLap.addEventListener("click", lap);
let milli = 0;
let sec = 0;
let stopInterval;
function stopWatchPlay(e) {
    document.querySelector(".stop-watch-play").classList.toggle("active");
    let typeCheck = e.target.getAttribute("name");
    if (typeCheck == "play") {
        run();
        document.querySelector(".stop-watch-svg-con p").classList.remove("active")
    }
    else {
        stop();
        document.querySelector(".stop-watch-svg-con p").classList.add("active")
    }
}

function run() {
    stopInterval = setInterval(timerStart, 10);
}
function stop() {
    clearInterval(stopInterval);
}
function timerStart() {
    let timeValue = document.querySelector(".stop-watch-svg-con");
    let se = timeValue.querySelector("p span:nth-child(1)");
    let mill = timeValue.querySelector("p span:nth-child(2)");
    milli++;
    if (milli < 10) {
        mill.innerHTML = "0" + milli;
    }
    if (milli > 9) {
        mill.innerHTML = milli;
    }
    if (milli > 99) {
        milli = 0;
        sec++;
        mill.innerHTML = "00"
    }
    if (sec < 10) {
        se.innerHTML = "0" + sec;
    }
    if (sec > 9) {
        se.innerHTML = sec;
    }
}

function lap() {
    document.querySelector(".stop-con-2").classList.add("active");
    let parent = document.querySelector(".stop-con-2 ul");
    let children = parent.children;
    if (children.length == 1) {
        let secs;
        let mills;
        if (sec > 9) {
            secs = sec;
        }
        else {
            secs = "0" + sec;
        }
        if (milli > 9) {
            mills = milli;
        }
        else {
            mills = "0" + milli;
        }
        createList(secs, mills)
    }
    else {
        let oldData = (sec * 100) + (milli);
        let second;
        let milliSecond;
        let li = children[1].children[2].innerHTML;
        let liValue = li.split(" ").map((el, i) => {
            if (i == 2) {
                return Number(el)
            }
            if (i == 1) {
                let a = Number(el) * 100;
                return a
            }
            if (i == 0) {
                let a = Number(el) * 60;
                return a
            }
        }).reduce((f, s) => { return f + s })
        let actual = oldData - liValue;
        let s = Math.floor(actual / 100);
        let m = actual % 100;
        if (s > 9) {
            second = s
        }
        else {
            second = "0" + s;
        }
        if (m > 9) {
            milliSecond = m;
        }
        else {
            milliSecond = m;
        }
        createList(second, milliSecond)}}
        function createList(secs, millis) {
            let secondsRun;
            let milliSecondsRun;
            let parent = document.querySelector(".stop-con-2 ul");
            let child = parent.firstElementChild;
            let length = parent.children.length;
            let li = document.createElement("li");
            li.className = "liseconds";
            let fp = document.createElement("p");
            fp.innerHTML = length;
            li.append(fp);
            let sp = document.createElement("p");
            sp.innerHTML = `00 ${secs} ${millis}`;
            li.append(sp);
            if (sec > 9) {
                secondsRun = sec;
            }
            else {
                secondsRun = "0" + sec;
            }
            if (milli > 9) {
                milliSecondsRun = milli;
            }
            else {
                milliSecondsRun = "0" + milli;
            }
            let tp = document.createElement("p");
            tp.innerHTML = `00 ${secondsRun} ${milliSecondsRun}`;
            li.append(tp);
            child.after(li);
        }
        let stopWatchReset = document.querySelector(".stop-wtch-reset");
        stopWatchReset.addEventListener("click", resetStopWatch);
        function resetStopWatch(){
            clearInterval(stopInterval);
            sec = 0;
            milli = 0;
            let parent = document.querySelector(".stop-con-2 ul");
            let child =[...parent.children];
            child.forEach((el, i)=>{
                if(i == 0){
                    return ""
                }
                else{
                    el.remove();
                }
            });
            document.querySelector(".stop-con-2").classList.remove("active");
            let timeValue = document.querySelector(".stop-watch-svg-con");
            let se = timeValue.querySelector("p span:nth-child(1)");
            let mill = timeValue.querySelector("p span:nth-child(2)");
            se.innerHTML ="00";
            mill.innerHTML ="00";
        }

setInterval(clockTime,1000);

function clockTime(){
    let date=new Date();
    let min=date.getMinutes();
    let hour=date.getHours();
   let h=hour-12;
    let sec=date.getSeconds();
    let hourDegree=30*h;
    let minDegree=(360/60)*min;
    let secDegree=(360/60)*sec;
    let hourNeedle=document.querySelector(".hour");
    let minNeedle=document.querySelector(".min");
    let secNeedle=document.querySelector(".sec");
    hourNeedle.style.transform=`rotateZ(${hourDegree}deg)`;
    minNeedle.style.transform=`rotateZ(${minDegree}deg)`;
    secNeedle.style.transform=`rotateZ(${secDegree}deg)`;
    
    ;

}