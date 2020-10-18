"use strict";

(function() {

  window.addEventListener("load", init);

  async function init() {
    await window.open('https://accounts.google.com/o/oauth2/v2/auth?client_id=305202964565-8qf7cn9jrj25j5u7i0u09aadg2e6alk9.apps.googleusercontent.com&redirect_uri=https://walendar.herokuapp.com/authorization.html&response_type=code&scope=https://www.googleapis.com/auth/calendar.events.readonly&access_type=offline&prompt=select_account');

    //fetchGetJSON("/getAccounts", printOut);
  }

  function printOut(resp) {
    console.log(resp);
  }

  /**
   * Helper function that fetches from the given URL with a GET request and calls
   * a given function to incorporate the information into the webpage
   * @param {string} url URL that is fetched for
   * @param {function} func Function that will manipulate the fetched information
   */
  function fetchGetJSON(url, func) {
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(func)
      .catch(error => handleError(error));
  }

  /**
   * Helper function that fetches from a given URL with a POST request and passes
   * the given parameters alongside the fetch. Calls a given function to incorporate
   * the received information into the webpage
   * @param {string} url URL that is fetched for
   * @param {string[]} params Parameters that are passed alongside the fetch request
   * @param {function} func Function that will manipulate the fetched information
   * @param {function} errorFunc Error handling function
   */
  async function fetchPostJSON(url, params, func) {
    try {
      // let bodyParams = new FormData();
      // for (let i = 0; i < params.length; i += 2) {
      //   bodyParams.append(params[i], params[i + 1]);
      // }
      let resp = await fetch(url, {method: "POST", body: params});
      await checkStatus(resp);
      let info = await resp.json();
      func(info);
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Displays a message to the player indicating that a server-side error occurred.
   * @param {string} error Informative error that is displayed to the user.
   */
  function handleError(error) {
    console.log(error);
  }

  /**
   * Checks whether or not the fetch request was successful. If an error occurs, the returned
   * error message is displayed.
   * @param {object} resp Returned when fetching an API. Contains information from the fetch
   * @returns {object} Information from the fetch
   */
  async function checkStatus(resp) {
    console.log("before check functions");
    if (resp.ok) {
      console.log("in okay");
      return resp;
    } else {
      console.log("in error");
      let error = await resp.json();
      console.log(error);
      throw new Error(error.error);
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
