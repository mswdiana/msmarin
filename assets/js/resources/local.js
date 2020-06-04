const filePath = "./assets/img/resources/local/";
const missingBackgrd = "./assets/img/img-placeholder.jpg";
const resources = {
    1: {
        url: "https://www.fresnounified.org/",
        fileName: `${filePath}fusd.jpg`,
        title: "Fresno Unified School District",
        desc: "Transforming Fresno Unified into a high performing district requires a foundation of core beliefs, which the Fresno Unified Board of Education adopted in the spring of 2007 to guide district actions and decisions."
    },
    2: {
        url: "https://www.fresnounified.org/dept/dpi",
        fileName: `${filePath}mental-health.jpg`,
        title: "Fresno Unified DPI",
        desc: "Through relationships with students, families, community and our Fresno Unified staff, the Department of Prevention and Intervention strives to reconnect with the humanity in education. We help to bridge gaps in opportunity through providing access to resources that promote the academic success and well-being of the \"whole-child\" and support the optimum conditions for learning in our schools."
    },
    3: {
        url: "https://abc30.com/business/city-of-fresno-donating-face-masks-to-small-businesses-opening-this-week/6212578/",
        fileName: `${filePath}hands-with-heart.jpg`,
        title: "Nami Fresno",
        desc: "At the heart of NAMI’s mission is our grassroots and the sharing of information with people with mental illness, their families, friends, mental health professionals, and the general public. NAMI strives to offer hope, reform and health to our American community through support, education , and advocacy efforts."
    },
    4: {
        url: "https://www.co.fresno.ca.us/home",
        fileName: `${filePath}fresno-county.jpg`,
        title: "Fresno County",
        desc: "The County of Fresno was formed in 1856 encompassing 6,011 square miles of California’s Central Valley. Today our County has a population of more than 1,000,000 people and is among the most diverse areas in the Country."
    },
    5: {
        url: "https://www.homelessshelterdirectory.org/cgi-bin/id/city.cgi?city=Fresno&state=CA",
        fileName: `${filePath}beds.png`,
        title: "Homeless Shelter Directory",
        desc: "We also provide other homeless resources such as transitional resources for the homeless. Homeless clinic and treatment center resources are also provided."
    },
    6: {
        url: "http://fresnostate.edu/kremen/about/centers-projects/weltycenter/documents/Fresno%20County%20Community%20Resource%20List%20Updated%2009222016.pdf",
        fileName: `${filePath}connect.png`,
        title: "Fresno County Community Resources",
        desc: "Resources such as: Food & Shelter, Free TaxPreparation, Utility Assistance, Cal Fresh (Food Stamps), Legal Services, Low CostInternet, Medical Insurance, Individual/Family Counseling, and much more."
    },
    7: {
        url: "http://aspiranetreachfresnocounty.org/services/resources/community-resource-directory/",
        fileName: `${filePath}sunset-fresno.jpg`,
        title: "Aspiranet REACH",
        desc: "REACH’s Adoption Services Resource Directory is a listing of support services for families who adopt through child welfare and other agencies. Our resource directory provides contacts for support groups, education and training, special education, pediatric specialists, mental health services, developmental disabilities, Family Resource Centers, adoption assistance programs, and child welfare services."
    },
    8: {
        url: "https://www.co.fresno.ca.us/home/showdocument?id=17156",
        fileName: `${filePath}community.png`,
        title: "Department of Social Services",
        desc: "The Family Resource Center, an affiliation to the Department of Social Services, is intended to supply a general community resource guide to the public. All hyperlinks leading off of this site should not be construed as an endorsement of any person or company."
    },
    9: {
        url: "http://211.org/",
        fileName: `${filePath}hands.png`,
        title: "211",
        desc: "211 is committed to being the first, most essential resource to anyone who needs help. We help thousands of people overcome barriers and address challenges every day."
    },
    10: {
        url: "https://www.uwfm.org/covid19",
        fileName: `${filePath}uwfm.png`,
        title: "United Way",
        desc: "United Way operates on the concept of Living United - the idea that the advancement of the common good can benefit the entire community. Our work isn't just putting bandages on major systemic problems; it involves individualized, long-term solutions that effectively lift working class families out of poverty and despair."
    },
    11: {
        url: "https://www.co.fresno.ca.us/home/showdocument?id=42128",
        fileName: `${filePath}warm-line.png`,
        title: "WARM Line",
        desc: "Fresno County Behavioral Health WARM Line (559) 600-9276(WARM). The DBH COVID-19 Warm Line provides non-emergency emotional and coping support to community members. Warm line operators provide supportive listening, practical coping ideas, and information on how to get connected to behavioral health services"
    },
    12: {
        url: "https://www.hhs.gov/aging/state-resources/index.html ",
        fileName: `${filePath}hhs.jpg`,
        title: "U.S. Human & Health Services",
        desc: "It is the mission of the U.S. Department of Health & Human Services to enhance and protect the health and well-being of all Americans. We fulfill that mission by providing for effective health and human services and fostering advances in medicine, public health, and social services."
    },
    13: {
        url: "https://www.communityresourcefinder.org/ ",
        fileName: `${filePath}searching.jpg`,
        title: "Community Resource Finder",
        desc: "The information contained in the Community Resource Finder is thought to be reliable. The Community Resource Finder is made available by the Alzheimer's Association and AARP."
    },
    14: {
        url: "http://fresnohousing.org/home2/",
        fileName: `${filePath}home.jpg`,
        title: "Fresno Housing Authority",
        desc: "A public agency that supports families and individuals – to access quality housing, to become engaged in their neighborhoods, and to build vibrant communities – throughout Fresno County."
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