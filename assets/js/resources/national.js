const filePath = "./assets/img/resources/national/";
const missingBackgrd = "./assets/img/img-placeholder.jpg";
const resources = {
    1: {
        url: "https://suicidepreventionlifeline.org/ ",
        fileName: `${filePath}using-phone.jpg`,
        title: "National Suicide Prevention Lifeline",
        desc: "If you are thinking about suicide, are worried about a friend or loved one, or would like emotional support, the Lifeline network is available 24/7 across the United States."
    },
    2: {
        url: "https://www.crisistextline.org/",
        fileName: `${filePath}crisis-text-line.png`,
        title: "Crisis Text Line",
        desc: "Text <strong>HOME</strong> to <strong>741741</strong> from anywhere in the United States, anytime. Crisis Text Line is here for any crisis. A live, trained Crisis Counselor receives the text and responds, all from our secure online platform. The volunteer Crisis Counselor will help you move from a hot moment to a cool moment."
    },
    3: {
        url: "https://operationsafehouse.org/",
        fileName: `${filePath}stories-matter.jpg`,
        title: "Operation Safe House",
        desc: "We’re here for you, every hour of every day. What are you facing? Domestic violence, drug addiction, unplanned pregnancy, gender identity issues, suicidal thoughts, or living on the street."
    },
    4: {
        url: "https://www.samhsa.gov/",
        fileName: `${filePath}reassurance.jpg`,
        title: "Substance Abuse & Mental Health",
        desc: "The Substance Abuse and Mental Health Services Administration (SAMHSA) is the agency within the U.S. Department of Health and Human Services that leads public health efforts to advance the behavioral health of the nation. SAMHSA's mission is to reduce the impact of substance abuse and mental illness on America's communities."
    },
    5: {
        url: "https://www.thetrevorproject.org/",
        fileName: `${filePath}rainbow-flag.jpg`,
        title: "The Trevor Project",
        desc: "The Trevor Project offers accredited life-saving, life-affirming programs and services to LGBTQ youth that create safe, accepting and inclusive environments over the phone, online and through text."
    },
    6: {
        url: "https://www.suicideispreventable.org/",
        fileName: `${filePath}discussion.jpg`,
        title: "Know the Signs",
        desc: "This campaign is intended to educate Californians how to recognize the warning signs of suicide, how to find the words to have a direct conversation with someone in crisis and where to find professional help and resources."
    },
    7: {
        url: "https://healgrief.org/virtual-support/",
        fileName: `${filePath}grief.jpg`,
        title: "Heal Grief",
        desc: "Grief is often isolating. But it doesn’t have to be anymore! Regardless of your ability to find local supportive services, HealGrief has made it possible to connect on a whole new level. It’s time to be heard, feel understood and connect with others who understand your journey."
    },
    8: {
        url: "https://centers.rainn.org/",
        fileName: `${filePath}two-woman-chatting.jpg`,
        title: "Rape, Abuse & Incest National Network",
        desc: "Sexual violence can have psychological, emotional, and physical effects on a survivor. These effects aren’t always easy to deal with, but with the right help and support they can be managed."
    },
    number_here: {
        url: "https://www.thehotline.org/help/",
        fileName: `${filePath}red-phone.jpg`,
        title: "The Hotline",
        desc: "Operating around the clock, seven days a week, confidential and free of cost, the National Domestic Violence Hotline provides lifesaving tools and immediate support to enable victims to find safety and live lives free of abuse."
    },
    // number_here: {
    //     url: "url_here",
    //     fileName: `${filePath}image_name_here`,
    //     title: "title_here",
    //     desc: "description_here"
    // },
}

// TRIM TEXT TO FIT IN CARD
let minimizedDescription = (desc) => {
    var isiPad = screen.width == 1024 && screen.height == 768 || screen.width == 768 && screen.height == 1024;
    if(desc.length > 100) {
        while(!(desc.lastIndexOf(" ") < 170)) {
            desc = desc.substring(desc.lastIndexOf(" "), desc.lastIndexOf(" ")-desc.length);
        }
        if(isiPad) {
            while(!(desc.lastIndexOf(" ") < 110)) {
                desc = desc.substring(desc.lastIndexOf(" "), desc.lastIndexOf(" ") - desc.length);
            }
        }
        return (desc.charAt(desc.length-1) === '.' ? desc.concat("..") : desc.concat("..."));
    }
    return desc;
};

// INSERT RESOURCES INTO DOM
let loadResources = () => {
    const objStringify = JSON.stringify(resources), obj = JSON.parse(objStringify);
    let counter = 0;
    const resourcesObj = document.querySelector(".resources");
    Object.keys(obj).forEach(resource => {
        var object = obj[resource];
        var resLink = document.createElement('a');
        var resCard = document.createElement('div');
        var resImgCon = document.createElement('div');
        var resImg = document.createElement('div');
        var resDetails = document.createElement('div');
        var resTitle = document.createElement('h3');
        var resDesc = document.createElement('p');
        var rdescription = object.desc;
        resLink.classList.add("resource-link");
        resLink.id = `resource-${counter++}`;
        resLink.href = object.url;
        resLink.target = "_blank";
        resLink.title = `Visit ${object.title}`;
        resCard.classList.add("resource-card");
        resImgCon.classList.add("resource-img-container");
        resImg.id = "image";
        resImg.className = "resource-img lazy";
        resImg.style.backgroundImage = `url(${object.fileName}), url(${missingBackgrd})`;
        resDetails.classList.add("resource-details");
        resTitle.classList.add("resource-title");
        resDesc.classList.add("resource-desc");
        resImgCon.appendChild(resImg);
        resTitle.style.margin = (object.title.length > 24 ? "1rem 0" : "2rem 0");
        resTitle.append(object.title);
        resDesc.innerHTML = (minimizedDescription(rdescription));
        resCard.appendChild(resImgCon);
        resDetails.appendChild(resTitle);
        resDetails.appendChild(resDesc);
        resCard.appendChild(resDetails);
        resLink.appendChild(resCard);
        resourcesObj.appendChild(resLink);
    });
}

// LAZY LOAD IMAGES
let lazyLoading = () => {
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
            root: document.querySelector(".main-container"),
            rootMargin: "0px 0px -100px 0px"
        });

        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } 
    else {  
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");
        
        function lazyload () {
            if(lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }    

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if(img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
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

// SCROLL TO TOP BUTTON
let enableScrollToTop = () => {
    let resourceContainer = document.querySelector('.main-container.resource-container'),
        scrollTopIcon = document.querySelector('.scroll-top-icon-container');
    resourceContainer.addEventListener("scroll", (e) => {
        let topMax = (e.target.scrollHeight - e.target.clientHeight);
        let oneThirdWay = Math.round((topMax/3));
        let currScrollPos = e.target.scrollTop;

        if(currScrollPos >= oneThirdWay) scrollTopIcon.classList.remove('animate');
        else scrollTopIcon.classList.add('animate');
    });
};

$(document).ready(function(){
    const exe_one = new Promise((resolve, reject) => {
        resolve(loadResources());
    });
    exe_one.then(() => {
        lazyLoading();
    });
    enableScrollToTop();
});