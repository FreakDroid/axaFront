/// <reference path="../services/gnomeServices.ts" />

module GnomeModule{
    export class GnomeController{
        //Dependencies
        public static $inject = ["GnomeService", "DTOptionsBuilder", "DTColumnDefBuilder"];

        //Variables to avoid using $scope
        public gnomeList: GnomeModel[];
        public dtOptions: any;
        public dtColumnDefs: any;
        public people : any;
        public gnomeDetails: GnomeModel;
        public expanded: boolean;
        public showError: boolean;
        public errorMessage: string;

        constructor (private gnomeService: GnomeService){
            //call the method to get all the gnomes
            this.LoadGnomes();
        }


        //Retrieve all the gnome from the API
        private LoadGnomes(){
            this.gnomeService.GetAllGnomes().then(success => {
                    //Here I called gnomeList because it's a list of gnomes
                    //Brastlewark is the name of the city/country
                    this.showError = false;
                    let data = success.data;
                    this.gnomeList = data;
                }
                ,
                error => { 
                    console.log(error);
                    this.showError = true;
                    this.errorMessage = error;
                }      
            );
        }
    }
}