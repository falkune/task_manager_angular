import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Declaration de l'attribut loginForm de type FormGroup
  loginForm: FormGroup;

  // Injection des services FormBuilder, UserService et Router dans le constructeur
  constructor(private formBuilder: FormBuilder, private userSevice: UserService, private router: Router){
    // Initialisation du groupe de formulaires loginForm avec des controles de formulaire
    this.loginForm = this.formBuilder.group({
      // Champ email avec deux validateurs requis et format email
      email: ['', [Validators.required, Validators.email]],
      // Champ password avec deux validateurs requis et longueur minimale de 6 caracteres
      password: [ '', [Validators.required, Validators.minLength(6)]]
    })
  }

  // methode faisant appel login definie dans le UserService
  submit(){
    if(this.loginForm.valid){
      // appel de la methode login definie dans le service userSerce la methode prend un parametre qui est un objet correspondant a l'email et le mot de passe saisies par l'utilisateur dans le formulaire
      this.userSevice.login(this.loginForm.value).subscribe({
        next : (response) => {
          console.log(response)
          // enregistrer le token dans le localStorage
          localStorage.setItem('token', response.token);
          // redirection vers http://localhost:2400/task-list pour afficher la liste des composant de l'utilisateur qui vien de se connecter
          this.router.navigateByUrl('task-list')
        },
        error: (error) => {
          // si l'utilisateur n'a pa reusi a se connecté on affiche l'eerue dans la console
          console.log(error);
        }
      })

    }
  }
}
