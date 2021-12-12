import _ from "lodash"
export default {
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  },
  threeDigitString: function(number){
    if(number < 10)
      return `00${number}`
    if(number < 100)
      return `0${number}`

    return `${number}`
  },
  receiterName: function(name){
    if(!name) return '';
    return _.startCase(name.replace(/_/ig, ' '))
  }

  // move: function(array, fromIndex, toIndex) {
  //   return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  // },

  // findTodo: function(todo, todoList) {
  //   return todoList.find((item) => item.title.toLowerCase() === todo.title.toLowerCase());
  // }
};

