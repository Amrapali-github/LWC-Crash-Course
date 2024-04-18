public with sharing class ToDoManagerController {

    @AuraEnabled
    public static string saveToDoTask(string title, date dueDate){
        try {
            ToDoTask__c task = new ToDoTask__c();
            task.Title__c = title;
            task.Due_Date__c = dueDate;
            task.Status__c = 'Not Started';
            insert task;
            return 'success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDoTask__c> getToDoList(string taskStatus){
        return [SELECT id, Title__c, Due_Date__c, Status__c
                FROM ToDoTask__c
                WHERE Status__c =: taskStatus
                ORDER BY Due_Date__c
            ];
    } 

    @AuraEnabled
    public static string updateTask(string toDoId){
        try {
            ToDoTask__c todo = [SELECT id, Status__c FROM ToDoTask__c WHERE Id=:toDoId];
            todo.Status__c = 'Completed';
            Update todo;
        return 'Success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }   
    //comment
}