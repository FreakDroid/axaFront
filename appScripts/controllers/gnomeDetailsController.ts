/// <reference path="../services/gnomeServices.ts" />

module GnomeModule {
    export class GnomeDetailsController {
        //Dependencies
        public static $inject = ["GnomeService", "$stateParams"];

        //Variables to avoid using $scope
        public details: GnomeModel;
        public id: number;
        public show: boolean;
        public sex: string;
        public showError: boolean;
        public errorMessage: string;
        

        constructor(private gnomeService: GnomeService, $stateParams: ng.ui.IStateParamsService){
            //Get the param passed from the URL
            this.id = $stateParams["id"];
            this.LoadDetails();
        }


        //This method will load the details
        private LoadDetails(){
            //Get the id passed from the URL, is necessary saved into a variable
            //to won't confuse the scope inside filter above.
            let selfId = this.id;

            //Turns off the error notifications
            this.showError = false;

            //Here I'm guessing the sex.
            let sexNumber = Math.floor(Math.random() * 6) + 1 ;
            this.sex = (sexNumber > 5) ? "Female" : "Male";


            //How the API doesn't return a specific Gnome, I fake it searching all the gnomes
            //and filtering by ID
            this.gnomeService.GetAllGnomes()
                .then(success => {
                    let gnome = success.data.Brastlewark.filter(gnome => {
                       return gnome.id == selfId
                    });
                    //Return the gnome[0] because filter is an array, so the first value index "zero" is what I'm looking for
                    if (gnome.length > 0){
                        //Active the detail
                        this.show = true;
                        this.details = gnome[0];
                    }
                    else{
                        this.showError = true;
                        this.errorMessage = "The Gnome doesn't exits";
                    }


                }, error => {
                    this.showError = true;
                    this.errorMessage = error;
                });
        }

        public click(){
            this.show = false;
        }
    }
}