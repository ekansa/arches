define([
    'jquery',
    'knockout',
    'bootstrap-datetimepicker'
], function ($, ko) {
    /**
    * A knockout.js binding for the jQuery UI datepicker, passes datepickerOptions
    * data-bind property to the datepicker on init
    * @constructor
    * @name datepicker
    */
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};

            if (ko.isObservable(options.dateFormat)) {
                options.dateFormat.subscribe(function (value) {
                    options.dateFormat = value;
                    $(element).datetimepicker(options);
                })
                options.dateFormat = options.dateFormat();
            }
            $(element).datetimepicker(options);

            //when a user changes the date, update the view model
            ko.utils.registerEventHandler(element, "dp.change", function (event) {
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    if (event.date != null && !(event.date instanceof Date)) {
                        value(event.date.toDate());
                    } else {
                        value(event.date);
                    }
                }
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                var picker = $(element).data("datepicker");
                if (picker) {
                    picker.destroy();
                }
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

            var picker = $(element).data("datepicker");
            //when the view model is updated, update the widget
            if (picker) {
                var koDate = ko.utils.unwrapObservable(valueAccessor());

                //in case return from server datetime i am get in this form for example /Date(93989393)/ then fomat this
                koDate = (typeof (koDate) !== 'object') ? new Date(parseFloat(koDate.replace(/[^0-9]/g, ''))) : koDate;

                picker.date(koDate);
            }
        }
    };

    return ko.bindingHandlers.datepicker;
});
