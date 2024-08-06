import { Component, Input } from '@angular/core';
import { TaskModel } from '../TaskModel';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input()
  onTask!: TaskModel;

  constructor(private taskService: TaskService, private router: Router){}

  // cette methode s'execute au clic sur le bouton vert pour marque une tache comme terminee
  end(){
    // console.log("ok")
    // appel de la methode endTask definie dans le teskService on lui passe l'identifiant de la tache a terminer
    this.taskService.endTask(this.onTask.id).subscribe({
      next : () => {
        // si ça marche on redirige vers la liste des taches
        this.router.navigateByUrl('task-list');
      },
      error : (error) => {
        // si il y a une erreur on l'affiche dans la console
        console.log(error)
      }
    })
  }

  // cette methode s'execute au clic sur le bouton orange redirige vers le formulaire pour modifier la tache
  update(){
    // redirection vers le formulaire permettant d'ajouter/modifier une tache
    this.router.navigateByUrl(`task-form/${this.onTask.id}`);
  }

  // methode pour supprimer une tache
  remove(){
    // appel de la methode removeTask definie dans le TaskService
    this.taskService.removeTask(this.onTask.id).subscribe({
      next : (response) => {
        // si la tache est bien supprimer, redirection vers la liste des taches
        this.router.navigateByUrl('task-list');
      },
      error : (error) => {
        // si erreur on affiche dans la console
        console.log(error)
      }
    })
  }
}
