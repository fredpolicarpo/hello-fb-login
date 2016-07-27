window.onload = function () {
    firebase.initializeApp(config);
    verificaUsuarioLogado();
};

var config = {
    apiKey: "AIzaSyAOlL5BIsqbuCT1C3KnJQUY14J1UcUmbgg",
    authDomain: "hello-fb-login.firebaseapp.com",
    databaseURL: "https://hello-fb-login.firebaseio.com",
    storageBucket: "hello-fb-login.appspot.com"
};

function logout() {
    firebase.auth().signOut();
    $(".firelogin").addClass("hide");
    $("#login").removeClass("hide");
    limparSessao();
}

function salveUserNaSessao(user) {
    sessionStorage.nome = user.displayName;
    sessionStorage.email = user.email;
    sessionStorage.foto = user.photoURL;
}

function limparSessao() {
    sessionStorage.clear();
}

function preenchaUsuario() {
    $("#username").text(sessionStorage.nome);
    $("#email").text(sessionStorage.email);
    $("#foto").attr("src", sessionStorage.foto);
    $(".firelogin").removeClass("hide");
    $("#login").addClass("hide");
}

function facebookLogin() {
    console.debug("Entrando com Facebook...");
    var provider = new firebase.auth.FacebookAuthProvider();
    var me = this;

    firebase.auth().signInWithPopup(provider).then(function (result) {
        $("#iconLogado").addClass("fa-facebook-square");
        $("#iconLogado").removeClass("fa-google fa-user");
        $(".firelogin").removeClass("hide");
        $("#login").addClass("hide ativo");
        window.salveUserNaSessao(result.user)
        window.preenchaUsuario();
    }).catch(function (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
            var email = error.email;
            firebase.auth().fetchProvidersForEmail(email).then(function (providers) {
                sweetAlert("Não deu ;(", 'Você já logou com o email ' + email + ' usando método de autenticação ' + providers, "error");
            });

        } else {
            console.error("ERRO: " + error.code);
            console.error("Falha ao logar: " + error);
        }
    });
}

function googleLogin() {
    console.debug("Entrando com Google...");
    var provider = new firebase.auth.GoogleAuthProvider();
    var me = this;
    firebase.auth().signInWithPopup(provider).then(function (result) {
        $("#iconLogado").addClass("fa-google");
        $("#iconLogado").removeClass("fa-facebook-square fa-user");
        window.salveUserNaSessao(result.user)
        window.preenchaUsuario();
    }).catch(function (error) {
        console.error("Falha ao logar: " + error);
    });
}

function anonimoLogin() {
    console.debug("Entrando Anônimamente...");
    firebase.auth().signInAnonymously().catch(function (error) {
        console.error("Falha ao logar: " + error);
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user && user.isAnonymous) {
            $("#iconLogado").addClass("fa-user");
            $("#iconLogado").removeClass("fa-facebook-square fa-google");
            window.salveUserNaSessao({
                displayName: 'Mistéérioo',
                email: '@nonimo',
                photoURL: 'https://scontent.fcpq1-1.fna.fbcdn.net/v/t1.0-1/c15.15.190.190/s160x160/482865_107766019411218_1824143669_n.jpg?oh=233c546aafa3f867c19151aebe803804&oe=582AB1AD'
            });
            window.preenchaUsuario();
        } else if (!user) {
            console.log("Deslogou");
        }
    });
}

function verificaUsuarioLogado() {
    if (sessionStorage.nome) {
        console.debug("preencher usuário");
        preenchaUsuario();
    } else {
        console.debug("LOGAR");
        $("#login").removeClass("hide");
    }
}