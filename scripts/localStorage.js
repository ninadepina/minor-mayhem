// http://diveintohtml5.info/storage.html
export function supports_html5_storage() {
    try {
        if ('localStorage' in window && window['localStorage'] !== null) {
            localStorage.setItem("testitem",true);
            localStorage.getItem("testitem");
            localStorage.removeItem("testitem");
            return true;
        }
    } catch (e) {
        return false;
    }
}