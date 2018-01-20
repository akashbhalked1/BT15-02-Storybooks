const moment = require('moment');

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
  select: (status, opt) => {
    // opt.fn(this) returns:
    //    <option value="public">Public</option>
    //    <option value="private">Private</option>
    //    <option value="draft">Draft</option>
    // Then, ' value="status" is replaced with ' value="status" selected'.
    // See http://handlebarsjs.com/block_helpers.html
    return opt.fn(this)
              .replace(new RegExp(' value=\"'+status+'\"'), '$& selected');
  }
};