// importing the express and setting up port
const express = require('express');
const app = express();
const port = 8000;
// configuring the database
const db = require('./config/mongoose');
const Tags = require('./models/tags');
const List = require('./models/list');
// setting the view engine and views folder
app.set('view engine', 'ejs');
app.set('views', './views');
// setting up middlewares
app.use(express.urlencoded());
app.use(express.static('assets'));
// colours are the basic colours we are using for Tags
var colors = [
    "Darkgray",
    "Dodgerblue",
    "Tomato",
    "Sandybrown",
    "Indianred",
    "Slateblue",
    "Mediumorchid",
    "Mediumseagreen"
];
// these are the default Tags that will be added on first server start
var defaultTags = [
    "Recents",
    "Work",
    "Personal",
    "Home",
    "Others"
];
// in this loop we are setting up the default Tags
// as this will load every time server is restared we are checking
// if tag is already present in the db or not
for (let i = 0; i < defaultTags.length; i++) {
    var name = defaultTags[i];
    Tags.findOne({
        tag: name
    }, function (err, res) {
        if (err) {
            console.log("@@@@@@@@@@@############$$$$$$$$$$", err);
            return;
        }
        if (res == null) {
            Tags.create({tag: defaultTags[i], count: 0}),
            function (err, newTag) {
                if (err) {
                    console.log("Error in creating the default Tags");
                    return;
                }
                console.log("Default Tags are created");
            }
        }
    })


};
// this is the page which will be loaded on root directory
// we are using 2 datbase for saving 2 types for documents
// which is why List find is called form inside Tags.find
// if there is some simple method that will be added in future versions
app.get('/', function (req, res) {

    Tags.find({}, function (err, Tags) {
        if (err) {
            console.log("Error in finding the Tags");
            return;
        }
        List.find({}, function (err, List) {
            if (err) {
                console.log("error", err);
                return;
            }
            res.render('home.ejs', {
                title: "To Do List",
                tags_list: Tags,
                to_do_list: List,
                colors_list: colors
            })
        });

    });


});

// when add Tags is called Tags are added wothout checking
// in future versions first tag will be checked if its already present it will
// be skipped
app.post('/add-Tags', function (req, res) {
    Tags.create({
        tag: req.body.tag,
        count: 0
    }, function (err, newTag) {
        if (err) {
            console.log("There is some error", error);
            return;
        }
        console.log('##########', newTag);
        return res.redirect('/');
    });
});

// below function will be called when new task is added
// the tag associated with task is searched and its count is incremented
// first we are finding the tag then we are using id returned by res
// and calling findByIdAndUpdate on that function
// i think this can be shortned
// this will be done in future versions
function findTagAndIncrement(tosearch) {
    console.log(tosearch);
    Tags.findOne({
        tag: tosearch
    }, function (err, res) {
        if (err) {
            console.log("@@@@@@@@@@@############$$$$$$$$$$", err);
            return;
        }
        console.log("tag to increment is found and incremented");
        var Count = res.count + 1;
        Tags.findByIdAndUpdate(res.id, {
            count: Count
        }, function (err, res) {
            if (err) {
                console.log("here----------------");
                return;
            }

        });
    });
};
// findTagAndDecrement is oposite of findTagAndIncrement
function findTagAndDecrement(tosearch) {
    console.log(tosearch);
    Tags.findOne({
        tag: tosearch
    }, function (err, res) {
        if (err) {
            console.log("@@@@@@@@@@@############$$$$$$$$$$", err);
            return;
        }
        console.log("tag to increment is found and incremented");
        var Count = res.count - 1;
        Tags.findByIdAndUpdate(res.id, {
            count: Count
        }, function (err, res) {
            if (err) {
                console.log("here----------------");
                return;
            }

        });
    });
};
// when add task is called it will be simply put into the db
// and above findTagAndIncrement will be called
app.post('/add-task', function (req, res) { // console.log(req);
    findTagAndIncrement(req.body.tag);
    List.create({
        item: req.body.item,
        date: req.body.date,
        tag: req.body.tag,
        color: req.body.color,
        massage: req.body.massage,
        trashed: "false"
    }, function (err, newItem) {
        if (err) {
            console.log("Error in creating the new item", err);
            return;
        }
        console.log("New List item is added Successfuly", newItem);
        return res.redirect('/');
    })
});
// delete is called to delete tag
// and then findTagAndDecrement to decrease the tag count
// there is a feture for bin also
// when task is deleted from the main task List it will be snt to trash bin
// then if that task is deleted form trash bin too then it will be permanently deleted
// so at first (during adding of new task) its trashed value is set to false
// and when a task is deleted from the main List its tarshed value is det to true
// and that task is not shown in main List
// when its deleted form trash too its been removed from the db
app.get('/delete-tag/', function (req, res) {
    console.log("deleted");
    console.log(req);
    let id = req.query.id;
    console.log(id);
    let Trashed = req.query.trashed;
    let tag = req.query.tag;
    if (Trashed == "false") {
        findTagAndDecrement(tag);
        List.findByIdAndUpdate(id, {
            trashed: "true"
        }, function (err, res) {
            if (err) {
                console.log("here----------------");
                return;
            }
        });
        return res.redirect('/');
    } else {
        List.findByIdAndDelete(id, function (err) {
            if (err) {
                console.log("Error in deleting contact");
                return;
            }
            return res.redirect('/');
        })
    };


});

