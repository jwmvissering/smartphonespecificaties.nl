var app = angular.module('myApp', ['ui.router', 'yaru22.angular-timeago', 'ngMaterial', 'ngAnimate', 'ngFileUpload']);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/home.html",
    })
    .state('vergelijken', {
      url: "/vergelijken",
      templateUrl: "templates/vergelijken.html",
    })
    .state('toevoegen', {
      url: "/toevoegen",
      templateUrl: "templates/toevoegen.html",
    })
    .state('api', {
      url: "/api",
      templateUrl: "templates/api.html",
    })
    .state('apismartphones', {
      url: "/api/smartphones",
      redirectTo: "php/allsmartphones.php",
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
    })
    .state('beheer', {
      url: "/beheer",
      templateUrl: "templates/beheer.html",
    });
});