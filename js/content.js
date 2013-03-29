(function() {
  "use strict";

  function array_intersection(array1, array2) {
    return Array.prototype.filter.call(array1, function(element) {
      return array2.indexOf(element) !== -1
    });
  }

  function alter_build(operation, classes) {
    var index = Array.prototype.indexOf.call(this.parentElement.parentElement.children, this.parentElement);
    var elements = document.querySelectorAll('tr');
    for (var i = 0; i < elements.length; ++i) {
      var build = elements[i].children[index],
          anchor = build.querySelector('a');
      if (anchor && anchor.href.indexOf('buildmaster') !== -1 && array_intersection(build.classList, classes).length) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', anchor.href + '/' + operation, true);
          xhr.send();
      }
    }
  }

  var elements = document.querySelectorAll('.sourcestamp');
  for (var i = 0; i < elements.length; ++i) {
    var stopDiv = document.createElement('div');
    stopDiv.classList.add('stopBuild');
    stopDiv.onclick = function() { alter_build.call(this, 'stop', ['running']); };

    var rebuildDiv = document.createElement('div');
    rebuildDiv.classList.add('rebuildBuild');
    rebuildDiv.onclick = function() { alter_build.call(this, 'rebuild', ['failure', 'exception']); };

    var clearDiv = document.createElement('div');
    clearDiv.classList.add('clear-both');

    elements[i].appendChild(clearDiv);
    elements[i].appendChild(rebuildDiv);
    elements[i].appendChild(stopDiv);
    elements[i].appendChild(clearDiv.cloneNode(false));
  }
})();