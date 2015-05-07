var app = app || {};

(function(scope) {
    scope.baseUrl = 'https://api.parse.com/1/';

    var router = Sammy(function() {

        var menu = $('#menu');
        var container = $('#container');

        this.before('.*', function() {
            if (sessionStorage.sessionToken) {
                menu.show();
            } else {
                menu.hide();
            }
        });

        this.before('#\/home\/|#\/office\/|#\/myNotes\/|#\/addNote\/|#\/editNote\/|#\/deleteNote\/', function() {
            if (!sessionStorage.sessionToken) {
                return false;
            }
        });

        this.get('#/', function() {
            scope.controller.showWelcomeGuest(container);
        });

        this.get('#/register/', function() {
            scope.controller.showRegister(container);
        });

        this.get('#/login/', function() {
            scope.controller.showLogin(container);
        });

        this.get('#/home/', function() {
            scope.controller.showHome(container);
        });

        this.get('#/office/', function() {
            $("#officeNotes").trigger("click");
        });

        this.get('#/myNotes/', function() {
            $("#myNotes").trigger("click");
        });

        this.get('#/addNote/', function() {
            scope.controller.showAddNote(container);
        });

        this.get('#/editNote/', function() {
            scope.controller.showEditNote(container, JSON.parse(sessionStorage.currentNote));
        });

        this.get('#/deleteNote/', function() {
            scope.controller.showDeleteNote(container, JSON.parse(sessionStorage.currentNote));
        });
    });
    router.run('#/');
}(app));