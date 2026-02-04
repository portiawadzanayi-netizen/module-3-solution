(function (global) {
  var dc = {};
  var homeHtml = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

  // Convenience function for inserting HTML into element
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element (specified by 'selector').
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Substitute {{propName}} with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var copy = string;
    var propToReplace = "{{" + propName + "}}";
    copy = copy.replace(new RegExp(propToReplace, "g"), propValue);
    return copy;
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML, // STEP 4 is inside here!
      true);
  });

  // Builds HTML for the home page based on categories array returned from the server.
  function buildAndShowHomeHTML (categories) {
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (homeHtml) {
        // STEP 4: Choose a random category
        var chosenCategoryShortName = chooseRandomCategory(categories).short_name;
        
        // Substitute {{randomCategoryShortName}}
        var homeHtmlToInsertIntoMain = insertProperty(homeHtml, "randomCategoryShortName", "'" + chosenCategoryShortName + "'");

        insertHtml("#main-content", homeHtmlToInsertIntoMain);
      },
      false);
  }

  // STEP 3: Function to pick a random category
  function chooseRandomCategory (categories) {
    var randomArrayIndex = Math.floor(Math.random() * categories.length);
    return categories[randomArrayIndex];
  }

  global.$dc = dc;
})(window);
