const filePath = "./assets/img/activities/";
const missingBackgrd = "./assets/img/img-placeholder.jpg";
const activities = {
    1: {
        url: "https://www.virtualyosemite.org/virtual-tour/#node27",
        fileName: `${filePath}el-cap.jpg`,
        title: "Virtual Tour of Yosemite NP",
        desc: "Explore and learn about the wonderful Yosemite NP sitting right in your backyard."
    },
    2: {
        url: "https://www.youtube.com/watch?v=SEfs5TJZ6Nk",
        fileName: `${filePath}mindfulness.jpg`,
        title: "Mindfulness Breathing Exercise",
        desc: "Feel more settled and calm by spending a few minutes focused on your breathing."
    },
    3: {
        url: "https://nationalzoo.si.edu/webcams/lion-cam",
        fileName: `${filePath}male-lion.jpg`,
        title: "Live Lion Camera",
        desc: "Watch the lion cam at Smithsonian’s National Zoo & Conservation Biology Institute."
    },
    4: {
        url: "https://www.youtube.com/watch?v=5if4cjO5nxo&feature=youtu.be",
        fileName: `${filePath}kid-exercising.jpg`,
        title: "Exercise Video",
        desc: "Get your heart rate up in your living room with this fun workout."
    },
    5: {
        url: "https://www.youtube.com/watch?v=-7Vb5TQncLc#action=share",
        fileName: `${filePath}waterfall.jpg`,
        title: "Visual Relaxation",
        desc: "For 60 relaxing minutes you'll effortlessly travel from one stunning waterfall to another."
    },
    // number_here: {
    //     url: "url_here",
    //     fileName: `${filePath}image_name_here`,
    //     title: "title_here",
    //     desc: "description_here"
    // },
}
const objStringify = JSON.stringify(activities);
const obj = JSON.parse(objStringify);
let loadActivities = () => {
    let counter = 0;
    const activitiesObj = document.querySelector(".activities");
    Object.keys(obj).forEach(activity => {
        var object = obj[activity],
            actLink = document.createElement('a'),
            actCard = document.createElement('div'),
            actImgCon = document.createElement('div'),
            actImg = document.createElement('div'),
            actTitle = document.createElement('h3'),
            actDesc = document.createElement('p'),
            idName = `activity-${counter++}`;
        actLink.classList.add("activity-link");
        actLink.id = idName;
        actLink.href = object.url;
        actLink.target = "_blank";
        actLink.title = "Click to open"
        actCard.className = "activity-card shadow";
        actImgCon.classList.add("activity-img-container");
        actImg.id = "act-img";
        actImg.className = "activity-img lazy";
        actImg.style.backgroundImage = `url(${object.fileName}), url(${missingBackgrd})`;
        actTitle.classList.add("activity-title");
        actDesc.classList.add("activity-desc");
        actImgCon.appendChild(actImg);
        actTitle.append(object.title);
        actDesc.append(object.desc);
        actCard.appendChild(actImgCon);
        actCard.appendChild(actTitle);
        actCard.appendChild(actDesc);
        actLink.appendChild(actCard);
        activitiesObj.appendChild(actLink);
    });
    return true;
}

let arrowsVisible = (totalCards, rightArrow) => {
    if(totalCards > 4) {
        rightArrow.classList.remove("brick-wall");
    } 
}

let scrollActivitiesLeft = (container) => {
    container.scrollLeft -= 420;
};

let lazyLoading = (initLoad = false) => {
    var lazyloadImages;    
    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        }, {
            root: document.querySelector(".activities-container"),
            rootMargin: "0px -50px 0px 0px"
        });

        lazyloadImages.forEach(function(image) { imageObserver.observe(image); });
    } 
    else {  
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload () {
            if(lazyloadThrottleTimeout) { clearTimeout(lazyloadThrottleTimeout); }    
            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if(img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                    }
                });
                if(lazyloadImages.length == 0) { 
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }
        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
}


// Let DOM finish loading
$(document).ready(function(){
    const exe_one = new Promise((resolve, reject) => {
        resolve(loadActivities());
    });
    exe_one.then((value) => {
        if(value) lazyLoading(value);
    });
    let leftNavArrow = document.querySelector(".nav-left-arrow"),
        rightNavArrow = document.querySelector(".nav-right-arrow"),
        activities = document.querySelector(".activities"),
        cards = document.querySelectorAll(".activity-link"),
        totalCards = cards.length;
    
    activities.scrollLeft = 0;

    if(screen.width > 1024 && screen.height > 1024) {
        arrowsVisible(totalCards, rightNavArrow);
    
        rightNavArrow.addEventListener("mouseup", (e) => {
            e.preventDefault();
            maxScrollLeft = activities.scrollWidth - activities.clientWidth;
            activities.scrollLeft += 420;
            if(activities.scrollLeft >= 0) leftNavArrow.classList.remove("brick-wall");
            if(activities.scrollLeft >= maxScrollLeft) rightNavArrow.classList.add("brick-wall");    
        });
    
        leftNavArrow.addEventListener("mouseup", (e) => {
            e.preventDefault();
            maxScrollLeft = activities.scrollWidth - activities.clientWidth;
            activities.scrollLeft -= 420;
            if(activities.scrollLeft <= 0) leftNavArrow.classList.add("brick-wall");
            if(activities.scrollLeft <= maxScrollLeft) rightNavArrow.classList.remove("brick-wall");
        });

        activities.addEventListener("scroll", (e) => {
            let maxScrollLeft = activities.scrollWidth - activities.clientWidth,
                horizScroll = e.target.scrollLeft;
            if(horizScroll > 0 && horizScroll < maxScrollLeft) {
                leftNavArrow.classList.remove("brick-wall");
                rightNavArrow.classList.remove("brick-wall");
            }
            if(horizScroll == 0) leftNavArrow.classList.add("brick-wall");
            if(horizScroll == maxScrollLeft) rightNavArrow.classList.add("brick-wall");
        });
    }
    else document.querySelector(".card-nav-arrows").remove();
});