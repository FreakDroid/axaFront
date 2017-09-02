/// <reference path="../typings/index.d.ts" />

module NewsModule{
    export class RouteConfig{
        public static $inject = ['$stateProvider', '$urlRouterProvider'];

        constructor($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
            $stateProvider.state('gnome', {
                url: "/gnomes",
                templateUrl: "appScripts/views/gnomes/gnomeList.html",
                controller: "GnomeController as Gnome"
            }).state('gnome.details', {
                url: "/details/{id}",
                templateUrl: "appScripts/views/gnomes/gnomeDetails.html",
                controller: "GnomeDetailsController as GnomeDetails"
            });

            $urlRouterProvider.otherwise("/gnomes");
        }
    }
}