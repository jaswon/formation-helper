var formations;

$(function() {
    // simpleStorage.set('list',JSON.stringify([1,2,3,4,5,6,7,8,9,10]))
    var getlist = simpleStorage.get('list')
    if (getlist === undefined) {
        simpleStorage.set('list',"[]")
        formations = []
    } else {
        formations = JSON.parse(getlist)
    }
    startMenu()
})

function startMenu () {
    formations.forEach(function(i) {
        $('#formations').append($( "<a/>", {
            class: "list-group-item",
            href: "#",
            text: i
        }))
    })
    $('#formations').append($( "<a/>", {
        class: "list-group-item",
        href: "#",
        text: "+ Create new project"
    }))
    $("#myModal").modal('show');
}
