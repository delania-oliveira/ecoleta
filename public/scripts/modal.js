const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const fechar = document.querySelector("#modal .header a")


buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

fechar.addEventListener("click", () => {
    modal.classList.add("hide")
})

