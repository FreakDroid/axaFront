/// <reference path="../../typings/index.d.ts" />
var GnomeModule;
(function (GnomeModule) {
    var GnomeService = (function () {
        function GnomeService($http) {
            this.$http = $http;
        }
        GnomeService.prototype.GetAllGnomes = function () {
            return this.$http.get("https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json");
        };
        GnomeService.$inject = ['$http'];
        return GnomeService;
    }());
    GnomeModule.GnomeService = GnomeService;
})(GnomeModule || (GnomeModule = {}));
/// <reference path="../services/gnomeServices.ts" />
var GnomeModule;
(function (GnomeModule) {
    var GnomeController = (function () {
        function GnomeController(gnomeService) {
            this.gnomeService = gnomeService;
            //call the method to get all the gnomes
            this.LoadGnomes();
        }
        //Retrieve all the gnome from the API
        GnomeController.prototype.LoadGnomes = function () {
            var _this = this;
            this.gnomeService.GetAllGnomes().then(function (success) {
                //Here I called gnomeList because it's a list of gnomes
                //Brastlewark is the name of the city/country
                _this.showError = false;
                var data = success.data;
                _this.gnomeList = data;
            }, function (error) {
                console.log(error);
                _this.showError = true;
                _this.errorMessage = error;
            });
        };
        //Dependencies
        GnomeController.$inject = ["GnomeService", "DTOptionsBuilder", "DTColumnDefBuilder"];
        return GnomeController;
    }());
    GnomeModule.GnomeController = GnomeController;
})(GnomeModule || (GnomeModule = {}));
/// <reference path="../services/gnomeServices.ts" />
var GnomeModule;
(function (GnomeModule) {
    var GnomeDetailsController = (function () {
        function GnomeDetailsController(gnomeService, $stateParams) {
            this.gnomeService = gnomeService;
            //Get the param passed from the URL
            this.id = $stateParams["id"];
            this.LoadDetails();
        }
        //This method will load the details
        GnomeDetailsController.prototype.LoadDetails = function () {
            var _this = this;
            //Get the id passed from the URL, is necessary saved into a variable
            //to won't confuse the scope inside filter above.
            var selfId = this.id;
            //Turns off the error notifications
            this.showError = false;
            //Here I'm guessing the sex.
            var sexNumber = Math.floor(Math.random() * 6) + 1;
            this.sex = (sexNumber > 5) ? "Female" : "Male";
            //How the API doesn't return a specific Gnome, I fake it searching all the gnomes
            //and filtering by ID
            this.gnomeService.GetAllGnomes()
                .then(function (success) {
                var gnome = success.data.Brastlewark.filter(function (gnome) {
                    return gnome.id == selfId;
                });
                //Return the gnome[0] because filter is an array, so the first value index "zero" is what I'm looking for
                if (gnome.length > 0) {
                    //Active the detail
                    _this.show = true;
                    _this.details = gnome[0];
                }
                else {
                    _this.showError = true;
                    _this.errorMessage = "The Gnome doesn't exits";
                }
            }, function (error) {
                _this.showError = true;
                _this.errorMessage = error;
            });
        };
        GnomeDetailsController.prototype.click = function () {
            this.show = false;
        };
        //Dependencies
        GnomeDetailsController.$inject = ["GnomeService", "$stateParams"];
        return GnomeDetailsController;
    }());
    GnomeModule.GnomeDetailsController = GnomeDetailsController;
})(GnomeModule || (GnomeModule = {}));
/// <reference path="../typings/index.d.ts" />
//Angular routing
var NewsModule;
(function (NewsModule) {
    var RouteConfig = (function () {
        function RouteConfig($stateProvider, $urlRouterProvider) {
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
        RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
        return RouteConfig;
    }());
    NewsModule.RouteConfig = RouteConfig;
})(NewsModule || (NewsModule = {}));
/// <reference path="../typings/index.d.ts" />
/// <reference path="controllers/gnomeController.ts" />
/// <reference path="services/gnomeServices.ts" />
/// <reference path="controllers/gnomeDetailsController.ts" />
/// <reference path="routes.ts" />
//Main app
var app = angular.module("GnomeApp", ["ui.router", "datatables"]);
app.config(NewsModule.RouteConfig);
//Gnome Module
app.controller("GnomeController", GnomeModule.GnomeController);
app.service("GnomeService", GnomeModule.GnomeService);
app.controller("GnomeDetailsController", GnomeModule.GnomeDetailsController);
var GnomeModule;
(function (GnomeModule) {
    var GnomeModel = (function () {
        function GnomeModel() {
        }
        return GnomeModel;
    }());
    GnomeModule.GnomeModel = GnomeModel;
})(GnomeModule || (GnomeModule = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../controllers/gnomeController.ts" />
/// <reference path="../../services/gnomeServices.ts" />
/// <reference path="../../controllers/gnomeDetailsController.ts" />
/// <reference path="../../routes.ts" />
describe('GnomeModule', function () {
    describe('Control Gnomes loaded', function () {
        var test = GnomeController();
        // var scope,GnomeController;        
        //         beforeEach(inject(function ($rootScope, $controller) {
        //             scope = $rootScope.$new();
        //             GnomeController = $controller('Gnome', {
        //                 $scope: scope
        //             });
        //         }));
        // it('Gnome controller is load', function () {
        //     expect(GnomeController).toBeDefined();
        // });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFNjcmlwdHMvc2VydmljZXMvZ25vbWVTZXJ2aWNlcy50cyIsImFwcFNjcmlwdHMvY29udHJvbGxlcnMvZ25vbWVDb250cm9sbGVyLnRzIiwiYXBwU2NyaXB0cy9jb250cm9sbGVycy9nbm9tZURldGFpbHNDb250cm9sbGVyLnRzIiwiYXBwU2NyaXB0cy9yb3V0ZXMudHMiLCJhcHBTY3JpcHRzL2FwcC50cyIsImFwcFNjcmlwdHMvbW9kZWxzL2dub21lTW9kZWwudHMiLCJhcHBTY3JpcHRzL3ZpZXdzL2dub21lcy92aWV3LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaURBQWlEO0FBRWpELElBQU8sV0FBVyxDQWdCakI7QUFoQkQsV0FBTyxXQUFXO0lBQ2Q7UUFJSSxzQkFBb0IsS0FBc0I7WUFBdEIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDMUMsQ0FBQztRQUVNLG1DQUFZLEdBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFNLHdFQUF3RSxDQUFDLENBQUM7UUFDekcsQ0FBQztRQVJhLG9CQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQWF0QyxtQkFBQztLQWRELEFBY0MsSUFBQTtJQWRZLHdCQUFZLGVBY3hCLENBQUE7QUFDTCxDQUFDLEVBaEJNLFdBQVcsS0FBWCxXQUFXLFFBZ0JqQjtBQ2xCRCxxREFBcUQ7QUFFckQsSUFBTyxXQUFXLENBdUNqQjtBQXZDRCxXQUFPLFdBQVc7SUFDZDtRQWNJLHlCQUFxQixZQUEwQjtZQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUMzQyx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFHRCxxQ0FBcUM7UUFDN0Isb0NBQVUsR0FBbEI7WUFBQSxpQkFlQztZQWRHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztnQkFDckMsdURBQXVEO2dCQUN2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QUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN0RCxHQUFHLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FDYjdFLElBQU8sV0FBVyxDQVlqQjtBQVpELFdBQU8sV0FBVztJQUNkO1FBQUE7UUFVQSxDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLHNCQUFVLGFBVXRCLENBQUE7QUFDTCxDQUFDLEVBWk0sV0FBVyxLQUFYLFdBQVcsUUFZakI7QUNaRCxvREFBb0Q7QUFDcEQsNkRBQTZEO0FBQzdELHdEQUF3RDtBQUN4RCxvRUFBb0U7QUFDcEUsd0NBQXdDO0FBRXhDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDbEIsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1FBQzlCLElBQUksSUFBSSxHQUFHLGVBQWUsRUFBRSxDQUFDO1FBQy9CLHFDQUFxQztRQUNyQyxpRUFBaUU7UUFDakUseUNBQXlDO1FBQ3pDLHVEQUF1RDtRQUN2RCxnQ0FBZ0M7UUFDaEMsa0JBQWtCO1FBQ2xCLGVBQWU7UUFFUCwrQ0FBK0M7UUFDL0MsNkNBQTZDO1FBQzdDLE1BQU07SUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJzb3VyY2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbm1vZHVsZSBHbm9tZU1vZHVsZXtcbiAgICBleHBvcnQgY2xhc3MgR25vbWVTZXJ2aWNle1xuICAgICAgICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbJyRodHRwJ107XG5cblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBuZy5JSHR0cFNlcnZpY2UpIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBHZXRBbGxHbm9tZXMoKTogbmcuSUh0dHBQcm9taXNlPGFueT57XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQ8YW55PihcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9ycmFmb2xzL21vYmlsZV90ZXN0L21hc3Rlci9kYXRhLmpzb25cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0xvYWREZXRhaWxzIGlzIG5vdCBwb3NpYmxlIGhlcmUsIHNvIEkgZmFrZSBpdC5cbiAgICAgICAgLy8gcHVibGljIExvYWREZXRhaWxzKGdub21lSWQpOiBHbm9tZU1vZGVse1xuICAgICAgICAvLyB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9zZXJ2aWNlcy9nbm9tZVNlcnZpY2VzLnRzXCIgLz5cblxubW9kdWxlIEdub21lTW9kdWxle1xuICAgIGV4cG9ydCBjbGFzcyBHbm9tZUNvbnRyb2xsZXJ7XG4gICAgICAgIC8vRGVwZW5kZW5jaWVzXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcIkdub21lU2VydmljZVwiLCBcIkRUT3B0aW9uc0J1aWxkZXJcIiwgXCJEVENvbHVtbkRlZkJ1aWxkZXJcIl07XG5cbiAgICAgICAgLy9WYXJpYWJsZXMgdG8gYXZvaWQgdXNpbmcgJHNjb3BlXG4gICAgICAgIHB1YmxpYyBnbm9tZUxpc3Q6IEdub21lTW9kZWxbXTtcbiAgICAgICAgcHVibGljIGR0T3B0aW9uczogYW55O1xuICAgICAgICBwdWJsaWMgZHRDb2x1bW5EZWZzOiBhbnk7XG4gICAgICAgIHB1YmxpYyBwZW9wbGUgOiBhbnk7XG4gICAgICAgIHB1YmxpYyBnbm9tZURldGFpbHM6IEdub21lTW9kZWw7XG4gICAgICAgIHB1YmxpYyBleHBhbmRlZDogYm9vbGVhbjtcbiAgICAgICAgcHVibGljIHNob3dFcnJvcjogYm9vbGVhbjtcbiAgICAgICAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yIChwcml2YXRlIGdub21lU2VydmljZTogR25vbWVTZXJ2aWNlKXtcbiAgICAgICAgICAgIC8vY2FsbCB0aGUgbWV0aG9kIHRvIGdldCBhbGwgdGhlIGdub21lc1xuICAgICAgICAgICAgdGhpcy5Mb2FkR25vbWVzKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vUmV0cmlldmUgYWxsIHRoZSBnbm9tZSBmcm9tIHRoZSBBUElcbiAgICAgICAgcHJpdmF0ZSBMb2FkR25vbWVzKCl7XG4gICAgICAgICAgICB0aGlzLmdub21lU2VydmljZS5HZXRBbGxHbm9tZXMoKS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL0hlcmUgSSBjYWxsZWQgZ25vbWVMaXN0IGJlY2F1c2UgaXQncyBhIGxpc3Qgb2YgZ25vbWVzXG4gICAgICAgICAgICAgICAgICAgIC8vQnJhc3RsZXdhcmsgaXMgdGhlIG5hbWUgb2YgdGhlIGNpdHkvY291bnRyeVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHN1Y2Nlc3MuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbm9tZUxpc3QgPSBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2VydmljZXMvZ25vbWVTZXJ2aWNlcy50c1wiIC8+XG5cbm1vZHVsZSBHbm9tZU1vZHVsZSB7XG4gICAgZXhwb3J0IGNsYXNzIEdub21lRGV0YWlsc0NvbnRyb2xsZXIge1xuICAgICAgICAvL0RlcGVuZGVuY2llc1xuICAgICAgICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXCJHbm9tZVNlcnZpY2VcIiwgXCIkc3RhdGVQYXJhbXNcIl07XG5cbiAgICAgICAgLy9WYXJpYWJsZXMgdG8gYXZvaWQgdXNpbmcgJHNjb3BlXG4gICAgICAgIHB1YmxpYyBkZXRhaWxzOiBHbm9tZU1vZGVsO1xuICAgICAgICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHNob3c6IGJvb2xlYW47XG4gICAgICAgIHB1YmxpYyBzZXg6IHN0cmluZztcbiAgICAgICAgcHVibGljIHNob3dFcnJvcjogYm9vbGVhbjtcbiAgICAgICAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICAgICAgICBcblxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdub21lU2VydmljZTogR25vbWVTZXJ2aWNlLCAkc3RhdGVQYXJhbXM6IG5nLnVpLklTdGF0ZVBhcmFtc1NlcnZpY2Upe1xuICAgICAgICAgICAgLy9HZXQgdGhlIHBhcmFtIHBhc3NlZCBmcm9tIHRoZSBVUkxcbiAgICAgICAgICAgIHRoaXMuaWQgPSAkc3RhdGVQYXJhbXNbXCJpZFwiXTtcbiAgICAgICAgICAgIHRoaXMuTG9hZERldGFpbHMoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9UaGlzIG1ldGhvZCB3aWxsIGxvYWQgdGhlIGRldGFpbHNcbiAgICAgICAgcHJpdmF0ZSBMb2FkRGV0YWlscygpe1xuICAgICAgICAgICAgLy9HZXQgdGhlIGlkIHBhc3NlZCBmcm9tIHRoZSBVUkwsIGlzIG5lY2Vzc2FyeSBzYXZlZCBpbnRvIGEgdmFyaWFibGVcbiAgICAgICAgICAgIC8vdG8gd29uJ3QgY29uZnVzZSB0aGUgc2NvcGUgaW5zaWRlIGZpbHRlciBhYm92ZS5cbiAgICAgICAgICAgIGxldCBzZWxmSWQgPSB0aGlzLmlkO1xuXG4gICAgICAgICAgICAvL1R1cm5zIG9mZiB0aGUgZXJyb3Igbm90aWZpY2F0aW9uc1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy9IZXJlIEknbSBndWVzc2luZyB0aGUgc2V4LlxuICAgICAgICAgICAgbGV0IHNleE51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMSA7XG4gICAgICAgICAgICB0aGlzLnNleCA9IChzZXhOdW1iZXIgPiA1KSA/IFwiRmVtYWxlXCIgOiBcIk1hbGVcIjtcblxuXG4gICAgICAgICAgICAvL0hvdyB0aGUgQVBJIGRvZXNuJ3QgcmV0dXJuIGEgc3BlY2lmaWMgR25vbWUsIEkgZmFrZSBpdCBzZWFyY2hpbmcgYWxsIHRoZSBnbm9tZXNcbiAgICAgICAgICAgIC8vYW5kIGZpbHRlcmluZyBieSBJRFxuICAgICAgICAgICAgdGhpcy5nbm9tZVNlcnZpY2UuR2V0QWxsR25vbWVzKClcbiAgICAgICAgICAgICAgICAudGhlbihzdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdub21lID0gc3VjY2Vzcy5kYXRhLkJyYXN0bGV3YXJrLmZpbHRlcihnbm9tZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnbm9tZS5pZCA9PSBzZWxmSWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vUmV0dXJuIHRoZSBnbm9tZVswXSBiZWNhdXNlIGZpbHRlciBpcyBhbiBhcnJheSwgc28gdGhlIGZpcnN0IHZhbHVlIGluZGV4IFwiemVyb1wiIGlzIHdoYXQgSSdtIGxvb2tpbmcgZm9yXG4gICAgICAgICAgICAgICAgICAgIGlmIChnbm9tZS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQWN0aXZlIHRoZSBkZXRhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbHMgPSBnbm9tZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBcIlRoZSBHbm9tZSBkb2Vzbid0IGV4aXRzXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY2xpY2soKXtcbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuLy9Bbmd1bGFyIHJvdXRpbmdcbm1vZHVsZSBOZXdzTW9kdWxle1xuICAgIGV4cG9ydCBjbGFzcyBSb3V0ZUNvbmZpZ3tcbiAgICAgICAgcHVibGljIHN0YXRpYyAkaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcigkc3RhdGVQcm92aWRlcjogYW5ndWxhci51aS5JU3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyOiBhbmd1bGFyLnVpLklVcmxSb3V0ZXJQcm92aWRlcikge1xuICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2dub21lJywge1xuICAgICAgICAgICAgICAgIHVybDogXCIvZ25vbWVzXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwU2NyaXB0cy92aWV3cy9nbm9tZXMvZ25vbWVMaXN0Lmh0bWxcIixcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkdub21lQ29udHJvbGxlciBhcyBHbm9tZVwiXG4gICAgICAgICAgICB9KS5zdGF0ZSgnZ25vbWUuZGV0YWlscycsIHtcbiAgICAgICAgICAgICAgICB1cmw6IFwiL2RldGFpbHMve2lkfVwiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcFNjcmlwdHMvdmlld3MvZ25vbWVzL2dub21lRGV0YWlscy5odG1sXCIsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogXCJHbm9tZURldGFpbHNDb250cm9sbGVyIGFzIEdub21lRGV0YWlsc1wiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9nbm9tZXNcIik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiY29udHJvbGxlcnMvZ25vbWVDb250cm9sbGVyLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzZXJ2aWNlcy9nbm9tZVNlcnZpY2VzLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb250cm9sbGVycy9nbm9tZURldGFpbHNDb250cm9sbGVyLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJyb3V0ZXMudHNcIiAvPlxuXG4vL01haW4gYXBwXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJHbm9tZUFwcFwiLCBbXCJ1aS5yb3V0ZXJcIiwgXCJkYXRhdGFibGVzXCJdKTtcbmFwcC5jb25maWcoTmV3c01vZHVsZS5Sb3V0ZUNvbmZpZyk7XG5cbi8vR25vbWUgTW9kdWxlXG5hcHAuY29udHJvbGxlcihcIkdub21lQ29udHJvbGxlclwiLCBHbm9tZU1vZHVsZS5Hbm9tZUNvbnRyb2xsZXIpO1xuYXBwLnNlcnZpY2UoXCJHbm9tZVNlcnZpY2VcIiwgR25vbWVNb2R1bGUuR25vbWVTZXJ2aWNlKTtcbmFwcC5jb250cm9sbGVyKFwiR25vbWVEZXRhaWxzQ29udHJvbGxlclwiLCBHbm9tZU1vZHVsZS5Hbm9tZURldGFpbHNDb250cm9sbGVyKTtcblxuIiwibW9kdWxlIEdub21lTW9kdWxle1xuICAgIGV4cG9ydCBjbGFzcyBHbm9tZU1vZGVse1xuICAgICAgICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICAgICAgcHVibGljIHR1bWJuYWlsOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBhZ2U6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHdlaWdodDogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyBoYWlyX2NvbG9yOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBwcm9mZXNzaW9uczogQXJyYXk8c3RyaW5nPjtcbiAgICAgICAgcHVibGljIGZyaWVuZHM6IEFycmF5PHN0cmluZz47XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2NvbnRyb2xsZXJzL2dub21lQ29udHJvbGxlci50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vc2VydmljZXMvZ25vbWVTZXJ2aWNlcy50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vY29udHJvbGxlcnMvZ25vbWVEZXRhaWxzQ29udHJvbGxlci50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vcm91dGVzLnRzXCIgLz5cblxuZGVzY3JpYmUoJ0dub21lTW9kdWxlJywgZnVuY3Rpb24oKSB7XG4gICAgICBkZXNjcmliZSgnQ29udHJvbCBHbm9tZXMgbG9hZGVkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICBsZXQgdGVzdCA9IEdub21lQ29udHJvbGxlcigpO1xuICAgICAgICAvLyB2YXIgc2NvcGUsR25vbWVDb250cm9sbGVyOyAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24gKCRyb290U2NvcGUsICRjb250cm9sbGVyKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIEdub21lQ29udHJvbGxlciA9ICRjb250cm9sbGVyKCdHbm9tZScsIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICRzY29wZTogc2NvcGVcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGl0KCdHbm9tZSBjb250cm9sbGVyIGlzIGxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGV4cGVjdChHbm9tZUNvbnRyb2xsZXIpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
