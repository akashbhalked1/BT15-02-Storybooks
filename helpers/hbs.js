const moment = require('moment-timezone');
moment.tz.setDefault('America/Los_Angeles');

module.exports = {
  trunc: (str, len) => {
    if(str.length > len && str.length > 0) {
      let newStr = str + ' ';
      newStr = str.substr(0, len);
      newStr = str.substr(0, newStr.lastIndexOf(' '));
      newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
      return newStr + ' ...';
    }
    return str;
  },
  // stripTags: (str) => {
  //   return str.replace(/<(?:.|\n)*?>/gm, '');
  // },
  formatDate: (dt, format) => {
    return moment(dt).format(format);
  },
  formatDateFromNow: (dt) => {
    return moment(dt).fromNow();
  },
  select: (status, opt) => {
    // opt.fn(this) returns:
    //    <option value="public">Public</option>
    //    <option value="private">Private</option>
    //    <option value="draft">Draft</option>
    // Then, ' value="status" is replaced with ' value="status" selected'.
    // See http://handlebarsjs.com/block_helpers.html
    return opt.fn(this)
              .replace(new RegExp(' value=\"'+status+'\"'), '$& selected');
  },
  editIcon: (storyUser, logUser, storyId, floating = true) => {
    if(storyUser === logUser)
      if(floating) return `<a href="/stories/${storyId}/edit" 
        class="btn-floating halfway-fab red">
        <i class="material-icons">mode_edit</i></a>`;
      else return `<a href="/stories/${storyId}/edit">
        <i class="material-icons">mode_edit</i></a>`;
    else return '';
  }
};