'use strict';

exports.handler = (event, context, callback) => {
    // TODO implement

    //console.log(event.instances);

    var params = {
        DryRun: false,
        MaxResults: 99
    };

    var attr_params = {
      InstanceId: "id",
      DisableApiTermination: {
        Value: false
      }
    }

    console.log(params)

    var AWS = require('aws-sdk');

    var ec2 = new AWS.EC2();

    ec2.describeInstances(params, function(err, data) {
        if (err){
            console.log(err, err.stack);
            callback(err,err.stack);
        } else{
                //console.log(data);
                var reservations = data.Reservations;
                reservations.forEach(function(reservation){
                  var instances = reservation.Instances;
                  instances.forEach(function(instance){
                    console.log(instance.InstanceId);
                    attr_params.InstanceId = instance.InstanceId;
                    ec2.modifyInstanceAttribute(attr_params,function(err,data){
                      if(err){
                        console.log(err,err.stack);
                        callback(err,err.stack);
                      }else{
                        console.log("Attribute modified successfully for " + instance.InstanceId );
                      }
                    });
                  });
                });
        }
    });

    callback(null, 'All Instances modified Successfully');
};
