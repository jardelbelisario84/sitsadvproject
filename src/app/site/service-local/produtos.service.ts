import { Injectable } from '@angular/core'

@Injectable()
export class ProdutosService {




    getProdutos() {
        return [

            {
                id: 1,
                title: 'Plano Basic',
                slug: 'plano-basic',
                priceMes: 49.21,
                price: 497.00,
                description: '',
                items:[
                    { title_item:'Site Institucional (Modelo Padrão)', check: 'pi-check' },
                    { title_item:'Modelos multiplataforma', check: 'pi-check' },
                    { title_item:'Domínio (meusite.com.br)', check: 'pi-check' },
                    { title_item:'1 Conta de E-mail 1GB', check: 'pi-check' },
                    { title_item:'Integração com Redes Sociais', check: 'pi-check' },
                    { title_item:'Certificado SSL incluso (HTTPS)', check: 'pi-check' },
                    { title_item:'1 Ano de hospedagem', check: 'pi-check' },
                    { title_item:'1 Ano de suporte', check: 'pi-check' },
                    { title_item:'Pacote de artes para redes sociais', check: 'pi-times' },
                    { title_item:'Blog', check: 'pi-times' },
                    { title_item: 'Logotipo', check: 'pi-times' },
                ],
                image: 'assets/imagens/products/1.png'
            },


            {
                id: 2,
                title: 'Plano Express',
                slug: 'plano-express',
                priceMes: 59.11,
                price: 597.00,
                description: '',
                items:[
                    { title_item:'Site Institucional (Modelo Padrão)', check: 'pi-check' },
                    { title_item:'Modelos multiplataforma', check: 'pi-check' },
                    { title_item:'Domínio (meusite.com.br)', check: 'pi-check' },
                    { title_item:'1 Conta de E-mail 1GB', check: 'pi-check' },
                    { title_item:'Integração com Redes Sociais', check: 'pi-check' },
                    { title_item:'Certificado SSL incluso (HTTPS)', check: 'pi-check' },
                    { title_item:'1 Ano de hospedagem', check: 'pi-check' },
                    { title_item:'1 Ano de suporte', check: 'pi-check' },
                    { title_item:'Pacote de artes para redes sociais', check: 'pi-check' },
                    { title_item:'Blog', check: 'pi-check' },
                    { title_item:'Logotipo', check: 'pi-times' },
                ],
                image: 'assets/imagens/products/2.png'
            },


            {
                id: 3,
                title: 'Plano Ultra',
                slug: 'plano-ultra',
                priceMes: 98.72,
                price: 997.00,
                description: '',
                items:[
                    { title_item:'Site Institucional (Modelo Padrão)', check: 'pi-check' },
                    { title_item:'Modelos multiplataforma', check: 'pi-check' },
                    { title_item:'Domínio (meusite.com.br)', check: 'pi-check' },
                    { title_item:'1 Conta de E-mail 1GB', check: 'pi-check' },
                    { title_item:'Integração com Redes Sociais', check: 'pi-check' },
                    { title_item:'Certificado SSL incluso (HTTPS)', check: 'pi-check' },
                    { title_item:'1 Ano de hospedagem', check: 'pi-check' },
                    { title_item:'1 Ano de suporte', check: 'pi-check' },
                    { title_item:'Pacote de artes para redes sociais', check: 'pi-check' },
                    { title_item:'Blog', check: 'pi-check' },
                    { title_item: 'Logotipo', check: 'pi-check' },
                ],
                image: 'assets/imagens/products/3.png'
            },
        ];
    }


    getProduto(slug) {
        let dado;

        this.getProdutos().forEach((element , i)=> {
            if(slug == element['slug']){
               dado = element;
            }
        });

        return dado
    }





    // getProdutos() {
    //     return [

    //         {
    //             id: 1,
    //             title: 'Plano Basic',
    //             slug: 'plano-basic',
    //             priceMes: 49.21,
    //             price: 497.00,
    //             description: '',
    //             items:[
    //                 { title_item:'Site Institucional (Modelo Padrão)', check: 'pi-check' },
    //                 { title_item:'Modelos multiplataforma', check: 'pi-check' },
    //                 { title_item:'Domínio (meusite.com.br)', check: 'pi-check' },
    //                 { title_item:'1 Conta de E-mail 1GB', check: 'pi-check' },
    //                 { title_item:'Integração com Redes Sociais', check: 'pi-check' },
    //                 { title_item:'Certificado SSL incluso (HTTPS)', check: 'pi-check' },
    //                 { title_item:'1 Ano de hospedagem', check: 'pi-check' },
    //                 { title_item:'1 Ano de suporte', check: 'pi-check' },
    //                 { title_item:'Pacote de artes para redes sociais', check: 'pi-times' },
    //                 { title_item:'Blog', check: 'pi-times' },
    //                 { title_item: 'Logotipo', check: 'pi-times' },
    //             ],
    //             image: '../../../assets/imagens/products/1.png'
    //         },


    //         {
    //             id: 2,
    //             title: 'Plano Express',
    //             slug: 'plano-express',
    //             priceMes: 59.11,
    //             price: 597.00,
    //             description: '',
    //             items:[
    //                 { title_item:'Site Institucional (Modelo Padrão)', check: 'pi-check' },
    //                 { title_item:'Modelos multiplataforma', check: 'pi-check' },
    //                 { title_item:'Domínio (meusite.com.br)', check: 'pi-check' },
    //                 { title_item:'1 Conta de E-mail 1GB', check: 'pi-check' },
    //                 { title_item:'Integração com Redes Sociais', check: 'pi-check' },
    //                 { title_item:'Certificado SSL incluso (HTTPS)', check: 'pi-check' },
    //                 { title_item:'1 Ano de hospedagem', check: 'pi-check' },
    //                 { title_item:'1 Ano de suporte', check: 'pi-check' },
    //                 { title_item:'Pacote de artes para redes sociais', check: 'pi-check' },
    //                 { title_item:'Blog', check: 'pi-check' },
    //                 { title_item:'Logotipo', check: 'pi-times' },
    //             ],
    //             image: '../../../assets/imagens/products/2.png'
    //         },


    //         {
    //             id: 3,
    //             title: 'Plano Ultra',
    //             slug: 'plano-ultra',
    //             priceMes: 98.72,
    //             price: 997.00,
    //             description: '',
    //             items:[
    //                 { title_item:'Site Institucional (Modelo Padrão)', check: 'pi-check' },
    //                 { title_item:'Modelos multiplataforma', check: 'pi-check' },
    //                 { title_item:'Domínio (meusite.com.br)', check: 'pi-check' },
    //                 { title_item:'1 Conta de E-mail 1GB', check: 'pi-check' },
    //                 { title_item:'Integração com Redes Sociais', check: 'pi-check' },
    //                 { title_item:'Certificado SSL incluso (HTTPS)', check: 'pi-check' },
    //                 { title_item:'1 Ano de hospedagem', check: 'pi-check' },
    //                 { title_item:'1 Ano de suporte', check: 'pi-check' },
    //                 { title_item:'Pacote de artes para redes sociais', check: 'pi-check' },
    //                 { title_item:'Blog', check: 'pi-check' },
    //                 { title_item: 'Logotipo', check: 'pi-check' },
    //             ],
    //             image: '../../../assets/imagens/products/3.png'
    //         },
    //     ];
    // }



}