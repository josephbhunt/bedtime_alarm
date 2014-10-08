/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        window.addEventListener('load', this.initCurrentTime, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    initCurrentTime: function() {
        var currentDate = new Date();
        var time = dateToTime(currentDate);
        var context = {currentTime: time};
        app.setTemplate("current-time-template", context, "current-time");

        setHour = 8;
        setMinute = 0;
        var wakeDate = null;
        var secondsLeft = null;
        if (currentDate.getHours() > setHour) {
            wakeDate = Date.parse("tomorrow").set({hour: setHour, minute: setMinute});
            secondsLeft = wakeDate.getTime() - currentDate.getTime();
        }
        else {
            wakeDate = Date.today().set({hour: setHour, minute: setMinute});
            secondsLeft = currentDate.getTime() - wakeDate.getTime();
        }
        var timeLeft = secondsToTime(secondsLeft/1000);
        context = {timeLeft: timeLeft};
        app.setTemplate("time-left-template", context, "time-left");

        //setTimeout(function(){
        //    app.initCurrentTime()
        //},1000);
    },

    setTemplate: function(templateId, context, htmlId){
        var source   = document.getElementById(templateId).innerHTML;
        var template = Handlebars.compile(source);
        var html    = template(context);
        var contentWrapper = document.getElementById(htmlId);
        contentWrapper.innerHTML = html;
    },
};

app.initialize();

/**
* Convert number of seconds into time object
*
* @param integer secs Number of seconds to convert
* @return object
*/
function secondsToTime(secs)
{   
    secs = Math.abs(secs);
    var hours = Math.floor(secs / (60 * 60));
   
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
 
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
   
    var obj = {
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
    return obj;
}

function dateToTime(date){
    return {'hours': date.getHours(), 'minutes': date.getMinutes(), 'seconds': date.getSeconds()};
}