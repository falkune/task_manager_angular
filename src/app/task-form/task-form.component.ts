import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  // on declare l'attibut taskForm qui va contenir la saisie de l'utilisateue sous forme d'objet
  taskForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router, private route: ActivatedRoute){ // injection du formBuilder dans le constructeur
    this.taskForm = this.formBuilder.group({
      // Champ email avec deux validateurs requis et format email
      nom: [ '', Validators.required],
      // Champ password avec deux validateurs requis et longueur minimale de 6 caracteres
      description: ['', Validators.required],
      // Champ nom avec un validateur requis 
      date: ['', Validators.required],
    })
  }

  // definition de la methode onSubmit (cette methode sera executer quand l'utilisateur va cliquer sur le bouton Valider)
  onSubmit(){
    // si un parametre d'url exist c'est une modification de tache si non c'est une nouvelle tache
    if(this.route.snapshot.params['id']){
      this.update()
    }else{
      this.add();
    }
  }

  // methode pour ajouter une tache
  add(){
    // verifier que le formulaire est valide (les donnees saisies sont valides c a d respecte bien les validations dans le constructeur)
    if(this.taskForm.valid){
      // appel de la methode addTask pour ajouter une nouvelle tache
      this.taskService.addTask(this.taskForm.value).subscribe({
        next: (response) => {
          // si la tache est creer on redigige vers la page qui affiche la liste des taches
          this.router.navigateByUrl('task-list');
        },
        error: (error) => {
          // si il y a une erreur lors de la creation de la tache on l'affiche dans la console
          console.error('Login error', error.error);
        }
      })
    }
  }

  // methode pour modifier une tache
  update(){
    // appel de la methode updateTask definie dans le taskService pour modifier une tache
    this.taskService.updateTask(this.taskForm.value, this.route.snapshot.params['id']).subscribe({
      next : (response) => {
        // si tout se passe bien on redirige vers la liste des taches
        this.router.navigateByUrl('task-list');
      },
      error : (error) => {
        // si il y a une erreur on affiche dans la console
        console.log(error);
      }
    })
  }
}
