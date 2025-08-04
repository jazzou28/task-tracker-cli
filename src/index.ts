import { TaskStatus } from './domain/task.entity';
import { v4 as uuid } from 'uuid';
import { addTask, getTasks, deleteTask, updateTask, updateTaskStatus } from './task.service';

const command = process.argv[2];

(async () => {
  try { 
    const command = process.argv[2];

    switch (command) {
      case 'add':
        const description = process.argv[3];
        if (!description) {
          console.error('❌ Error: The task description cannot be empty.');
          break;
        }
        
        const newTask = await addTask(description);
        console.log(`✅ Adding new task: "${description}"`);
        break;
      

      case 'list':
        const statusFilter = process.argv[3] as TaskStatus | undefined;
        let allTasks = await getTasks();

        // If the user provided a filter, we apply the filter to the array
        if (statusFilter) {
          allTasks = allTasks.filter(task => task.status === statusFilter);
          console.log(`📋 Listing tasks with status "${statusFilter}"...`);
        } else {
          console.log('📋 Listing all the tasks...');
        }

        if (allTasks.length === 0) {
          console.log('✨ No tasks with this criterion were found.');
          break;
        }

        allTasks.forEach(task => {
          console.log(`[${task.status.toUpperCase()}] - ${task.description} (ID: ${task.id})`);
        });
        break;
      
      case 'delete':
        const deleteId = process.argv[3];

        if (!deleteId) {
          console.error('❌ Error: You must provide the ID of the task to delete.');
          console.log('➡️  Example: npm start -- delete <ID>');
          break;
        }

        const wasDeleted = await deleteTask(deleteId);
        if (wasDeleted) {
          console.log(`🗑️ Task ${deleteId} deleted successfully.`);
        } else {
          console.log(`❌ Task ${deleteId} not found.`);
        }
        break;
      
      case 'update':
        const updateId = process.argv[3];
        const newDescription = process.argv[4];

        if (!updateId || !newDescription) {
          console.error('❌ Error: You must provide an ID and the new description.');
          console.log('➡️  Example: npm start -- update <ID> "New description"');
          break;
        }

        const updatedTask = await updateTask(updateId, newDescription);
        if (updatedTask) {
          console.log(`✏️ Task ${updateId} updated successfully.`);
        } else {
          console.log(`❌ Task ${updateId} not found.`);
        }
        break;
      
      case 'mark-done':
      case 'mark-in-progress':
        const statusId = process.argv[3];
        if (!statusId) {
          console.error('❌ Error: You must provide the task ID.');
          console.log('➡️  Example: npm start -- mark-done <ID> or npm start -- mark-in-progress <ID>');
          break;
        }

        const newStatus = command === 'mark-done' ? 'done' : 'in-progress';
        const updatedStatusTask = await updateTaskStatus(statusId, newStatus);
        
        if (updatedStatusTask) {
          console.log(`✅ Task with ID "${statusId}" marked as "${newStatus}".`);
        } else {
          console.error(`❌ Error: A task with the "${statusId}" ID was not found.`);
        }
        break;
        
      default:
        console.log('Unrecognized command. Use "add", "list", "update" or "delete".');
        break;
    }
  } catch (error) { 
    console.error('🔴 An unexpected error has occurred:');
    console.error(error);
  }
})();