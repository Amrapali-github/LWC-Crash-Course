import {LightningElement,wire,api} from 'lwc';
import getToDoList from '@salesforce/apex/ToDoManagerController.getToDoList';
import updateTask from '@salesforce/apex/ToDoManagerController.updateTask';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ToDoList extends LightningElement {
    @api taskStatus;
    @wire(getToDoList, { taskStatus: '$taskStatus'} ) wiredToDoList;
    
    @api
    refreshList(){
        refreshApex(this.wiredToDoList);
    }

    handleClick(event){
        updateTask( { toDoId: event.target.dataset.recordid} )
        .then((result) => {
            if(result === 'Success'){
                const evt = new ShowToastEvent({
                    title: 'Success',
                    message: 'Task Completed Successfully',
                    variant: 'success'
                });
                this.dispatchEvent(evt);
                this.dispatchEvent(new CustomEvent('refreshtodo'));
            }
        })
        .catch((error) => { 
            console.log("error: " + error);
            const evt = new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            });
            this.dispatchEvent(evt);
        });
    }
}