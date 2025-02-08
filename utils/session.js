export function flashMessage(key, value){
    sessionStorage.setItem(key, value)
}
export function getFlashMessage(key){
    const message = sessionStorage.getItem(key)
    sessionStorage.removeItem(key)
    return message
}