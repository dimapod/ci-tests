var debug = require('debug')('app.handler');

// Usually expects "db" as an injected dependency to manipulate the models
module.exports = function (db) {
    debug('setting up handlers...');

    var Cat = db.Cat;

    var systems = function (req, res) {
        var rez = [
            {name: "OpenStack", img: "openstack", url: "http://openstack.com", description: "OpenStack is a global collaboration of developers and cloud computing technologists producing the ubiquitous open source cloud computing platform for public and private clouds. The project aims to deliver solutions for all types of clouds by being simple to implement, massively scalable, and feature rich. The technology consists of a series of interrelated projects delivering various components for a cloud infrastructure solution."},
            {name: "Windows Azure", img: "azure", url: "http://microsoft.com/asure", description: "Windows Azure is an open and flexible cloud platform that enables you to quickly build, deploy and manage applications across a global network of Microsoft-managed datacenters. You can build applications using any language, tool or framework. And you can integrate your public cloud applications with your existing IT environment."},
            {name: "Microsoft System Center", img: "system_center", url: "http://microsoft.com/systemcenter", description: "System Center 2012 R2 delivers unified management across on-premises, service provider, and Windows Azure environments, thereby enabling the Microsoft Cloud OS. System Center 2012 R2 offers exciting new features and enhancements across infrastructure provisioning, infrastructure monitoring, application performance monitoring, automation and self-service, and IT service management."}
        ];
        res.send(rez, 200);
    };

    var getCats = function (req, res) {
        debug("Get cats");

        Cat.getAll().exec().then(function (data) {
            res.send(data, 200);
        }, function(err) {
            console.log("Error: ", err);
            res.send(500);
        });
    };

    var getACat = function (req, res) {
        var name = req.params.name;
        debug("Get cat %s", name);

        Cat.findByName(name).exec().then(function (data) {
            res.send(data, 200);
        }, function(err) {
            console.log("Error: ", err);
            res.send(500);
        });
    };

    var addACat = function (req, res) {
        debug("Add cat: ", req.body);

        if (req.body.name) {
            var kitty = new Cat({ name: req.body.name });
            kitty.save(function (err, doc, id) {
                if (err) {
                    console.log("Error: ", err);
                    res.send(500);
                } else {
                    console.log("OK", doc, id);
                    res.send(201);
                }
            });
        } else {
            res.send(409);
        }
    };

    var reinitBase = function (req, res) {
        debug("Reinit base");

        Cat.remove().exec(function (err) {
            if (err) {
                console.log("Error: ", err);
                res.send(500);
            } else {
                console.log("OK");
                res.send(200);
            }
        });
    };

    return {
        systems: systems,
        getCats: getCats,
        addACat: addACat,
        getACat: getACat,
        reinitBase: reinitBase
    };
};
