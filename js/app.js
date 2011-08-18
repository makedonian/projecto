$(function() {
    var TodoView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },
        tagName: 'li',
        className: 'todo',
        templateNoChildren: _.template(
            "<li><h2><input type='checkbox'><%= content %></h2></li>"        
        ),
        events: {
            'click': 'saveMe'
        },
        saveMe: function() {
            console.log('hola');
            this.model.save();
        },
        render: function() {
            $(this.el).html(this.templateNoChildren(this.model.toJSON()));
            return this;
        }
    });

    var Todo = Backbone.Model.extend({
        id: '',
        parentId: '',
        assignedTo: [],
        content: '',
        done: false,
        weight: 1,
    });

    var t1 = new Todo({assignedTo:['bo'], content:'bla bla'});
    var t2 = new Todo({assignedTo:['bojan'], content:'Needs to do this and that'});
    var t3 = new Todo({assignedTo:['b'], content:'Third todo bla bla'});

    var TodoCollection = Backbone.Collection.extend({
        model: Todo,
        url: '/todos'
    });

    var TodoList = new TodoCollection(); 

    TodoList.bind("add", function(t) {
        var v = new TodoView({'model': t});
        v.render();
        $('#todos').append(v.el);
    });

    TodoList.add([t1,t2]);

    $("#new_task").click(function() {
        console.log('click');
    });

});
