var app = app || {};

(function(scope){

    var menu = $('#menu');
    var container = $('#container');

    function notySuccess(message) {
        noty({
            text: message,
            type: 'success',
            layout: 'top',
            timeout: 2000
        });
    }

    function notyError(message) {
        noty({
            text: message.charAt(0).toUpperCase() + message.slice(1) + '!',
            type: 'error',
            layout: 'top',
            timeout: 4000,
            closeWith: ['button']
        });
    }

    function successReg(data, username, fullName) {
        sessionStorage.username = username;
        sessionStorage.fullName = fullName;
        sessionStorage.userId = data.objectId;
        sessionStorage.sessionToken =  data.sessionToken;
        window.location.replace('#/home/');
        notySuccess('You have successfully signed in!');
    }

    function successLog(data) {
        sessionStorage.username = data.username;
        sessionStorage.fullName = data.fullName;
        sessionStorage.userId = data.objectId;
        sessionStorage.sessionToken =  data.sessionToken;
        window.location.replace('#/home/');
        notySuccess('You have successfully logged in!');
    }

    function successAddNote() {
        notySuccess('You have successfully created a note!');
        window.location.replace('#/myNotes/');
    }

    function successEditNote() {
        notySuccess('You have successfully edited a note!');
        window.location.replace('#/myNotes/');
    }

    function successDeleteNote() {
        notySuccess('You have successfully deleted a note!');
        window.location.replace('#/myNotes/');
    }

    function successMyNotes(data) {
        scope.controller.showMyNotes(container, data);
    }

    function successOfficeNotes(data) {
        scope.controller.showOfficeNotes(container, data);
    }

    function successGetNoteToEdit(data) {
        sessionStorage.currentNote = JSON.stringify(data);
        window.location.replace('#/editNote/');
    }

    function successGetNoteToDelete(data) {
        sessionStorage.currentNote = JSON.stringify(data);
        window.location.replace('#/deleteNote/');
    }

    function success(data) {
        console.log(data);
    }

    function error(err) {
        var errMsg = err.responseJSON.error;
        notyError(errMsg);
    }

    container.on('click', '#registerButton', function(){
        var username = $('#username').val();
        var password = $('#password').val();
        var fullName = $('#fullName').val();
        var newUser = {
            username: username,
            password: password,
            fullName: fullName
        };
        scope.requester.post(scope.headers.getHeaders(),
            scope.baseUrl + 'users', newUser, function(data){successReg(data, username, fullName)}, error);
    });

    container.on('click', '#loginButton', function(){
        var username = $('#username').val();
        var password = $('#password').val();
        scope.requester.get(scope.headers.getHeaders(),
            scope.baseUrl + 'login?username=' + username + '&password=' + password, successLog, error);
    });

    menu.on('click', '#logout', function(){
        scope.requester.post(scope.headers.getHeaders(),
            scope.baseUrl + 'logout', null, success, error);
        sessionStorage.clear();
    });

    menu.on('click', '#myNotes', function(){
        scope.requester.get(scope.headers.getHeaders(),
            scope.baseUrl + 'classes/Note?where={"author":"' + sessionStorage.fullName + '"}', successMyNotes, error);
    });

    menu.on('click', '#officeNotes', function(){
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var todayDate = date.getFullYear() + '-' + ((''+month).length<2 ? '0' : '')
            + month + '-' + ((''+day).length<2 ? '0' : '') + day;
        scope.requester.get(scope.headers.getHeaders(),
            scope.baseUrl + 'classes/Note?where={"deadline":"' + todayDate + '"}', successOfficeNotes, error);
    });

    container.on('click', '#addNoteButton', function(){
        var title = $('#title').val();
        var text = $('#text').val();
        var deadline = $('#deadline').val();
        var newNote = {
            title: title,
            text: text,
            author: sessionStorage.fullName,
            deadline: deadline,
            ACL: {
                '*': {
                    read: true
                }
            }
        };
        newNote.ACL[sessionStorage.userId] = {
            write: true,
            read: true
        };
        scope.requester.post(scope.headers.getHeaders(),
            scope.baseUrl + 'classes/Note', newNote, successAddNote, error);
    });

    container.on('click', '.edit', function() {
        var noteId = ($(this).parent().attr('data-id'));
        scope.requester.get(scope.headers.getHeaders(),
            scope.baseUrl + 'classes/Note/' + noteId, successGetNoteToEdit, error);
    });

    container.on('click', '.delete', function() {
        var noteId = ($(this).parent().attr('data-id'));
        scope.requester.get(scope.headers.getHeaders(),
            scope.baseUrl + 'classes/Note/' + noteId, successGetNoteToDelete, error);
    });

    container.on('click', '#editNoteButton', function() {
        var title = $('#title').val();
        var text = $('#text').val();
        var deadline = $('#deadline').val();
        var editedNote = {
            title: title,
            text: text,
            deadline: deadline
        };
        var noteId = (JSON.parse(sessionStorage.currentNote)).objectId;
        scope.requester.put(scope.headers.getHeaders(),
            scope.baseUrl + 'classes/Note/' + noteId, editedNote,  successEditNote, error);
    });

    container.on('click', '#deleteNoteButton', function() {
        var noteId = (JSON.parse(sessionStorage.currentNote)).objectId;
        scope.requester.delete(scope.headers.getHeaders(),
            scope.baseUrl + 'classes/Note/' + noteId, successDeleteNote, error);
    });
}(app));