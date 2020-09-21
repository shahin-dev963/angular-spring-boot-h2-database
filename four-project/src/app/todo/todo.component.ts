import { Component, OnInit } from '@angular/core';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;

  constructor(private route: ActivatedRoute, private todoDataService: TodoDataService, private router:Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    
    if(this.id != -1){
      this.todoDataService.retrieveTodo('shahin', this.id).subscribe(
        data => {
          console.log(data);
          this.todo = data;
          
        }
      );
    }
  }

  onSave(){
    if(this.id == -1){
      this.todoDataService.createdTodo('shahin', this.todo).subscribe(
        data =>{
          this.router.navigate(['todos']);
        }
      );
    }
    else{
      this.todoDataService.updateTodo('shahin', this.id, this.todo).subscribe(
        data =>{
          this.router.navigate(['todos']);
        }
      );  
    }
  }

}
