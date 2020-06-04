const filePath = "./assets/img/resources/state/";
const missingBackgrd = "./assets/img/img-placeholder.jpg";
const resources = {
    1: {
        url: "https://www.californiadebtrelief.org/assistance/  ",
        fileName: `${filePath}worried.jpg`,
        title: "California Debt Relief",
        desc: "Here to assists individuals and families in debt by serving as a locator service for BBB accredited companies. These companies specialize in specific debt relief categories, including debt management through credit counseling agencies, debt consolidation, debt negotiation, debt settlement and debt mediation."
    },
    2: {
        url: "https://covid19.ca.gov/ ",
        fileName: `${filePath}covid19.jpg`,
        title: "COVID-19",
        desc: "Anyone in California who needs a coronavirus test can get one free of charge. See our testing page to find an open site near you."
    },
    3: {
        url: "https://www.edd.ca.gov/about_edd/Additional_Resources.htm",
        fileName: `${filePath}staring-at-computer.jpg`,
        title: "EDD",
        desc: "The Employment Development Department enhances California’s economic growth and prosperity by collaboratively delivering valuable and innovative services to meet the evolving needs of employers, workers, and job seekers."
    },
    4: {
        url: "https://www.benefits.gov/benefit/1540",
        fileName: `${filePath}fixing-door.jpg`,
        title: "Low Income Home Energy Assistance",
        desc: "Eligible low-income persons, via local governmental and nonprofit organizations, can receive financial assistance to offset the costs of heating and/or cooling dwellings, and/or have their dwellings weatherized to make them more energy efficient."
    },
    5: {
        url: "https://cahealthadvocates.org/low-income-help/",
        fileName: `${filePath}stetoscope.jpg`,
        title: "Medicare",
        desc: "If you have low income and assets, you may qualify for help with some of your Medicare costs from one or more of the programs below."
    },
    6: {
        url: "https://www.hud.gov/states/california/renting",
        fileName: `${filePath}hud.png`,
        title: "Housing & Urban Deptartment",
        desc: "HUD is working to strengthen the housing market to bolster the economy and protect consumers; meet the need for quality affordable rental homes; utilize housing as a platform for improving quality of life; build inclusive and sustainable communities free from discrimination; and transform the way the Department does business."
    },
    7: {
        url: "https://childcare.gov/state-resources-home",
        fileName: `${filePath}kids.jpg`,
        title: "Child Care",
        desc: "Child Care helps parents access safe and quality child care services in their community that best suits their family’s needs."
    },
    // insert_number_here: {
    //     url: "insert_url_here",
    //     fileName: `${filePath}insert_image_name_here`,
    //     title: "insert_title_here",
    //     desc: "insert_description_here"
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
        resDesc.append(minimizedDescription(rdescription));
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
    let resourceContainer = document.querySelector('.main-container'),
        scrollTopIcon = document.querySelector('.scroll-top-icon-container');
    resourceContainer.addEventListener("scroll", (e) => {
        let topMax = (e.target.scrollHeight - e.target.clientHeight),
            oneThirdWay = Math.round((topMax/3)),
            currScrollPos = e.target.scrollTop;

        if(currScrollPos >= oneThirdWay) scrollTopIcon.classList.remove('animate');
        else scrollTopIcon.classList.add('animate');
    });
};

$(document).ready(function(){
    const exe_one = new Promise((resolve, reject) => {
        try { resolve(loadResources()); }
        catch(err) { reject(err); }
    });
    exe_one.then(() => { lazyLoading(); });
    enableScrollToTop();
});