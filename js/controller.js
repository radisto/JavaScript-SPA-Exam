var app = app || app;

app.controller = (function() {

    function showWelcomeGuest(container) {
        $.get('templates/welcome.html', function (data) {
            container.html(data);
        });
    }

    function showRegister(container) {
        $.get('templates/register.html', function(data){
            container.html(data);
        });
    }

    function showLogin(container) {
        $.get('templates/login.html', function(data){
            container.html(data);
        });
    }

    function showHome(container) {
        $.get('templates/home.html', function(data){
            var template = Handlebars.compile(data);
            container.html(template(sessionStorage));
        });
    }

    function showAddNote(container) {
        $.get('templates/addNote.html', function(data){
            container.html(data);
        });
    }

    function showOfficeNotes(container, results) {
        $.get('templates/officeNoteTemplate.html', function(data){
            var template = Handlebars.compile(data);
            container.html(template(results));
        });
    }

    function showMyNotes(container, results) {
        $.get('templates/myNoteTemplate.html', function(data){
            var template = Handlebars.compile(data);
            container.html(template(results));
        });
    }

    function showEditNote(container, result) {
        $.get('templates/editNote.html', function(data){
            var template = Handlebars.compile(data);
            container.html(template(result));
        });
    }

    function showDeleteNote(container, result) {
        $.get('templates/deleteNote.html', function(data){
            var template = Handlebars.compile(data);
            container.html(template(result));
        });
    }

    return {
        showWelcomeGuest: showWelcomeGuest,
        showRegister: showRegister,
        showLogin: showLogin,
        showHome: showHome,
        showOfficeNotes : showOfficeNotes,
        showMyNotes: showMyNotes,
        showAddNote: showAddNote,
        showEditNote: showEditNote,
        showDeleteNote: showDeleteNote
    }

}());