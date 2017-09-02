/// <reference path="../../typings/index.d.ts" />

module GnomeModule{
    export class GnomeService{
        public static $inject = ['$http'];


        constructor(private $http: ng.IHttpService) {
        }

        public GetAllGnomes(): ng.IHttpPromise<any>{
            return this.$http.get<any>("https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json");
        }

        //LoadDetails is not posible here, so I fake it.
        // public LoadDetails(gnomeId): GnomeModel{
        // }
    }
}