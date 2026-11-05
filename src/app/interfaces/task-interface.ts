export interface todo {
    taskName:string;
    dueDate:string;
    tags:string[];
};

export interface taskInterface extends todo {
    id:number;
};