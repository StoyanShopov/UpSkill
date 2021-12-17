export function enableBodyScroll() {
    var element = document.querySelector("#appBody");
    element.classList.remove("overflow-hidden");
}

export function disableBodyScroll() {
    var element = document.querySelector("#appBody");
    window.scrollTo(0, 0);;
    element.classList.add("overflow-hidden");
}