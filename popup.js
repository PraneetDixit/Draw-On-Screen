chrome.windows.getCurrent(function(wind) {
    var maxWidth = window.screen.availWidth;
    var maxHeight = window.screen.availHeight;
    var updateInfo = {
        left: 0,
        top: 0,
        width: maxWidth/2,
        state: "normal",
        height: maxHeight
    };
    chrome.windows.update(wind.id, updateInfo);
    localStorage.setItem("baseDrawingWindowID", `${wind.id}`);
});
chrome.windows.create({
    url: '/drawing.html',
    type: 'normal',
    width: window.screen.availWidth/2,
    height: window.screen.availHeight,
    focused: true,
    left: window.screen.availWidth/2
});
