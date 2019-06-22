var input = document.getElementById('SearchBar');

function submitQuery(){


    var name = document.getElementById('SearchBar').value;

    window.location.href+='?name=~' + name 
}