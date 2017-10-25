'use strict'

angular.module('App', ['ngRoute'])

.config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'assets/views/home.html',
                controller: 'homeCtrl'
            })
            .when('/persons', {
                templateUrl: 'assets/views/persons.html',
                controller: 'personsCtrl'
            })
            .when('/quotes/:person_id', {
                templateUrl: 'assets/views/quotes.html',
                controller: 'quotesCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    })
    .controller('homeCtrl', ['$scope', function homeCtrl($scope) {}])
    .controller('personsCtrl', ['$scope', 'personSrv', function personsCtrl($scope, personSrv) {
        $scope.persons = personSrv.getAllPersons();
    }])
    .controller('quotesCtrl', ['$scope', '$routeParams', 'personSrv', 'quotesSrv', function quotesCtrl($scope, $routeParams, personSrv, quotesSrv) {
        $scope.person = personSrv.getPerson(parseInt($routeParams.person_id));
        $scope.quotes = quotesSrv.getAllQuotesFromPerson(parseInt($routeParams.person_id));
    }])
    .factory('personSrv', [function() {
        var persons = [{
            'id': 0,
            'name': 'Winston Churchill'
        }, {
            'id': 1,
            'name': 'Albert Einstein'
        }];
        return {
            getAllPersons: function() {
                return persons;
            },
            getPerson: function(person_id) {
                for (var j = 0; j < persons.length; j++) {
                    if (persons[j].id === person_id) {
                        return persons[j];
                    };
                }
                return null;
            }
        }
    }])
    .factory('quotesSrv', [function() {
        var quotes = [{
            'id': 0,
            'quotes': ["I may be drunk, Miss, but in the morning I will be sober and you will still be ugly.",
                "You have enemies? Good. That means you've stood up for something, sometime in your life."
            ]
        }, {
            'id': 1,
            'quotes': ["Try not to become a man of success, but rather try to become a man of value.",
                "The true sign of intelligence is not knowledge but imagination."
            ]
        }];
        return {
            getAllQuotes: function() {
                return quotes;
            },
            getAllQuotesFromPerson: function(person_id) {
                for (var j = 0; j < quotes.length; j++) {
                    if (quotes[j].id === person_id) {
                        return quotes[j].quotes;
                    };
                }
                return null;
            }
        }
    }]);
