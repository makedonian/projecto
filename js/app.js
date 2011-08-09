$(function() {
    var TodoView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            this.render();
        },
        tagName: 'li',
        className: 'todo',
        model: Todo,
        templateNoChildren: _.template(
            "<li><h2><input type='checkbox'><%= content %></h2></li>"        
        ),
        events: {
            'click input': 'xxx'
        },
        xxx: function() {
            var color = 'black';
            if ($(this.el).find('input').get(0).checked) {
                color = 'red';   
            }
            $(this.el).find("h2").css("color",color);
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
        initialize: function() {
            this.view = new TodoView({model:this})
        }
    });

    var t1 = new Todo({assignedTo:['bo'], content:'bla bla'});
    var t2 = new Todo({assignedTo:['bojan'], content:'Needs to do this and that'});
    var t3 = new Todo({assignedTo:['b'], content:'Third todo bla bla'});

    var TodoCollection = Backbone.Collection.extend({
        model: Todo
    });


    var TodoList = new TodoCollection(); 
    TodoList.bind("add", function(t) {
        t.view.render();
        $('#todos').append(t.view.el);
    });

    TodoList.add([t1,t2]);

    setTimeout(function() {
        TodoList.add(t3);
        t1.set({content:'some new content'});
    }, 3000);


});
