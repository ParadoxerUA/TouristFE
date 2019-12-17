export class User {
    public user_id?: number;
    public name: string;
    public surname?: string;
    public capacity?: number;
    public email?: string;
    public avatar?: string;
    public roles?: Array<any>
    
    constructor(name, surname?, capacity?, email?, avatar?, roles?){
        this.name = name;
        this.surname = surname;
        this.capacity = capacity;
        this.email = email;
        this.avatar = avatar;
        this.roles = roles
    }
}

