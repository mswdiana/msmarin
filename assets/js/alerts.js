function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function copyToClipboard(btn) {
    btn.addEventListener("mouseup", (e) => {
        e.preventDefault();
        let successful = new ClipboardJS(e.target);
        try {
            let modalBody = document.querySelector("#options .modal-body");
            let alertMsg = document.createElement("div");
            alertMsg.className = "alert alert-dismissible fade";
            alertMsg.classList.add(successful ? "alert-success" : "alert-danger");
            alertMsg.setAttribute("role", "alert");
            alertMsg.innerHTML = successful ? `Copied to clipboard!` : "Uh oh! Something happened.";
            modalBody.firstChild.parentNode.insertBefore(alertMsg, modalBody.firstChild);
            window.setTimeout(() => {alertMsg.classList.add("show");}, 300);
            window.setTimeout(() => {
                alertMsg.classList.remove("show");
                window.setTimeout(() => {alertMsg.remove();}, 800);
            }, 2000);
            
        } catch(err) {
            console.log(err);
        }
    });
}

function makePhoneCall(btn, phone) {
    btn.addEventListener("mouseup", (e) => {
        e.preventDefault();
        let modalBody = document.querySelector("#options .modal-body");
        let alertMsg = document.createElement("div");
        try {
            alertMsg.className = "alert alert-dismissible fade";
            alertMsg.classList.add("alert-warning");
            alertMsg.setAttribute("role", "alert");
            alertMsg.innerHTML = `Calling ${phone}...`;
            modalBody.firstChild.parentNode.insertBefore(alertMsg, modalBody.firstChild);
            window.setTimeout(() => {alertMsg.classList.add("show");}, 200);
            window.setTimeout(() => {
                alertMsg.classList.remove("show");
                window.setTimeout(() => {alertMsg.remove();}, 800);
            }, 2200);
            window.location.replace(`tel:${phone}`);
        } catch(err) {
            alertMsg.className = "alert alert-dismissible fade";
            alertMsg.classList.add("alert-danger");
            alertMsg.setAttribute("role", "alert");
            alertMsg.innerHTML = `<strong>Uh oh!</strong><br/>${err}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>`;
            modalBody.firstChild.parentNode.insertBefore(alertMsg, modalBody.firstChild);
            window.setTimeout(() => {alertMsg.classList.add("show");}, 200);
        }
    });
}

function renderMoreActions(title, body) {
    const mod = document.createElement("div");
    const bod = document.querySelector("body");
    mod.id = "options";
    mod.className = "modal fade more-actions";
    mod.tabIndex = "-1";
    mod.setAttribute("role", "dialog");
    mod.setAttribute("aria-labelledby", "options");
    mod.setAttribute("aria-hidden", "true");
    mod.style.backgroundColor = "rgba(0,0,0,0.5)";
    mod.innerHTML = `<div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="options">${title}</h5>
                <button type="button" class="close" data-dismiss="more-actions" aria-label="Close" title="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="message"><span class="important-read">Phone number</span><br/>${body}</p>
            </div>
            <div class="modal-footer">
                <button type="button" id="copy-btn" class="btn btn-secondary" data-clipboard-text="${body}">Copy to clipboard</button>
                <button type="button" id="call-btn" class="btn btn-danger">Call now</button>
            </div>
        </div>
    </div>`;
    bod.firstChild.parentNode.insertBefore(mod, bod.firstChild);
    window.setTimeout(() => {
        mod.classList.add("show");
        mod.childNodes[0].children[0].style.backgroundColor = "#ECECEC";
        document.querySelector("#disclaimer").remove();
        copyToClipboard(document.querySelector("#copy-btn"));
        makePhoneCall(document.querySelector("#call-btn"), body);
        document.querySelector("#options button.close").addEventListener("mouseup", (e) => {
            e.preventDefault();
            mod.classList.remove("show");
            render();
            window.setTimeout(() => {mod.remove()}, 500);
        });
    }, 200);
}

function render() {
    let mod = document.createElement("div"),
        bod = document.querySelector("body"),
        mainCont = document.querySelector(".main-container"),
        navBar = document.querySelector(".navbar");
    mod.id = "disclaimer";
    mod.className = "modal fade";
    mod.dataset.backdrop = "static";
    mod.dataset.keyboard = "false";
    mod.tabIndex = "-1";
    mod.setAttribute("role", "dialog");
    mod.setAttribute("aria-labelledby", "disclaimer");
    mod.setAttribute("aria-hidden", "true");
    mod.innerHTML = `<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="disclaimerLabel">ATTENTION</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="message">This is not intended to be a Crisis Hotline or substitute for mental health services.</p>
                <p class="message">If you are experiencing a medical or mental health emergency, please call <a class="btn btn-link more-action" title="Click for more actions" data-description="Emergency">911</a>.</p>
                <p class="message">If you are in crisis, please call the <a class="btn btn-link" href="https://www.suicidepreventionlifeline.org/" title="Visit National Suicide Prevention Lifeline">National Suicide Prevention Lifeline</a> at <a class="btn btn-link more-action" title="Click for more actions" data-description="National Suicide Prevention Lifeline">1-800-273-8255</a>.</p>
                <p class="message">If you have general questions, please call the Fresno Unified COVID-19 Call Center at <a class="btn btn-link more-action" title="Click for more actions"  data-description="FUSD COVID-19 Call Center">(559) 457-3395</a>.</p>
            </div>
            <div class="modal-footer">
                <button type="button" id="understood-btn" class="btn btn-danger" data-dismiss="modal">I understand</button>
            </div>
        </div>
    </div>`;

    bod.firstChild.parentNode.insertBefore(mod, bod.firstChild);
    window.setTimeout(() => {
        mainCont.classList.add("blur");
        navBar.classList.add("blur");
        mod.classList.add("show");
        document.querySelector("#understood-btn").addEventListener("mouseup", (e) => {
            e.preventDefault();
            setCookie("disclaimer", "user understood", 30);
            mod.classList.remove("show");
            mainCont.classList.remove("blur");
            navBar.classList.remove("blur");
            window.setTimeout(() => {mod.remove();}, 400);
        });
        document.querySelector("#disclaimer button.close").addEventListener("mouseup", (e) => {
            e.preventDefault();
            mod.classList.remove("show");
            mainCont.classList.remove("blur");
            navBar.classList.remove("blur");
            window.setTimeout(() => {mod.remove()}, 400);
        });
    }, 800);

    window.setTimeout(() => {
        document.querySelectorAll(".more-action").forEach(elem => {
            elem.addEventListener("click", (e) => {
                e.preventDefault();
                renderMoreActions(e.target.dataset.description, e.target.innerText);
            });
        });
    }, 500);
    
}

$(document).ready(function() {
    if(!getCookie("disclaimer")) render();
});