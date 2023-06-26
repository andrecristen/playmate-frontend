export default class Solicitations {

    get SITUACAO_APROVADO() {
        return 1;
    }

    get SITUACAO_REJEITADO() {
        return 2;
    }

    get SEXO_LIST() {
        return {
            1: "Aprovado",
            2: "Rejeitado",
            3: "Solicitado",
            4: "Cancelado",
        };
    }

    constructor() {

    }

}