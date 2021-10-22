export function enableBodyScroll(){
    const element = document.querySelector("#appBody");
    element.classList.remove("overflow-hidden");
}

export function disableBodyScroll(){
    const element = document.querySelector("#appBody");
    window.scrollTo(0, 0);;
    element.classList.add("overflow-hidden");
}
