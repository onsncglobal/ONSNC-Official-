// Hero Section JS - Simple counter animation for stats
document.addEventListener("DOMContentLoaded", () => {
    const projectCountEl = document.getElementById("projectCount");
    const target = parseInt(projectCountEl.innerText, 10);
    let count = 0;
    const duration = 1500; // 1.5 seconds
    const stepTime = Math.abs(Math.floor(duration / target));

    const counter = setInterval(() => {
        count++;
        projectCountEl.innerText = count;
        if(count >= target){
            clearInterval(counter);
        }
    }, stepTime);
});

