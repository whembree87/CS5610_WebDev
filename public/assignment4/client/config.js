(function(){
  angular
  .module("FormBuilderApp")
  .config(Configure);

  function Configure($routeProvider) {
    $routeProvider
    .when("/home",{
      templateUrl: "views/home/home.view.html",
      controller: "HomeController",
      controllerAs: "model"
    })
    .when("/profile", {
      templateUrl: "views/users/profile.view.html",
      controller: "ProfileController",
      controllerAs: "model"
    })
    .when("/admin", {
      templateUrl: "views/admin/admin.view.html",
      controller: "AdminController",
      controllerAs: "model"
    })
    .when("/forms", {
      templateUrl: "views/forms/forms.view.html",
      controller: "FormsController",
      controllerAs: "model"
    })
    .when("/fields", {
      templateUrl: "views/forms/fields.view.html",
      controller: "FieldController",
      controllerAs: "model"
    })
    .when("/form/:formId/fields​", {
      templateUrl: "views/forms/fields.view.html",
      controller: "FieldController",
      controllerAs: "model"
    })
    .when("/login", {
      templateUrl: "views/users/login.view.html",
      controller: "LoginController",
      controllerAs: "model"
    })
    .when("/register", {
      templateUrl: "views/users/register.view.html",
      controller: "RegisterController",
      controllerAs: "model"
    })
    .otherwise({
      redirectTo: "/home"
    });
  }

})();
