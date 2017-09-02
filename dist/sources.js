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
var app = angular.module("NewsApp", ["ui.router", "datatables"]);
app.config(NewsModule.RouteConfig);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFNjcmlwdHMvc2VydmljZXMvZ25vbWVTZXJ2aWNlcy50cyIsImFwcFNjcmlwdHMvY29udHJvbGxlcnMvZ25vbWVDb250cm9sbGVyLnRzIiwiYXBwU2NyaXB0cy9jb250cm9sbGVycy9nbm9tZURldGFpbHNDb250cm9sbGVyLnRzIiwiYXBwU2NyaXB0cy9yb3V0ZXMudHMiLCJhcHBTY3JpcHRzL2FwcC50cyIsImFwcFNjcmlwdHMvbW9kZWxzL2dub21lTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaURBQWlEO0FBRWpELElBQU8sV0FBVyxDQWdCakI7QUFoQkQsV0FBTyxXQUFXO0lBQ2Q7UUFJSSxzQkFBb0IsS0FBc0I7WUFBdEIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDMUMsQ0FBQztRQUVNLG1DQUFZLEdBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFNLHdFQUF3RSxDQUFDLENBQUM7UUFDekcsQ0FBQztRQVJhLG9CQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQWF0QyxtQkFBQztLQWRELEFBY0MsSUFBQTtJQWRZLHdCQUFZLGVBY3hCLENBQUE7QUFDTCxDQUFDLEVBaEJNLFdBQVcsS0FBWCxXQUFXLFFBZ0JqQjtBQ2xCRCxxREFBcUQ7QUFFckQsSUFBTyxXQUFXLENBdUNqQjtBQXZDRCxXQUFPLFdBQVc7SUFDZDtRQWNJLHlCQUFxQixZQUEwQjtZQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztZQUMzQyx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFHRCxxQ0FBcUM7UUFDN0Isb0NBQVUsR0FBbEI7WUFBQSxpQkFlQztZQWRHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztnQkFDckMsdURBQXVEO2dCQUN2RCw2Q0FBNkM7Z0JBQzdDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FB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VSxDQUFDLHdCQUF3QixFQUFFLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FDZDdFLElBQU8sV0FBVyxDQWFqQjtBQWJELFdBQU8sV0FBVztJQUNkO1FBQUE7UUFXQSxDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQVhZLHNCQUFVLGFBV3RCLENBQUE7QUFDTCxDQUFDLEVBYk0sV0FBVyxLQUFYLFdBQVcsUUFhakIiLCJmaWxlIjoic291cmNlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuXG5tb2R1bGUgR25vbWVNb2R1bGV7XG4gICAgZXhwb3J0IGNsYXNzIEdub21lU2VydmljZXtcbiAgICAgICAgcHVibGljIHN0YXRpYyAkaW5qZWN0ID0gWyckaHR0cCddO1xuXG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKSB7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgR2V0QWxsR25vbWVzKCk6IG5nLklIdHRwUHJvbWlzZTxhbnk+e1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0PGFueT4oXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcnJhZm9scy9tb2JpbGVfdGVzdC9tYXN0ZXIvZGF0YS5qc29uXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Mb2FkRGV0YWlscyBpcyBub3QgcG9zaWJsZSBoZXJlLCBzbyBJIGZha2UgaXQuXG4gICAgICAgIC8vIHB1YmxpYyBMb2FkRGV0YWlscyhnbm9tZUlkKTogR25vbWVNb2RlbHtcbiAgICAgICAgLy8gfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vc2VydmljZXMvZ25vbWVTZXJ2aWNlcy50c1wiIC8+XG5cbm1vZHVsZSBHbm9tZU1vZHVsZXtcbiAgICBleHBvcnQgY2xhc3MgR25vbWVDb250cm9sbGVye1xuICAgICAgICAvL0RlcGVuZGVuY2llc1xuICAgICAgICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXCJHbm9tZVNlcnZpY2VcIiwgXCJEVE9wdGlvbnNCdWlsZGVyXCIsIFwiRFRDb2x1bW5EZWZCdWlsZGVyXCJdO1xuXG4gICAgICAgIC8vVmFyaWFibGVzIHRvIGF2b2lkIHVzaW5nICRzY29wZVxuICAgICAgICBwdWJsaWMgZ25vbWVMaXN0OiBHbm9tZU1vZGVsW107XG4gICAgICAgIHB1YmxpYyBkdE9wdGlvbnM6IGFueTtcbiAgICAgICAgcHVibGljIGR0Q29sdW1uRGVmczogYW55O1xuICAgICAgICBwdWJsaWMgcGVvcGxlIDogYW55O1xuICAgICAgICBwdWJsaWMgZ25vbWVEZXRhaWxzOiBHbm9tZU1vZGVsO1xuICAgICAgICBwdWJsaWMgZXhwYW5kZWQ6IGJvb2xlYW47XG4gICAgICAgIHB1YmxpYyBzaG93RXJyb3I6IGJvb2xlYW47XG4gICAgICAgIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcblxuICAgICAgICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBnbm9tZVNlcnZpY2U6IEdub21lU2VydmljZSl7XG4gICAgICAgICAgICAvL2NhbGwgdGhlIG1ldGhvZCB0byBnZXQgYWxsIHRoZSBnbm9tZXNcbiAgICAgICAgICAgIHRoaXMuTG9hZEdub21lcygpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL1JldHJpZXZlIGFsbCB0aGUgZ25vbWUgZnJvbSB0aGUgQVBJXG4gICAgICAgIHByaXZhdGUgTG9hZEdub21lcygpe1xuICAgICAgICAgICAgdGhpcy5nbm9tZVNlcnZpY2UuR2V0QWxsR25vbWVzKCkudGhlbihzdWNjZXNzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9IZXJlIEkgY2FsbGVkIGdub21lTGlzdCBiZWNhdXNlIGl0J3MgYSBsaXN0IG9mIGdub21lc1xuICAgICAgICAgICAgICAgICAgICAvL0JyYXN0bGV3YXJrIGlzIHRoZSBuYW1lIG9mIHRoZSBjaXR5L2NvdW50cnlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBzdWNjZXNzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ25vbWVMaXN0ID0gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHsgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgICAgICAgIH0gICAgICBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3NlcnZpY2VzL2dub21lU2VydmljZXMudHNcIiAvPlxuXG5tb2R1bGUgR25vbWVNb2R1bGUge1xuICAgIGV4cG9ydCBjbGFzcyBHbm9tZURldGFpbHNDb250cm9sbGVyIHtcbiAgICAgICAgLy9EZXBlbmRlbmNpZXNcbiAgICAgICAgcHVibGljIHN0YXRpYyAkaW5qZWN0ID0gW1wiR25vbWVTZXJ2aWNlXCIsIFwiJHN0YXRlUGFyYW1zXCJdO1xuXG4gICAgICAgIC8vVmFyaWFibGVzIHRvIGF2b2lkIHVzaW5nICRzY29wZVxuICAgICAgICBwdWJsaWMgZGV0YWlsczogR25vbWVNb2RlbDtcbiAgICAgICAgcHVibGljIGlkOiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyBzaG93OiBib29sZWFuO1xuICAgICAgICBwdWJsaWMgc2V4OiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBzaG93RXJyb3I6IGJvb2xlYW47XG4gICAgICAgIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgXG5cbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBnbm9tZVNlcnZpY2U6IEdub21lU2VydmljZSwgJHN0YXRlUGFyYW1zOiBuZy51aS5JU3RhdGVQYXJhbXNTZXJ2aWNlKXtcbiAgICAgICAgICAgIC8vR2V0IHRoZSBwYXJhbSBwYXNzZWQgZnJvbSB0aGUgVVJMXG4gICAgICAgICAgICB0aGlzLmlkID0gJHN0YXRlUGFyYW1zW1wiaWRcIl07XG4gICAgICAgICAgICB0aGlzLkxvYWREZXRhaWxzKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vVGhpcyBtZXRob2Qgd2lsbCBsb2FkIHRoZSBkZXRhaWxzXG4gICAgICAgIHByaXZhdGUgTG9hZERldGFpbHMoKXtcbiAgICAgICAgICAgIC8vR2V0IHRoZSBpZCBwYXNzZWQgZnJvbSB0aGUgVVJMLCBpcyBuZWNlc3Nhcnkgc2F2ZWQgaW50byBhIHZhcmlhYmxlXG4gICAgICAgICAgICAvL3RvIHdvbid0IGNvbmZ1c2UgdGhlIHNjb3BlIGluc2lkZSBmaWx0ZXIgYWJvdmUuXG4gICAgICAgICAgICBsZXQgc2VsZklkID0gdGhpcy5pZDtcblxuICAgICAgICAgICAgLy9UdXJucyBvZmYgdGhlIGVycm9yIG5vdGlmaWNhdGlvbnNcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vSGVyZSBJJ20gZ3Vlc3NpbmcgdGhlIHNleC5cbiAgICAgICAgICAgIGxldCBzZXhOdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDEgO1xuICAgICAgICAgICAgdGhpcy5zZXggPSAoc2V4TnVtYmVyID4gNSkgPyBcIkZlbWFsZVwiIDogXCJNYWxlXCI7XG5cblxuICAgICAgICAgICAgLy9Ib3cgdGhlIEFQSSBkb2Vzbid0IHJldHVybiBhIHNwZWNpZmljIEdub21lLCBJIGZha2UgaXQgc2VhcmNoaW5nIGFsbCB0aGUgZ25vbWVzXG4gICAgICAgICAgICAvL2FuZCBmaWx0ZXJpbmcgYnkgSURcbiAgICAgICAgICAgIHRoaXMuZ25vbWVTZXJ2aWNlLkdldEFsbEdub21lcygpXG4gICAgICAgICAgICAgICAgLnRoZW4oc3VjY2VzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBnbm9tZSA9IHN1Y2Nlc3MuZGF0YS5CcmFzdGxld2Fyay5maWx0ZXIoZ25vbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ25vbWUuaWQgPT0gc2VsZklkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvL1JldHVybiB0aGUgZ25vbWVbMF0gYmVjYXVzZSBmaWx0ZXIgaXMgYW4gYXJyYXksIHNvIHRoZSBmaXJzdCB2YWx1ZSBpbmRleCBcInplcm9cIiBpcyB3aGF0IEknbSBsb29raW5nIGZvclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ25vbWUubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0FjdGl2ZSB0aGUgZGV0YWlsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxzID0gZ25vbWVbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gXCJUaGUgR25vbWUgZG9lc24ndCBleGl0c1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNsaWNrKCl7XG4gICAgICAgICAgICB0aGlzLnNob3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cblxubW9kdWxlIE5ld3NNb2R1bGV7XG4gICAgZXhwb3J0IGNsYXNzIFJvdXRlQ29uZmlne1xuICAgICAgICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ25vbWUnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiBcIi9nbm9tZXNcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHBTY3JpcHRzL3ZpZXdzL2dub21lcy9nbm9tZUxpc3QuaHRtbFwiLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiR25vbWVDb250cm9sbGVyIGFzIEdub21lXCJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdnbm9tZS5kZXRhaWxzJywge1xuICAgICAgICAgICAgICAgIHVybDogXCIvZGV0YWlscy97aWR9XCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwU2NyaXB0cy92aWV3cy9nbm9tZXMvZ25vbWVEZXRhaWxzLmh0bWxcIixcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkdub21lRGV0YWlsc0NvbnRyb2xsZXIgYXMgR25vbWVEZXRhaWxzXCJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2dub21lc1wiKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb250cm9sbGVycy9nbm9tZUNvbnRyb2xsZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNlcnZpY2VzL2dub21lU2VydmljZXMudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbnRyb2xsZXJzL2dub21lRGV0YWlsc0NvbnRyb2xsZXIudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInJvdXRlcy50c1wiIC8+XG5cblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiTmV3c0FwcFwiLCBbXCJ1aS5yb3V0ZXJcIiwgXCJkYXRhdGFibGVzXCJdKTtcbmFwcC5jb25maWcoTmV3c01vZHVsZS5Sb3V0ZUNvbmZpZyk7XG5cbmFwcC5jb250cm9sbGVyKFwiR25vbWVDb250cm9sbGVyXCIsIEdub21lTW9kdWxlLkdub21lQ29udHJvbGxlcik7XG5hcHAuc2VydmljZShcIkdub21lU2VydmljZVwiLCBHbm9tZU1vZHVsZS5Hbm9tZVNlcnZpY2UpO1xuXG5cbmFwcC5jb250cm9sbGVyKFwiR25vbWVEZXRhaWxzQ29udHJvbGxlclwiLCBHbm9tZU1vZHVsZS5Hbm9tZURldGFpbHNDb250cm9sbGVyKTtcblxuIiwibW9kdWxlIEdub21lTW9kdWxle1xuICAgIGV4cG9ydCBjbGFzcyBHbm9tZU1vZGVse1xuICAgICAgICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICAgICAgcHVibGljIHR1bWJuYWlsOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBhZ2U6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHdlaWdodDogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyBoYWlyX2NvbG9yOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBwcm9mZXNzaW9uczogQXJyYXk8c3RyaW5nPjtcbiAgICAgICAgcHVibGljIGZyaWVuZHM6IEFycmF5PHN0cmluZz47XG4gICAgICAgIC8vcHVibGljIEJyYXN0bGV3YXJrOiBHbm9tZU1vZGVsW107XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
