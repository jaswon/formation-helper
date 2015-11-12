var projects;

$(function() {
    // simpleStorage.set('list',JSON.stringify([1,2,3,4,5,6,7,8,9,10]))
    var getlist = simpleStorage.get('list')
    if (getlist === undefined) {
        simpleStorage.set('list',"[]")
        projects = []
    } else {
        projects = JSON.parse(getlist)
    }
    startMenu()
})

function startMenu () {
    projects.forEach(function(i) {
        $('#project-list').append($( "<a/>", {
            class: "list-group-item",
            href: "#",
            click: function() {
                openProject(i)
            },
            text: i
        }))
    })
    $('#project-list').append($( "<a/>", {
        class: "list-group-item",
        href: "#",
        click: function() {
            openProject("new")
        },
        text: "+ Create new project"
    }))
    $("#project-modal").modal({
        backdrop: 'static'
    });
}

function openProject (project) {
    $("#project-modal").modal('hide')
    $('.workspace').text(project)
}
