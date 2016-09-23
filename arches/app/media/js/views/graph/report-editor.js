require([
    'knockout',
    'views/graph/graph-page-view',
    'views/graph/report-editor/report-editor-tree',
    'views/graph/report-editor/report-editor-form',
    'views/graph/report-editor/report-editor-preview',
    'models/report',
    'report-editor-data',
    'arches'
], function(ko, PageView, ReportEditorTree, ReportEditorForm, ReportEditorPreview, ReportModel, data, arches) {
    var viewModel = {
        selectedReportId: ko.observable(data.report.reportid),
        reports: ko.observableArray(data.reports)
    };

    viewModel.report = new ReportModel({
        data: data.report
    });

    viewModel.reset = function () {
        viewModel.report.reset();
        viewModel.selection(viewModel.report);
    };

    viewModel.dirty = viewModel.report.dirty;

    viewModel.selection = ko.observable(null);

    viewModel.openReport = function (reportId) {
        pageView.viewModel.navigate(arches.urls.report_editor + reportId);
    };

    viewModel.selectedReportId.subscribe(function(reportId) {
        if (reportId) {
            viewModel.openReport(reportId);
        }
    });

    viewModel.reportOptions = ko.computed(function () {
        var options = [{
            name: null,
            reportid: null,
            disabled: true
        }]
        return options.concat(viewModel.reports());
    });

    var subViewModel = {
        report: viewModel.report,
        selection: viewModel.selection
    }
    viewModel.reportEditorTree = new ReportEditorTree(subViewModel);
    viewModel.reportEditorForm = new ReportEditorForm(subViewModel);
    viewModel.reportEditorPreview = new ReportEditorPreview(subViewModel);

    var pageView = new PageView({
        viewModel: viewModel
    });
});
