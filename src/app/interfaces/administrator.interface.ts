export class ProfilePicture {
    'url': string;
}
export class Roles {
'id': number;
'role_name': string;
'order': number;
}
export class Administrators {
    'id': number;
    'email': string;
    'username': string;
    // 'profile_picture': ProfilePicture;
    'front_editor_name': string;
    'group': string;
    'operational': string;
    'created_at': string;
    // 'roles': [Roles];
    constructor(
        id: number,
        email: string,
        username: string,
        front_editor_name: string,
        group: string,
        operational: string,
        created_at: string
        ) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.front_editor_name = front_editor_name;
        this.group = group;
        this.operational = operational;
        this.created_at = created_at;
    }
}

export class DataAdmin {
    'administrators': Administrators;
}
