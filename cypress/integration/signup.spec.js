import signup from '../pages/SignupPage'//importar a Classe instanciada
import signupFactory from '../factories/SignupFactory'//importando o modulo
import signupPage from '../pages/SignupPage';

describe('Signup', () => {

    // beforeEach(function() {
    //     cy.fixture("deliver").then((d)=>{
    //         this.deliver = d;

    //     })
    // });

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()//criando a massa de teste

        signup.go();
        signup.fillForm(deliver);
        signup.submit();

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage);

    });

    it('Incorret document', function () {

        var deliver = signupFactory.deliver()//criando a massa de teste

        deliver.cpf = '000000141aa'//Informando o CPF incorreto

        signupPage.go();
        signupPage.fillForm(deliver);
        signupPage.submit();
        signupPage.alertMessageShouldBe('Oops! CPF inválido');
    });

    it('Incorret email', function () {

        var deliver = signupFactory.deliver()//criando a massa de teste

        deliver.email = 'user.com.br'

        signupPage.go();
        signupPage.fillForm(deliver);
        signupPage.submit();
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.');
    });

    context('Required fields', function () {

        //Constante do Tipo Array
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'name', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function (){
            signupPage.go();
            signupPage.submit();
        });

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})