(function(){
  angular
  .module("Gesamt")
  .config(Configure);

  function Configure($routeProvider, $httpProvider) {
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
    .when("/germanDictionary", {
      templateUrl: "views/dictionary/germanDictionary.view.html",
      controller: "GermanDictionaryController",
      controllerAs: "model"
    })
    .when("/englishDictionary", {
      templateUrl: "views/dictionary/englishDictionary.view.html",
      controller: "EnglishDictionaryController",
      controllerAs: "model"
    })
    .when("/vocabulary", {
      templateUrl: "views/vocabulary/vocabulary.view.html",
      controller: "VocabularyController",
      controllerAs: "model"
    })
    .when("/germanTest", {
      templateUrl: "views/test/germanTest.view.html",
      controller: "GermanTestController",
      controllerAs: "model"
    })
    .when("/englishTest", {
      templateUrl: "views/test/englishTest.view.html",
      controller: "EnglishTestController",
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

  var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
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

  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
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

  var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
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
