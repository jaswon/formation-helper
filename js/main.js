var projects;

$(function() {
    // simpleStorage.set('list',JSON.stringify([1,2,3,4,5,6,7,8,9,10]))
    var getlist = simpleStorage.get('list')
    if (getlist === undefined) {
        simpleStorage.set('list',"[]")
        projects = []
    } else {
        console.log(getlist);
        projects = JSON.parse(getlist)
        console.log(projects);
    }
    startMenu()
})

function startMenu () {
    projects.forEach(function(i) {
        $('#project-list').append($( "<a/>", {
            class: "list-group-item",
            href: "#",
            click: function() {
                openProject(i,false)
            },
            text: i.name
        }))
    })
    $('#project-list').append($( "<a/>", {
        class: "list-group-item",
        href: "#",
        click: function() {
            $('#list-or-new').carousel(1)
            // openProject("new")
        },
        text: "+ Create new project"
    }))
    $('#newNameSubmit').click(function() {
        openProject({
            name: $('#newName').val()
        },true)
    })
    $("#project-modal").modal({
        backdrop: 'static'
    });
}

function openProject (project, isNew) {
    $("#project-modal").modal('hide')
    if (isNew) {
        projects.push(project)
        simpleStorage.set('list',JSON.stringify(projects))
    }
    $('.workspace').text(project.name)
}
