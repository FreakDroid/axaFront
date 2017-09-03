module GnomeModule{
    export class GnomeModel{
        public id: number;
        public name: string;
        public tumbnail: string;
        public age: number;
        public weight: number;
        public height: number;
        public hair_color: string;
        public professions: Array<string>;
        public friends: Array<string>;
    }
}