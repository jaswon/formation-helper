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
        openProject(-1)
    })
    $('#newNameBack').click(function() {
        $('#new-project').modal('hide')
    })
    $('#newFormationBack').click(function() {
        $('#new-formation').modal('hide')
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
                openProject(i.id)
            },
            text: i.name
        }).append($("<button/>", {
            class: 'btn btn-xs btn-link pull-right',
            click: function () {
                var thisproj = $(this)
                $("#confirm-delete-project").modal({
                    backdrop: 'static'
                });
                $('#delete-project').click(function() {
                    projects.splice(projects.map(function(e) { return e.id; }).indexOf(i.id),1)
                    updateProjects()
                    thisproj.parent().remove()
                    $("#confirm-delete-project").modal('hide');
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
            $("#new-project").modal({
                backdrop: 'static'
            });
        },
        text: "+ Create new project"
    }))
}

function openFormation (fi, pi) {
    $('#toggleFormations').click()
    if (fi == -1) {
        fi = projects[pi].formations.length
        projects[pi].formations.push({
            id: fi,
            name: $('#newFormation').val()
        })
        $('<a/>', {
            class: 'panel btn-block',
            href: "#",
            click: function () {
                openFormation(fi, pi)
            }
        }).append($('<div/>', {
            class: 'panel-body',
            text: projects[pi].formations[fi].name
        }).append($("<button/>", {
            class: 'btn btn-xs btn-link pull-right',
            click: function () {
                var thisproj = $(this)
                $("#confirm-delete-formation").modal({
                    backdrop: 'static'
                });
                $('#delete-formation').click(function() {
                    projects[pi].formations.splice(fi ,1)
                    updateProjects()
                    thisproj.parent().parent().remove()
                    $("#confirm-delete-formation").modal('hide');
                })
                return false;
            }
        }).append($("<span/>", {
            class: "glyphicon glyphicon-remove"
        })))).appendTo($('.sidebar-list'))
        updateProjects()
    }
    $('.formations-main').text(projects[pi].formations[projects[pi].formations.map(function(e) { return e.id; }).indexOf(fi)].name)
}

function openProject (index) {
    $("#project-modal").modal('hide')
    if (index == -1) {
        index = projects.length
        projects.push({
            id: projects.length,
            name: $('#newName').val(),
            formations: []
        })
        updateProjects()
    }
    $('.sidebar-list').sortable({
        axis: 'y',
        containment: 'parent',
        delay: 150,
        update: function(event, ui) {
            var arr = $(this).sortable('toArray',{
                attribute: 'formation-id'
            });
            // console.log(arr);
            projects[index].formations = (function() {
                var tmp = []
                arr.forEach(function(fid) {
                    tmp.push(projects[index].formations[projects[index].formations.map(function(e) { return e.id; }).indexOf(parseInt(fid))])
                })
                return tmp
            })()
            updateProjects()
            // console.log(projects[index].formations);
        }
    })
    projects[index].formations.forEach(function(f) {
        $('<a/>', {
            class: 'panel btn-block',
            href: "#",
            'formation-id': f.id,
            click: function () {
                openFormation(f.id, index)
            }
        }).append($('<div/>', {
            class: 'panel-body',
            text: f.name
        }).append($("<button/>", {
            class: 'btn btn-xs btn-link pull-right',
            click: function () {
                var thisproj = $(this)
                $("#confirm-delete-formation").modal({
                    backdrop: 'static'
                });
                $('#delete-formation').click(function() {
                    projects[index].formations.splice(f.id,1)
                    updateProjects()
                    thisproj.parent().parent().remove()
                    $("#confirm-delete-formation").modal('hide');
                })
                return false;
            }
        }).append($("<span/>", {
            class: "glyphicon glyphicon-remove"
        })))).appendTo($('.sidebar-list'))
    })
    $('<a/>', {
        class: 'panel btn-block new-formation-btn',
        href: "#",
        click: function () {
            $("#new-formation").modal({
                backdrop: 'static'
            });
            $('#newFormationSubmit').unbind("click").click(function() {
                $('#new-formation').modal('hide')
                openFormation(-1, index)
            })
        }
    }).append($('<div/>', {
        class: 'panel-body',
        text: '+ add new formation'
    })).appendTo($('.sidebar-list-container'))
}
