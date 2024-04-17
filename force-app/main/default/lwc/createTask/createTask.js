import {LightningElement,api} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import saveToDoTask from "@salesforce/apex/ToDoManagerController.saveToDoTask";

export default class CreateTask extends LightningElement {

    @api targetParent;
    taskTitle;
    dueDate;
    showDueDate = false;
    showSaveButton = false;
    clickSource = 'child';

    connectedCallback(){
        console.log("###Target Parent: " + this.targetParent);
    }

    handleOnchange(event){
        const fieldName = event.target.name;

        if(fieldName === 'taskTitle'){
            this.taskTitle = event.target.value;
            this.showDueDate = true;
            console.log(this.taskTitle);
        }

        if(fieldName === 'dueDate'){
            this.dueDate = event.target.value;
            if(this.targetParent === 'ToDoManagerParent'){
                console.log('Button visible: ' + this.targetParent);
                this.showSaveButton = true;
            }
            console.log(this.dueDate);
        }
    }

    handleClick(event){
        if(this.clickSource === 'child'){
            console.log("button clicked on child");

        }
        else{
            console.log("button clicked on parent");
        }
        saveToDoTask({title: this.taskTitle,dueDate: this.dueDate})
        .then((result) => {
            if(result === 'success'){
                this.taskTitle = '';
                this.dueDate = '';
                const evt = new ShowToastEvent({
                    title: 'Success',
                    message: 'A new item has been added to your To Do list',
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
    //comment update
    @api handleParentClick(){
        this.clickSource = 'parent';
        this.handleClick();
    }
}