// restore is called to restore the task form trash
// we will just set its gtrashed value to false and it will be shown in main List
app.get('/restore-tag/', function (req, res) {
    console.log("restored");
    let id = req.query.id;
    let tag = req.query.tag;
    findTagAndIncrement(tag);
    List.findByIdAndUpdate(id, {
        trashed: "false"
    }, function (err, res) {
        if (err) {
            console.log("here----------------");
            return;
        }

    });
    return res.redirect('/');
})

// update task is to update task
// we are getting id of task to update then that task is updated accordingly
app.post('/update-task', function (req, res) {
    console.log("Enter to update the contact");
    console.log(req);
    var abc = req.body.id;
    var documentToUpdate = {
        item: req.body.item,
        date: req.body.date,
        tag: req.body.tag,
        color: req.body.color,
        massage: req.body.massage
    }
    List.findById(abc, function (err, res) {
        if (err) {
            console.log("Error in updating the document", err);
            return;
        }
        let tagToDecrement = res.tag;
        findTagAndDecrement(tagToDecrement);
        findTagAndIncrement(req.body.tag);
    })
    List.findByIdAndUpdate(abc, documentToUpdate, function (err, result) {
        if (err) {
            console.log("Error in updating the document", err);
            return;
        }
        console.log("Documetn updated succesfully");
        return res.redirect('/');
    })
})

// this is the listner
app.listen(port, function (err) {
    if (err) {
        console.log("Error in starting the server", err);
        return;
    }
    console.log("Server is up and runnign on port", port);
});


// ////////////////////////////////////////////////////////////////////////////////////////////
// /////////////    Below is the function to add the staring tasks for      ///////////////////
// /////////////    any user in our case TA . these will show basic info/   ///////////////////
// /////////////          about the website its features and whatnot        ////////////////////
// ///////       Please remove the call addDefaultTasks() after starting server      ///////////
// /////////////     A readme.txt will also be available for refrence       /////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////

function addDefaultTasks() {
    var task = [
        {
            item: "HI User, these sample tasks will show you how to use website",
            date: "2020-07-03",
            tag: "Recents",
            color: "Dodgerblue",
            massage: "please Go throught them from left to rigth and top to bottom"
        },
        {
            item: "In left section you can change accout and see available Tags",
            date: "2020-08-03",
            tag: "Recents",
            color: "Tomato",
            massage: "You can also add tag from add tag button in bottom left"
        },
        {
            item: "Categories will contain all the Tags and clicking on it show the tasks",
            date: "2020-06-12",
            tag: "Recents",
            color: "Sandybrown",
            massage: "All deleted tasks can be view in trash section below categories"
        },
        {
            item: "The center section is used to add or update notes",
            date: "2020-06-18",
            tag: "Recents",
            color: "Indianred",
            massage: "Default due date for a task is 7 days from now"
        }, {
            item: "In right section each card contain one task",
            date: "2020-06-15",
            tag: "Recents",
            color: "Slateblue",
            massage: "Hovering over card will show all options available for that card"
        }, {
            item: "The due date is shown on top right section of card",
            date: "2020-06-08",
            tag: "Recents",
            color: "Mediumorchid",
            massage: "If due date is near the color dot will stard binking"
        }, {
            item: "If due date is missed a missed card will show on top ot task",
            date: "2020-04-03",
            tag: "Recents",
            color: "Mediumseagreen",
            massage: "If task is completed, the blinking and missed massage will disappear"
        }, {
            item: "On hover a checkbox, edit button and a delete button will be shown",
            date: "2020-06-05",
            tag: "Recents",
            color: "Slateblue",
            massage: "In trash only recover and delete forever are shown"
        }, {
            item: "The Tags count might break sometimes, i am not sure of reason",
            date: "2010-06-10",
            tag: "Recents",
            color: "Sandybrown",
            massage: "I am still trying to find for which cases it will fail"
        }, {
            item: "As you are my only tester PLEASE give feedback",
            date: "2020-06-06",
            tag: "Recents",
            color: "Dodgerblue",
            massage: "you can use contact developer option form 3 dots in left section"
        }
    ];
    for (let z = task.length - 1; z >= 0; z--) {
        var oneTask = task[z];
        List.findOne({
            item: oneTask.item
        }, function (err, res) {
            if (err) {
                console.log("@@@@@@@@@@@############$$$$$$$$$$", err);
                return;
            }
            if (res == null) {
                console.log("res is null");
                List.create({
                    item: task[z].item,
                    date: task[z].date,
                    tag: task[z].tag,
                    color: task[z].color,
                    massage: task[z].massage,
                    trashed: "false"
                }, function (err, newItem) {
                    if (err) {
                        console.log("Error in creating the new item", err);
                        return;
                    }
                    console.log("New List item is added Successfuly");
                });
            }


        });

    };
}
addDefaultTasks(); // please remove the call for addDefaultTasks() if you dont want to add sample tasks again and again
