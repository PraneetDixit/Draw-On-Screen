document.addEventListener('DOMContentLoaded', function() {
//    var checkPageButton = document.getElementById('go');
//    checkPageButton.addEventListener('click', function() {
        chrome.tabs.executeScript(null ,{
            file: "custom.js"
        });
//    });
});