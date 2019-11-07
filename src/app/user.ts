export class User {
    public id?: number;
    public name: string;
    public surname?: string;
    public capacity?: number;
    public email?: string;
    public avatar?: string;

    constructor(name, surname?, capacity?, email?, avatar?){
        this.name = name;
        this.surname = surname;
        this.capacity = capacity;
        this.email = email;
        this.avatar = avatar;
    }
}

