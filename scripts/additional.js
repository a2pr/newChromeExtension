function is_all_ws(nod) {
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.textContent));
};

function first_child(par) {
  var res = par.firstChild;
  while (res) {
    if (!is_ignorable(res)) return res;
    res = res.nextSibling;
  };
  return null;
};

function is_ignorable(nod) {
  return (nod.nodeType == 8) || // A comment node
    ((nod.nodeType == 3) && is_all_ws(nod)); // a text node, all ws
};
var clearInput = function (opt) { //limpiar el input
  document.getElementsByTagName("input").value = "";
  switch (opt) {
    case 0:
      document.getElementById("track").value = "";
      break;
    case 1:
      document.getElementById("newGoal").value = "";
      break;

    default:
      break;
  };
};