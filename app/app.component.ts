import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
<div *ngIf="!isAuth()">
    <div class="login">    
    <img src="../google_firebase-2-128.png">
        <h1>Bem vindo ao Firebase Login</h1>
        <ul>
            <li>
                <button class="face"><i class="fa fa-facebook-square" aria-hidden="true"></i>Entrar com <b>Facebook</b></button>
            </li>   
            <li>
                <button class="google"><i class="fa fa-google" aria-hidden="true"></i>Entrar com Google</button>
            </li>
            <li>
                <button><i class="fa fa-user" aria-hidden="true"></i>Entrar como Anônimo</button>
            </li>
        </ul>
    </div>
    <div class="overlay"></div>
</div>

<div *ngIf="isAuth()">
    <h1>Está logado</h1>
</div>
`
})
export class AppComponent {
    isAuth():boolean {
        return false;
    }
}
