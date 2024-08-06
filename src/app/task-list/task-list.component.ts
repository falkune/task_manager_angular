import { Component, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../TaskModel';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  taskList!: TaskModel[];

  constructor(private taskService: TaskService){}

  // cette methode s'execute des que le composant est rendue
  ngOnInit(): void {
    // appel de la methode getTask definie dans le taskService
    this.taskService.getTask().subscribe({
      next : (response) => {
        this.taskList = response.data;
      },
      error : (error) => {
        // si il y a une erreur lors de la recuperation des taches on l'affiche dans la console
        console.log(error);
      }
    })
  }
}
