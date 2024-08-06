import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

export const routes: Routes = [
    // Route pour afficher le composant LoginComponent
    { path: 'login', component: LoginComponent },
    // Route pour afficher le composant RegisterComponent
    { path: 'register', component: RegisterComponent },
    // Route pour afficher la list des taches
    { path: 'task-list', component: TaskListComponent },
    // Route pour afficher le formulaire qui permet d'ajouter une tache
    { path: 'task-form', component: TaskFormComponent },
    // Route pour afficher le formulaire qui permet de modifier une tache
    { path: 'task-form/:id', component: TaskFormComponent },
];
