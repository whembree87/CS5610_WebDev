(function(){
  angular
  .module("FormBuilderApp")
  .config(Configure);

  function Configure($routeProvider, $httpProvider, $rootScope) {
    $routeProvider
    .when("/home",{
      templateUrl: "views/home/home.view.html",
      controller: "HomeController",
      resolve: {
        loggedin: checkCurrentUser
      }
    })
    .when("/profile", {
      templateUrl: "views/users/profile.view.html",
      controller: "ProfileController",
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when("/admin", {
      templateUrl: "views/admin/admin.view.html",
      controller: "AdminController",
      resolve: {
        loggedin: checkAdmin
      }
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

  //////////////////////

  var checkAdmin = function($q, $timeout, $http, $location, $rootScope){
    var deferred = $q.defer();

    $http.get('/api/assignment/loggedin').success(function(user)
    {
      $rootScope.errorMessage = null;
      // User is Authenticated
      if (user !== '0' && user.roles.indexOf('admin') != -1)
      {
        $rootScope.currentUser = user;
        deferred.resolve();
      }
    });

    return deferred.promise;
  };

  //////////////////////

  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
    var deferred = $q.defer();

    $http.get('/api/assignment/loggedin').success(function(user)
    {
      $rootScope.errorMessage = null;
      // User is Authenticated
      if (user !== '0')
      {
        $rootScope.currentUser = user;
        deferred.resolve();
      }
      // User is Not Authenticated
      else
      {
        $rootScope.errorMessage = 'You need to log in.';
        deferred.reject();
        $location.url('/login');
      }
    });

    return deferred.promise;
  };

  //////////////////////

  var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope){
    var deferred = $q.defer();

    $http.get('/api/assignment/loggedin').success(function(user)
    {
      $rootScope.errorMessage = null;
      // User is Authenticated
      if (user !== '0')
      {
        $rootScope.currentUser = user;
      }
      deferred.resolve();
    });

    return deferred.promise;
  };

  //////////////////////

})();
