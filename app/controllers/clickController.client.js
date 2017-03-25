'use strict';

// special syntax for an Immediately Invoked Function Expression
(function () {
    // set vars to selected DOM elements
    var addButton = document.querySelector('.btn-add');
    var deleteButton = document.querySelector('.btn-delete');
    var clickNbr = document.querySelector('#click-nbr');
    
    // set api request URL
    var apiurl = 'https://clementine-tut-1-tennispro1213.c9users.io/api/clicks';
    
    // ready runs fn only when DOM is ready and loaded, and asynchronously runs otherwise
    function ready (fn) {
        // ensure fn is a function
        if (typeof fn !== 'function') {
            return;
        }
        
        // run if page is loaded
        if (document.readyState === 'complete') {
            return fn();
        }
        
        // async listener runs once DOM is loaded
        document.addEventListener('DOMContentLoaded', fn, false);
    }
    
    // make an Asychronous JavaScript And XML (AJAX) request using a request method to a url, and passes response to callback
    function ajaxRequest(method, url, callback) {
        // new object instance
        var xmlhttp = new XMLHttpRequest();
        
        // run this when any state change occurs
        xmlhttp.onreadystatechange = function () {
            // run callback with response only if page is finished loading successfully
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.response);
            }
        }
        
        // set up request, then make it
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    }
    
    // updates the click count number displayed by clickNbr element
    function updateClickCount(data) {
        var clicksData = JSON.parse(data);
        clickNbr.innerHTML = clicksData.clicks;
    }
    
    // set the value of the clickNbr element immediately on page load
    ready(ajaxRequest('GET', apiurl, updateClickCount));
    
    // run when addButton is clicked
    addButton.addEventListener('click', function () {
        // make a POST request to the api
        ajaxRequest('POST', apiurl, function () {
            // then update the clickNbr element
            ajaxRequest('GET', apiurl, updateClickCount);
        });
    }, false); // disable event capturing, aka use event bubbling
    
    // run when deleteButton is clicked
    deleteButton.addEventListener('click', function () {
        // make a DELETE request to the api
        ajaxRequest('DELETE', apiurl, function () {
            // then update the clickNbr element
            ajaxRequest('GET', apiurl, updateClickCount);
        });
    }, false); // use event bubbling
})();