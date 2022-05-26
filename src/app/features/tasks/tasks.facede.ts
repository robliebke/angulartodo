import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TaskListModel } from 'src/app/core/models/task-list.model';
import { requestTasksList, tasksListSelected } from './store/tasks.actions';
import { TasksListState } from './store/tasks.reducer';
import {
  selectedTasksListId,
  tasksListSelectAllSelector,
} from './store/tasks.selectors';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  constructor(private _store: Store<TasksListState>) {}

  getTasksList(): Observable<TaskListModel[]> {
    this._store.dispatch(requestTasksList());
    return this._store.select(tasksListSelectAllSelector);
  }

  selectTasksList(id: number): void {
    this._store.dispatch(
      tasksListSelected({
        id,
      })
    );
  }

  getTasksListSelectedId(): Observable<number | null> {
    return this._store.select(selectedTasksListId);
  }

  // TODO fix
  addNewTaskList() {
    return this._store.select(tasksListSelectAllSelector).pipe(
      tap((taskLists) => {
        const id = taskLists.length + 1;
        const name = `untitled list ${id}`;
      })
    );
  }
}
