export default class User {

    get TIPO_TECNICO() {
        return 1;
    }

    get TIPO_ATLETA() {
        return 2;
    }

    get SEXO_LIST() {
        return {
            1: "Masculino",
            2: "Feminino",
        };
    }

    first_name;
    last_name;
    username;
    email;
    password;
    birth_date;
    date_joined;
    tipo;

    constructor() {

    }

}