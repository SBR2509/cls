class validator {
    static validateTaskInfo(taskInfo, task) {
        let valueFound = task.alltasks.some(val => val.taskID == taskInfo.taskID);
        if (valueFound) return false;
        return true;
    }
}
module.exports = validator;