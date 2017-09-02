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

