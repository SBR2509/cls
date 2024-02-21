class validator {
    static validateCourseInfo(courseInfo, courseData) {
        let valueFound = courseData.airtribe.some(val => val.courseID == courseInfo.courseID);
        if (valueFound) return false;
        return true;
    }
}
module.exports = validator;