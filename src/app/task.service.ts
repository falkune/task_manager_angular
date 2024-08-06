import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from './TaskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // methode pour sauvegarder une tache
  addTask(user:any): Observable<any>{
    // recuperation du token depuis le localStorage
    let token = localStorage.getItem('token');
    // definition des entes (headers) ou on inclu le token
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    // appel de l'API pour sauvegarder la tache
    return this.http.post("http://localhost/backend_api/?url=add_task", user, { headers: headers });
  }

  // methode getTask permet de recuper la liste des taches d'un utilisateurs
  getTask(): Observable<any>{
    // recuperation du token depuis le localStorage
    let token = localStorage.getItem('token');
    // definition des entes (headers) ou on inclu le token
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    return this.http.get('http://localhost/backend_api/?url=tasks', { headers: headers });
  }

  // methode pour marquer une tache comme terminee
  endTask(id: number){
    return this.http.get(`http://localhost/backend_api/?url=complete_task&id=${id}`);
  }

  // methode pour modifier une tache
  updateTask(data: TaskModel, id: number){
    // recuperation du token depuis le localStorage
    let token = localStorage.getItem('token');
    // definition des entes (headers) ou on inclu le token
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    return this.http.post(`http://localhost/backend_api/?url=update_task&id=${id}`, data, { headers: headers });
  }

  // methode pour supprimer une tache
  removeTask(id: number){
    return this.http.get(`http://localhost/backend_api/?url=remove_task&id=${id}`);
  }
}
