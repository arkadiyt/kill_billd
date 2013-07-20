(function() {
  "use strict";

  var filter = Array.prototype.filter,
      indexOf = Array.prototype.indexOf;

  function array_intersection(array1, array2) {
    return filter.call(array1, function(element) {
      return array2.indexOf(element) !== -1
    });
  }

  function alter_build(operation, filter) {
    var index = indexOf.call(this.parentElement.parentElement.children, this.parentElement);
    var elements = document.querySelectorAll('tr');
    for (var i = 0; i < elements.length; ++i) {
      var build = elements[i].children[index],
          anchor = build.querySelector('a');
      if (anchor && anchor.href.indexOf('buildmaster') !== -1 && filter(build)) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', anchor.href + '/' + operation, true);
          xhr.send();
      }
    }
  }

  var filters = {
    running: function(build) {
      return array_intersection(build.classList, ['running']).length;
    },
    failed: function(build) {
      return array_intersection(build.classList, ['failure', 'exception']).length;
    },
    j_build: function(build) {
      var result = filters.running(build);
      result = result && build.parentElement.children[0].children[0].text.substring(0, 2) == 'J_';
      return result
    }
  }

  var elements = document.querySelectorAll('.sourcestamp');
  for (var i = 0; i < elements.length; ++i) {
    var stopDiv = document.createElement('div');
    stopDiv.classList.add('killBuild', 'stopBuild');
    stopDiv.onclick = function() { alter_build.call(this, 'stop', filters.running); };

    var rebuildDiv = document.createElement('div');
    rebuildDiv.classList.add('killBuild',  'rebuildBuild');
    rebuildDiv.onclick = function() { alter_build.call(this, 'rebuild', filters.failed); };

    var stopJDiv = document.createElement('div');
    stopJDiv.classList.add('killBuild', 'stopJBuild');
    stopJDiv.onclick = function() { alter_build.call(this, 'stop', filters.j_build); };

    var clearDiv = document.createElement('div');
    clearDiv.classList.add('clear-both');

    elements[i].appendChild(clearDiv);
    elements[i].appendChild(rebuildDiv);
    elements[i].appendChild(stopDiv);
    elements[i].appendChild(stopJDiv);
    elements[i].appendChild(clearDiv.cloneNode(false));
  }
})();
