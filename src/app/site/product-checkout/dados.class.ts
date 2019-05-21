export class Dados {

    public id: number;
    public nome = 'Danilo Azevendo Santos';
    public telefone = '(77) 988997889';
    public email = 'teste@sandbox.pagseguro.com.br';
    public cpf = '957.937.874-61';
    public nascimento = '16/09/1987';
    public logradouro = 'Av Central';
    public numero = '45';
    public bairro = 'Centro';
    public cep = '45002-055';
    public cidade = 'Vitória da Conquista';
    public estado = 'ba';
    public numCard: string;              // ex: '4111111111111111'
    public mesValidadeCard: string;      // ex: '12';
    public anoValidadeCard: string;      // ex: '2030';
    public codSegCard: string;           // ex: '123';
    public hashComprador: string;        // preenchido dinamicamente
    public bandCard: string;             // preenchido dinamicamente
    public hashCard: string;             // preenchido dinamicamente
    public parcelas: Array<Object> = []; // preenchido dinamicamente

    constructor(obj?) {

        Object.assign(this, obj, {}, {});
    }
}
