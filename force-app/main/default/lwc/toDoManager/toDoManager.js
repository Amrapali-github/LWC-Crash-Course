import { LightningElement } from 'lwc';

export default class ToDoManager extends LightningElement {
    isAction = 'ToDoManagerParent';
    refreshToDo(){
        this.refs.notStartedToDo.refreshList();
        this.refs.completedToDo.refreshList();
    }
}