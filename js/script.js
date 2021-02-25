const dropdown = document.getElementById("dropdown-wrapper");
const content = document.getElementById("dropdown-content");
const drop = document.getElementById("drop-link");
const span = document.getElementById("close");
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
let endProcess = true;
drop.onmouseenter = function () {
  dropdown.classList.add("show");
};
content.onmouseenter = function () {
  dropdown.classList.add("show");
  endProcess = false;
};
content.onmouseleave = function () {
  endProcess = true;
  dropdown.classList.remove("show");
};
drop.onmouseleave = function () {
  wait(500).then(() => {
    if (endProcess) {
      dropdown.classList.remove("show");
    } else {
      dropdown.classList.add("show");
    }
  });
};

function DropDown(el) {
  this.dd = el;
  this.placeholder = this.dd.children("span");
  this.opts = this.dd.find("ul.drop li");
  this.val = "";
  this.index = -1;
  this.initEvents();
}

DropDown.prototype = {
  initEvents: function () {
    var obj = this;
    obj.dd.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass("active");
    });
    obj.opts
      .on("click", function () {
        var opt = $(this);
        obj.val = opt.text();
        obj.index = opt.index();
        obj.placeholder.text(obj.val);
        opt.siblings().removeClass("selected");
        opt.filter(':contains("' + obj.val + '")').addClass("selected");
      })
      .change();
  },
  getValue: function () {
    return this.val;
  },
  getIndex: function () {
    return this.index;
  },
};

$(function () {
  // create new variable for each menu
  var dd1 = new DropDown($("#language-select"));
  // var dd2 = new DropDown($('#other-gases'));
  $(document).click(function () {
    // close menu on document click
    $(".language-drop").removeClass("active");
  });
});
