module.exports = {
    format_date: (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    view_plan_link: (id) => {
        return `plan/${id}/comments`
    }
};