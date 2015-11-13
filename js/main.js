var projects;

$(function() {
    var getlist = localStorage.getItem('list')
    if (getlist == null) {
        projects = []
        updateProjects()
    } else {
        projects = JSON.parse(getlist)
    }
    $('#newNameSubmit').click(function() {
        $('#new-project').modal('hide')
        openProject({
            id: projects.length,
            name: $('#newName').val()
        },true)
    })
    $('#newNameBack').click(function() {
        $('#new-project').modal('hide')
    })
    $("#project-modal").modal({
        backdrop: 'static'
    });
    $('#toggleFormations').click(function() {
        $('.formations-sidebar').toggleClass('out in')
    })
    startMenu()
})

function updateProjects() {
    localStorage.setItem('list',JSON.stringify(projects))
}

function startMenu () {
    projects.forEach(function(i) {
        $( "<a/>", {
            class: "list-group-item",
            href: "#",
            click: function () {
                openProject(i,false)
            },
            text: i.name
        }).append($("<button/>", {
            class: 'btn btn-xs btn-link pull-right',
            click: function () {
                var thisproj = $(this)
                $("#confirm-delete").modal({
                    backdrop: 'static'
                });
                $('#delete-project').click(function() {
                    projects.splice(projects.map(function(e) { return e.id; }).indexOf(i.id),1)
                    updateProjects()
                    thisproj.parent().remove()
                    $("#confirm-delete").modal('hide');
                })
                return false;
            }
        }).append($("<span/>", {
            class: "glyphicon glyphicon-remove"
        }))).appendTo($('#project-list'))
    })
    $('#project-list').append($( "<a/>", {
        class: "list-group-item",
        href: "#",
        click: function() {
            // $('#list-or-new').carousel(1)
            $("#new-project").modal({
                backdrop: 'static'
            });
        },
        text: "+ Create new project"
    }))
}

function openProject (project, isNew) {
    $("#project-modal").modal('hide')
    if (isNew) {
        projects.push(project)
        updateProjects()
    }
    // $('.workspace').text(project.name)
}
